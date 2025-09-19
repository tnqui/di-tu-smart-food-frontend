"use client";

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogOverlay,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {useState, useEffect} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import Map from "@/components/Map";
import {AddressFormData, CreateOrderRequest} from "@/types/api";
import AddressAutocomplete from "@/components/ui/AddressForm";
import {Input} from "@/components/ui/input";

type AddressDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAddressSubmit: (address: AddressFormData) => void;
};

export function AddressDialog({open, onOpenChange, onAddressSubmit}: AddressDialogProps) {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [selectedAddress, setSelectedAddress] = useState("");
    const [note, setNote] = useState("");
    const [coords, setCoords] = useState<[number, number] | null>(null);
    const [errors, setErrors] = useState<{ [k: string]: string }>({});

    const validateField = (field: string, value: string) => {
        let msg = "";
        switch (field) {
            case "fullName":
                if (!value.trim()) msg = "Họ và tên không được để trống";
                break;
            case "phone":
                if (!value.trim()) msg = "Số điện thoại không được để trống";
                else if (!/^0\d{9}$/.test(value)) msg = "Số điện thoại không hợp lệ";
                break;
            case "selectedAddress":
                if (!value.trim()) msg = "Vui lòng chọn địa chỉ giao hàng";
                break;
        }
        setErrors(prev => ({...prev, [field]: msg}));
        return msg === "";
    };

    const handleSubmit = () => {
        // Clear previous errors
        setErrors({});

        // Validate all required fields
        const isFullNameValid = validateField("fullName", fullName);
        const isPhoneValid = validateField("phone", phone);
        const isAddressValid = validateField("selectedAddress", selectedAddress);

        // If any validation fails, stop submission
        if (!isFullNameValid || !isPhoneValid || !isAddressValid) {
            return;
        }

        // Build object according to API requirements
        const addressData: AddressFormData = {
            address: selectedAddress,
            recipientName: fullName,
            recipientPhone: phone,
            shippingAddress: selectedAddress,
            note: note.trim() || undefined,
            coords: coords
        };

        onAddressSubmit(addressData);
        onOpenChange(false);

        // Reset form
        resetForm();
    };

    const resetForm = () => {
        setFullName("");
        setPhone("");
        setSelectedAddress("");
        setNote("");
        setCoords(null);
        setErrors({});
    };

    const handleAddressSelect = (place: any) => {
        console.log('Địa chỉ đã chọn:', place);
        console.log('Tọa độ:', place.center); // [lng, lat]

        setSelectedAddress(place.place_name);
        setCoords(place.center);

        // Clear address error if exists
        if (errors.selectedAddress) {
            validateField("selectedAddress", place.place_name);
        }
    };

    // Reset form when dialog closes
    useEffect(() => {
        if (!open) {
            resetForm();
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm"/>
            <DialogContent className="sm:max-w-md w-full bg-white rounded-lg shadow-xl p-6 border border-gray-200">
                <DialogTitle className="text-lg font-semibold mb-4">Cung Cấp Địa Chỉ Giao Hàng</DialogTitle>
                <ScrollArea className="h-[400px] w-full pr-4">
                    <div className="space-y-3 flex flex-col w-full">
                        {/* Full Name */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="fullName">Họ và tên *</Label>
                            <Input
                                id="fullName"
                                value={fullName}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                    if (errors.fullName) {
                                        validateField("fullName", e.target.value);
                                    }
                                }}
                                placeholder="Nhập họ và tên"
                                className={errors.fullName ? "border-red-500" : ""}
                            />
                            {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName}</p>}
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="phone">Số điện thoại *</Label>
                            <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    if (errors.phone) {
                                        validateField("phone", e.target.value);
                                    }
                                }}
                                placeholder="Nhập số điện thoại"
                                type="tel"
                                className={errors.phone ? "border-red-500" : ""}
                            />
                            {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
                        </div>

                        {/* Address Autocomplete */}
                        <div className="flex flex-col gap-1 relative z-10">
                            <Label htmlFor="address">Địa chỉ giao hàng *</Label>
                            <AddressAutocomplete onSelect={handleAddressSelect}/>
                            {errors.selectedAddress && <p className="text-red-600 text-sm">{errors.selectedAddress}</p>}
                            {selectedAddress && (
                                <p className="text-sm text-green-600 mt-1">✓ Đã chọn: {selectedAddress}</p>
                            )}
                        </div>

                        {/* Note */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="note">Ghi chú (tùy chọn)</Label>
                            <Input
                                id="note"
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Nhập ghi chú (nếu có)"
                                type="text"
                            />
                        </div>

                        {/* Map */}
                        <div className="flex flex-col gap-2 relative z-0">
                            <Label className="text-sm">Địa điểm nhận hàng (tùy chọn: kéo thả để ghim vị trí)</Label>
                            <div className="min-h-[300px] rounded-lg border border-gray-200 overflow-hidden">
                                <Map onPositionChange={setCoords} initialCoords={coords}/>
                            </div>
                            {coords && (
                                <p className="text-xs text-gray-600">
                                    Tọa độ: {coords[1].toFixed(6)}, {coords[0].toFixed(6)}
                                </p>
                            )}
                        </div>
                    </div>
                </ScrollArea>

                {/* Buttons */}
                <div className="flex gap-2 mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                        Hủy
                    </Button>
                    <Button onClick={handleSubmit} className="flex-1">
                        Lưu địa chỉ
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}