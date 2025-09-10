import Image from "next/image";
import {Card, CardHeader, CardContent, CardFooter} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Star, Plus, ShoppingBagIcon} from "lucide-react";
// import {useCartStore} from "@/store/useCartStore";
import {Label} from "@/components/ui/label";
import {CiShoppingCart} from "react-icons/ci";
import {Dish} from "@/types/api";

export default function MenuItemCard({food}: { food: Dish }) {
    // const addToCart = useCartStore((state) => state.addToCart);

    return (
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
            <div className="flex flex-col flex-1 p-3">
                {/* Header - tên và rating */}
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-md font-semibold leading-tight line-clamp-2 flex-1 min-h-[2.5rem]">
                        {food.name}
                    </h3>
                    <div className="flex items-center text-xs text-muted-foreground flex-shrink-0">
                        <Star size={12} className="mr-1 fill-yellow-400 text-yellow-400"/>
                        <span className="whitespace-nowrap">{food.rating}</span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3 flex-1">
                    {food.description}
                </p>

                <div className="mt-auto">
                    <div className="flex items-center justify-between gap-2">
                        {/* Giá cả */}
                        <div className="flex flex-col justify-start items-start flex-1 min-w-0">
                            <p className="textlg font-bold text-primary truncate w-full">
                                {food.price.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </p>
                            {food.oldPrice && (
                                <p className="text-xs text-muted-foreground line-through truncate w-full">
                                    {food.oldPrice.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                                </p>
                            )}
                        </div>

                        {/* Button thêm vào giỏ */}
                        <Button
                            size="lg"
                            className="flex items-center justify-center h-8 px-2 text-xs hover:shadow-md transition-all shrink-0"
                            // onClick={() => addToCart(food)}
                        >
                            <CiShoppingCart/>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
