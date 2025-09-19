import Image from "next/image";
import {Card, CardHeader, CardContent, CardFooter} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Star} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {CiCircleCheck, CiShoppingCart} from "react-icons/ci";
import {Dish} from "@/types/api";
import {useCartStore} from "@/store/useCartStore";
import {useState} from "react";
import {useSession} from "next-auth/react";
import {toast} from "sonner";
import {AuthModal} from "@/components/AuthModal";

export default function MenuItemCard({food}: { food: Dish }) {
    const [isEditing, setIsEditing] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [openAuth, setOpenAuth] = useState(false);

    const addToCart = useCartStore((state) => state.addToCart);


    const handleConfirm = () => {
        if (quantity > 0) {
            addToCart(food, quantity);
            setIsEditing(false);
            setQuantity(1);
            toast.success(`${food.name} đã được thêm vào giỏ hàng. Số lượng ${quantity}`);
        }
    };

    const handleCartClick = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setQuantity(1);
    };

    return (
        <>
            <Card
                className="flex flex-col h-full overflow-hidden rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group">
                <div className="relative w-full aspect-square overflow-hidden flex-shrink-0">
                    <Image
                        src={food.imageUrl}
                        alt={food.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                    {food.tag && (
                        <Badge className="absolute left-2 top-2 text-xs px-2 py-1 shadow-md">
                            {food.tag}
                        </Badge>
                    )}
                </div>

                {/* Content area - flexible height */}
                <div className="flex flex-col flex-1 px-6 space-y-4 justify-between ">
                    {/* Header - tên và rating */}
                    <div className="flex items-center justify-between ">
                        <h3 className="text-md font-semibold line-clamp-2 flex-1">
                            {food.name}
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground flex-shrink-0">
                            <Star size={12} className="mr-1 fill-yellow-400 text-yellow-400"/>
                            <span className="whitespace-nowrap">{food.rating}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                        {food.description}
                    </p>

                    <div className="flex items-center relative w-full max-w-xs">
                        <motion.div
                            className="flex justify-between flex-1 overflow-hidden"
                            animate={{x: isEditing ? -100 : 0}}
                            transition={{type: "spring", stiffness: 300}}
                        >
                            <div>
                                <div
                                    className={`flex flex-col items-center h-full ${
                                        food.oldPrice ? "justify-start" : "justify-center"
                                    } flex-1`}
                                    style={{minWidth: 80}}
                                >
                                    <p className="text-lg font-bold text-primary truncate text-center w-full">
                                        {food.price.toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </p>
                                    {food.oldPrice && (
                                        <p className="text-xs text-muted-foreground line-through truncate text-center w-full">
                                            {food.oldPrice.toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <Button
                                size="lg"
                                className="w-16 flex justify-center rounded-lg "
                                onClick={handleCartClick}
                            >
                                <CiShoppingCart/>
                            </Button>
                        </motion.div>

                        {/* Các nút khi đang edit */}
                        <AnimatePresence>
                            {isEditing && (
                                <motion.div
                                    className="flex items-center space-x-2"
                                    initial={{opacity: 0, x: 20}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: 20}}
                                >
                                    <Button
                                        size="lg"
                                        className="w-16 flex items-center justify-center hover:text-red-500 font-extralight"
                                        onClick={handleCancel}
                                    >
                                        x
                                    </Button>

                                    <input
                                        type="number"
                                        min={1}
                                        value={quantity}
                                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                                        className="w-16 h-10 px-2 border rounded text-center text-sm "
                                    />

                                    <Button
                                        size="lg"
                                        className="w-16 flex items-center justify-center hover:text-green-500"
                                        onClick={handleConfirm}
                                    >
                                        <CiCircleCheck/>
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </Card>
            <AuthModal open={openAuth} onOpenChange={setOpenAuth}/>
        </>
    );
}
