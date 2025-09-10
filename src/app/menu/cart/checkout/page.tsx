// "use client"
// import React, {useEffect, useState} from 'react';
// import {MapPin, Clock, Phone, Edit3, Plus, Minus, Gift, CreditCard, Truck, User} from 'lucide-react';
// import {useCartStore} from "@/store/useCartStore";
// import {useSession} from "next-auth/react";
// import {useGlobalStore} from "@/store/useGlobalStore";
// import AddressDialog from "@/components/AddressDialog";
// import {redirect} from "next/navigation";
//
// export default function CheckoutPage() {
//     const {cart, updateQuantity, removeFromCart} = useCartStore();
//     const [selectedAddress, setSelectedAddress] = useState<number | null>(null)
//     const [selectedPayment, setSelectedPayment] = useState('cash');
//     const [selectedDelivery, setSelectedDelivery] = useState('standard');
//     const [voucherCode, setVoucherCode] = useState('');
//     const [orderNote, setOrderNote] = useState('');
//
//     const {data: session} = useSession();
//
//     const {deliveryMethods} = useGlobalStore();
//
//     useEffect(() => {
//         if (session?.user?.addresses) {
//             const defaultAddr = session.user.addresses.find(addr => addr.defaultAddress)
//             if (defaultAddr) {
//                 setSelectedAddress(defaultAddr.id)
//             }
//         }
//     }, [session?.user?.addresses])
//
//     useEffect(() => {
//         if (cart.length === 0) {
//             redirect("/");
//         }
//     }, [cart]);
//
//
//     const restaurant = {
//         name: "Quán Ăn Đêm Dì Tư",
//         address: "Trần Hưng Đạo, Khu Phố 3, Đặc Khu Phú Quốc, Việt Nam",
//         image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop",
//         rating: 4.5,
//         deliveryTime: "25-35 phút"
//     };
//
//     const paymentMethods = [
//         {id: "cash", name: "Tiền mặt", icon: "💵", available: true},
//         {id: "momo", name: "Ví MoMo", icon: "🎀", available: true},
//         {id: "banking", name: "Chuyển khoản", icon: "🏦", available: true},
//         {id: "card", name: "Thẻ tín dụng", icon: "💳", available: false}
//     ];
//
//     const deliveryFee = deliveryMethods.find(m => m.name === selectedDelivery)?.price || 0;
//     const serviceFee = 5000;
//
//     const total = deliveryFee + serviceFee;
//
//
//
//     return (
//         <div className="min-h-screen">
//             <div className="max-w-4xl mx-auto px-4 py-6">
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Main Content */}
//                     <div className="lg:col-span-2 space-y-6">
//
//                         {/* Restaurant Info */}
//                         <div className="bg-white rounded-lg p-4 shadow-sm">
//                             <div className="flex items-center space-x-4">
//                                 <img src={restaurant.image} alt={restaurant.name}
//                                      className="w-16 h-16 rounded-lg object-cover"/>
//                                 <div className="flex-1">
//                                     <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
//                                     <p className="text-sm text-gray-600">{restaurant.address}</p>
//                                     <div className="flex items-center space-x-4 mt-1">
//                                         <span className="text-sm text-yellow-600">⭐ {restaurant.rating}</span>
//                                         <span className="text-sm text-gray-600 flex items-center">
//                       <Clock className="w-4 h-4 mr-1"/>
//                                             {restaurant.deliveryTime}
//                     </span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//
//                         {/* Delivery Address */}
//                         <div className="bg-white rounded-lg p-4 shadow-sm">
//                             <div className="flex items-center justify-between mb-4">
//                                 <h3 className="font-semibold text-gray-900 flex items-center">
//                                     <MapPin className="w-5 h-5 mr-2 text-red-500"/>
//                                     Địa chỉ giao hàng
//                                 </h3>
//                                 <AddressDialog/>
//                             </div>
//
//                             <div className="space-y-3">
//                                 {session?.user?.addresses?.map((address) => (
//                                     <div key={address.id}
//                                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
//                                              selectedAddress === address.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
//                                          }`}
//                                          onClick={() => setSelectedAddress(address.id)}>
//                                         <div className="flex items-start justify-between">
//                                             <div className="flex-1">
//                                                 <div className="flex items-center space-x-2 mb-1">
//                                                     <span className="font-medium">{address.name}</span>
//                                                     <span
//                                                         className="text-xs bg-gray-100 px-2 py-1 rounded">{address.label}</span>
//                                                     {address.defaultAddress && <span
//                                                         className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Mặc định</span>}
//                                                 </div>
//                                                 <p className="text-sm text-gray-600">{address.fullAddress}</p>
//                                                 <p className="text-sm text-gray-600 flex items-center mt-1">
//                                                     <Phone className="w-4 h-4 mr-1"/>
//                                                     {address.phone}
//                                                 </p>
//                                             </div>
//                                             <input
//                                                 type="radio"
//                                                 checked={selectedAddress === address.id}
//                                                 onChange={() => setSelectedAddress(address.id)}
//                                                 className="text-blue-600"
//                                             />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//
//                         {/* Cart Items */}
//                         <div className="bg-white rounded-lg p-4 shadow-sm">
//                             <h3 className="font-semibold text-gray-900 mb-4">Món đã chọn</h3>
//                             <div className="space-y-4">
//                                 {cart.map((item) => (
//                                     <div
//                                         key={item.dish.id}
//                                         className="flex items-start space-x-4 pb-4 border-b border-gray-100 last:border-b-0"
//                                     >
//                                         <img
//                                             src={item.dish.imageUrl}
//                                             alt={item.dish.name}
//                                             className="w-16 h-16 rounded-lg object-cover"
//                                         />
//                                         <div className="flex-1">
//                                             <h4 className="font-medium text-gray-900">{item.dish.name}</h4>
//                                             <p className="text-sm text-gray-600">{item.dish.description}</p>
//                                             <div className="flex items-center justify-between mt-2">
//                         <span className="font-medium text-red-600">
//                           {item.dish.price.toLocaleString("vi-VN")}đ
//                         </span>
//                                                 <div className="flex items-center space-x-2">
//                                                     <button
//                                                         onClick={() => updateQuantity(item.dish.id, -1)}
//                                                         className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
//                                                     >
//                                                         <Minus className="w-4 h-4"/>
//                                                     </button>
//                                                     <span className="w-8 text-center font-medium">
//                             {item.quantity}
//                           </span>
//                                                     <button
//                                                         onClick={() => updateQuantity(item.dish.id, 1)}
//                                                         className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
//                                                     >
//                                                         <Plus className="w-4 h-4"/>
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//
//                         {/* Delivery Method */}
//                         <div className="bg-white rounded-lg p-4 shadow-sm">
//                             <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
//                                 <Truck className="w-5 h-5 mr-2 text-green-500"/>
//                                 Phương thức giao hàng
//                             </h3>
//                             <div className="space-y-3">
//                                 {deliveryMethods.map((method) => (
//                                     <div key={method.name}
//                                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
//                                              selectedDelivery === method.name ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
//                                          }`}
//                                          onClick={() => setSelectedDelivery(method.name)}>
//                                         <div className="flex items-center justify-between">
//                                             <div>
//                                                 <p className="font-medium">{method.description}</p>
//                                                 <p className="text-sm text-gray-600">{method.time}</p>
//                                             </div>
//                                             <div className="flex items-center space-x-3">
//                                                 <span className="font-medium text-red-600">
//                                                  {(method.price ?? 0).toLocaleString('vi-VN')} đ
//                                                 </span>
//                                                 <input
//                                                     type="radio"
//                                                     checked={selectedDelivery === method.name}
//                                                     onChange={() => setSelectedDelivery(method.name)}
//                                                     className="text-blue-600"
//                                                 />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//
//                         {/* Payment Method */}
//                         <div className="bg-white rounded-lg p-4 shadow-sm">
//                             <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
//                                 <CreditCard className="w-5 h-5 mr-2 text-purple-500"/>
//                                 Phương thức thanh toán
//                             </h3>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                                 {paymentMethods.map((method) => (
//                                     <div key={method.id}
//                                          className={`border rounded-lg p-3 cursor-pointer transition-colors ${
//                                              !method.available ? 'opacity-50 cursor-not-allowed' :
//                                                  selectedPayment === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
//                                          }`}
//                                          onClick={() => method.available && setSelectedPayment(method.id)}>
//                                         <div className="flex items-center justify-between">
//                                             <div className="flex items-center space-x-3">
//                                                 <span className="text-2xl">{method.icon}</span>
//                                                 <span className="font-medium">{method.name}</span>
//                                             </div>
//                                             <input
//                                                 type="radio"
//                                                 checked={selectedPayment === method.id}
//                                                 disabled={!method.available}
//                                                 onChange={() => setSelectedPayment(method.id)}
//                                                 className="text-blue-600"
//                                             />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//
//                         {/* Voucher */}
//                         <div className="bg-white rounded-lg p-4 shadow-sm">
//                             <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
//                                 <Gift className="w-5 h-5 mr-2 text-orange-500"/>
//                                 Mã giảm giá
//                             </h3>
//                             <div className="flex space-x-2">
//                                 <input
//                                     type="text"
//                                     placeholder="Nhập mã giảm giá"
//                                     value={voucherCode}
//                                     onChange={(e) => setVoucherCode(e.target.value)}
//                                     className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                 />
//                                 <button
//                                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
//                                     Áp dụng
//                                 </button>
//                             </div>
//                         </div>
//
//                         {/*/!* Order Note *!/*/}
//                         {/*<div className="bg-white rounded-lg p-4 shadow-sm">*/}
//                         {/*    <h3 className="font-semibold text-gray-900 mb-4">Ghi chú đơn hàng</h3>*/}
//                         {/*    <textarea*/}
//                         {/*        placeholder="Ghi chú cho người giao hàng (tùy chọn)"*/}
//                         {/*        value={orderNote}*/}
//                         {/*        onChange={(e) => setOrderNote(e.target.value)}*/}
//                         {/*        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"*/}
//                         {/*        rows="3"*/}
//                         {/*    />*/}
//                         {/*</div>*/}
//                     </div>
//
//                     {/* Order Summary */}
//                     <div className="lg:col-span-1">
//                         <div className="bg-white rounded-lg p-4 shadow-sm sticky top-4">
//                             <h3 className="font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
//
//                             <div className="space-y-3 mb-4">
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Tạm tính</span>
//                                     {/*<span>{subtotal.toLocaleString('vi-VN')}đ</span>*/}
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Phí giao hàng</span>
//                                     <span>{deliveryFee.toLocaleString('vi-VN')}đ</span>
//                                 </div>
//                                 <div className="flex justify-between">
//                                     <span className="text-gray-600">Phí dịch vụ</span>
//                                     <span>{serviceFee.toLocaleString('vi-VN')}đ</span>
//                                 </div>
//                                 <hr/>
//                                 <div className="flex justify-between font-semibold text-lg">
//                                     <span>Tổng cộng</span>
//                                     <span className="text-red-600">{total.toLocaleString('vi-VN')}đ</span>
//                                 </div>
//                             </div>
//
//                             <button
//                                 className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
//                                 Đặt hàng
//                             </button>
//
//                             <div className="mt-4 text-center">
//                                 <p className="text-sm text-gray-600">
//                                     Bằng việc đặt hàng, bạn đồng ý với
//                                     <span className="text-blue-600"> Điều khoản dịch vụ</span>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }