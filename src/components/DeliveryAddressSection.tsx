"use client";
import React, {useState, useEffect} from "react";
import {MapPin, Phone, Edit3} from "lucide-react";
import {CgAdd} from "react-icons/cg";
import {AddressDialog} from "@/components/AddressDialog";
import {useOrderStore} from "@/store/useOrderStore";
import {useSession} from "next-auth/react";
import {Label} from "@/components/ui/label";
import {AddressFormData} from "@/types/api";

export function DeliveryAddressSection() {
    const {data: session} = useSession();
    const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const {setAddress, shippingAddress} = useOrderStore();


    useEffect(() => {
        if (session?.user?.addresses) {
            const defaultAddr = session.user.addresses.find(addr => addr.defaultAddress);
            if (defaultAddr) setSelectedAddress(defaultAddr.id);
        }
    }, [session]);

    const handleAddressSubmit = (address: AddressFormData) => {
        setAddress({
            recipientName: address.recipientName,
            recipientPhone: address.recipientPhone,
            shippingAddress: address.shippingAddress,
        });
        setOpenDialog(false);
    };

    return (
        <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-red-500"/>
                    Địa chỉ giao hàng
                </h3>
                {shippingAddress && <button><Edit3/></button>}

                {!shippingAddress && (
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-sm text-gray-400">Chưa có địa chỉ</span>
                        <button onClick={() => setOpenDialog(true)} title="Thêm địa chỉ"
                                className="p-2 rounded hover:bg-gray-100">
                            <CgAdd size={18}/>
                        </button>
                    </div>
                )}
            </div>


            <AddressDialog
                open={openDialog}
                onOpenChange={setOpenDialog}
                onAddressSubmit={handleAddressSubmit}
            />

            {shippingAddress ? (
                <span>{shippingAddress}</span>
            ) : (
                <Label className="text-gray-900 flex items-center justify-center">
                    Chưa có địa chỉ nào
                </Label>
            )}

            <div className="space-y-3 mt-4">
                {session?.user?.addresses?.map((address) => (
                    <div
                        key={address.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                            selectedAddress === address.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
                        }`}
                        onClick={() => {
                            setSelectedAddress(address.id);
                            setAddress({
                                recipientName: session.user.name || "Người nhận",
                                recipientPhone: session.user.phone || "Chưa có SĐT",
                                shippingAddress: address.fullAddress,
                            });
                        }}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                    <span className="font-medium">{address.label || "Địa chỉ"}</span>
                                    {address.defaultAddress && (
                                        <span
                                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Mặc định</span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600">{address.fullAddress}</p>
                                <p className="text-sm text-gray-600 flex items-center mt-1">
                                    <Phone className="w-4 h-4 mr-1"/>
                                    {session.user.phone || "Không có SĐT"}
                                </p>
                            </div>
                            <input
                                type="radio"
                                checked={selectedAddress === address.id}
                                onChange={() => setSelectedAddress(address.id)}
                                className="text-blue-600"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
