"use client";

import React, {useState} from "react";
import {useSession, signOut} from "next-auth/react";
import {Profile} from "@/components/Avatar";
import {CiLocationOn, CiRedo} from "react-icons/ci";
import {Button} from "@/components/ui/button";
import {AuthModal} from "@/components/AuthModal";
import {toast} from "sonner";

export default function InfoBar() {
    const {data: session} = useSession();
    const [openAuth, setOpenAuth] = useState(false);
    const [location, setLocation] = useState<string | null>(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    const fullName = session?.user?.name || "Khách";
    const phone = session?.user?.phone || "";

    const handleGetLocation = async () => {
        setLoadingLocation(true);

        const permission = await navigator.permissions.query({name: "geolocation"});

        if (permission.state === "denied") {
            toast.error("Lấy vị trí thất bại. Vui lòng cấp quyền lấy vị trí hoặc khởi động lại trình duyệt");

            setLoadingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const {latitude, longitude} = position.coords;

                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await res.json();
                    const address = data.display_name || "Không xác định";
                    setLocation(address);
                } catch (error) {
                    setLocation("Không thể lấy địa chỉ");
                } finally {
                    setLoadingLocation(false);
                }
            },
            (error) => {
                setLocation("Không thể truy cập vị trí");
                setLoadingLocation(false);
            }
        );
    };

    const handleResetLocation = () => {
        setLocation(null);
        handleGetLocation(); // Gọi lại sau khi reset
    };

    return (
        <>
            <div className="flex justify-between px-6 bg-gray-900 text-white py-3 sm:px-8 md:px-40 lg:px-50">
                {/* Địa chỉ */}
                <button
                    className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-1 text-xs text-gray-300 truncate max-w-full hover:bg-gray-600"
                    onClick={location ? handleResetLocation : handleGetLocation}
                    disabled={loadingLocation}
                    title={location ? "Làm mới vị trí" : "Lấy vị trí của tôi"}
                >
                    {/* Icon */}
                    {location ? (
                        <CiRedo size={20} className="text-gray-400"/>
                    ) : (
                        <CiLocationOn size={20}/>
                    )}

                    {/* Text */}
                    {loadingLocation ? (
                        "Đang lấy vị trí..."
                    ) : location ? (
                        <span className="truncate max-w-[200px] sm:max-w-[300px] text-left">{location}</span>
                    ) : (
                        "Địa chỉ giao hàng hịện tại"
                    )}
                </button>


                {/* Người dùng */}
                <div className="flex items-center gap-2 rounded-lg">
                    {session ? (
                        <>
                            <Profile/>
                            <div className="text-right text-xs leading-tight">
                                <div>{fullName}</div>
                                {phone && <div className="text-gray-400">{phone}</div>}
                            </div>
                            <Button onClick={() => signOut()}>
                                Đăng xuất
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="secondary"
                            size="sm"
                            className="text-xs rounded-lg"
                            onClick={() => setOpenAuth(true)}
                        >
                            Đăng nhập / Đăng ký
                        </Button>
                    )}
                </div>
            </div>

            {/* Modal đăng nhập / đăng ký */}
            {openAuth && <AuthModal open={openAuth} onOpenChange={setOpenAuth}/>}
        </>
    );
}
