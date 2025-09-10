// "use client";
//
// import {Button} from "@/components/ui/button";
// import {Card, CardContent} from "@/components/ui/card";
// import {X, Plus, Minus} from "lucide-react";
// import Link from "next/link";
// import {toast} from "sonner";
// import {useCartStore} from "@/store/useCartStore";
// import {Textarea} from "@/components/ui/textarea";
//
// export default function CartPage() {
//     const {cart, updateQuantity, removeFromCart, addToCart} =
//         useCartStore();
//
//     const total = cart.reduce(
//         (sum, item) => sum + item.dish.price * item.quantity,
//         0
//     );
//
//     const handleRemove = (item: any) => {
//         removeFromCart(item.dish.id);
//
//         toast.error(`${item.dish.name} đã bị xoá khỏi giỏ`, {
//             action: {
//                 label: "Hoàn tác",
//                 onClick: () => {
//                     for (let i = 0; i < item.quantity; i++) {
//                         addToCart(item.dish);
//                     }
//                 },
//             },
//         });
//     };
//
//     return (
//         <div className="max-w-3xl mx-auto p-4 space-y-4">
//             <h1 className="text-2xl font-bold">Giỏ hàng</h1>
//
//             {cart.length === 0 && (
//                 <p className="text-center mt-10 text-gray-500">
//                     Giỏ hàng trống
//                 </p>
//             )}
//
//             {cart.map((item) => (
//                 <Card key={item.dish.id}>
//                     <CardContent className="p-4 space-y-3">
//                         {/* Hàng trên: thông tin món + nút */}
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-4">
//                                 <img
//                                     src={item.dish.imageUrl}
//                                     alt={item.dish.name}
//                                     className="w-16 h-16 object-cover rounded"
//                                 />
//                                 <div>
//                                     <p className="font-semibold">{item.dish.name}</p>
//                                     <p className="text-sm text-gray-500">
//                                         {item.dish.price.toLocaleString("vi-VN")}₫
//                                     </p>
//                                 </div>
//                             </div>
//
//                             <div className="flex items-center gap-2">
//                                 <Button
//                                     size="sm"
//                                     variant="outline"
//                                     onClick={() => updateQuantity(item.dish.id, -1)}
//                                 >
//                                     <Minus size={16}/>
//                                 </Button>
//                                 <span>{item.quantity}</span>
//                                 <Button
//                                     size="sm"
//                                     variant="outline"
//                                     onClick={() => updateQuantity(item.dish.id, +1)}
//                                 >
//                                     <Plus size={16}/>
//                                 </Button>
//                                 <Button
//                                     size="sm"
//                                     variant="destructive"
//                                     onClick={() => handleRemove(item)}
//                                 >
//                                     <X size={16}/>
//                                 </Button>
//                             </div>
//                         </div>
//
//                         {/* Hàng dưới: ghi chú */}
//                         <Textarea
//                             className="w-full h-8 resize-none text-sm"
//                             placeholder="Ghi chú (vd: ít cay, thêm đá...)"
//                         />
//                     </CardContent>
//                 </Card>
//             ))}
//
//             {/* Tổng cộng và nút thanh toán */}
//             <div className="flex justify-end items-center border-t pt-4 gap-2">
//                 <p className="text-lg font-bold">
//                     Tổng cộng:{" "}
//                     <span className="text-red-500">
//                         {total.toLocaleString("vi-VN")}₫
//                     </span>
//                 </p>
//                 <div className="flex gap-2">
//                     {cart.length === 0 ? (
//                         <Button disabled>Thanh toán</Button>
//                     ) : (
//                         <Button asChild>
//                             <Link href="/menu/cart/checkout">Thanh toán</Link>
//                         </Button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }
