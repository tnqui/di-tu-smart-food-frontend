"use client";

import {MapContainer, TileLayer, Marker, useMap, useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, {useEffect, useRef, useState} from "react";

// Icon fix cho marker mặc định
const markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function MapController({ isLocked }: { isLocked: boolean }) {
    const map = useMap();
    const zoomControlRef = useRef<L.Control.Zoom | null>(null);

    useEffect(() => {
        if (isLocked) {
            // Disable mọi interaction
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.boxZoom.disable();
            map.keyboard.disable();

            // Xóa nút zoom nếu đang có
            if (zoomControlRef.current) {
                map.removeControl(zoomControlRef.current);
                zoomControlRef.current = null;
            }
        } else {
            map.scrollWheelZoom.disable(); // Chỉ disable scroll, giữ pinch
            map.dragging.enable();
            map.doubleClickZoom.enable();
            map.boxZoom.enable();
            map.keyboard.enable();

            // Thêm nút zoom nếu chưa có
            if (!zoomControlRef.current) {
                zoomControlRef.current = L.control.zoom({ position: "bottomright" });
                zoomControlRef.current.addTo(map);
            }
        }
    }, [isLocked, map]);

    return null;
}

// Component lắng nghe sự kiện move để update marker
function MarkerUpdater({setPosition, isLocked}: {
    setPosition: (pos: [number, number]) => void;
    isLocked: boolean;
}) {
    const map = useMapEvents({
        move: () => {
            if (!isLocked) {
                const center = map.getCenter();
                setPosition([center.lat, center.lng]);
            }
        }
    });
    return null;
}

function LocateButton({setPosition, setIsLocked}: {
    setPosition: (pos: [number, number]) => void;
    setIsLocked: (locked: boolean) => void;
}) {
    const map = useMap();
    const [loading, setLoading] = useState(false);

    const handleLocate = () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
                setPosition(coords);
                map.setView(coords, 18);
                setIsLocked(false); // Mở khóa sau khi có vị trí
                setLoading(false);
            },
            (err) => {
                console.error("Không thể lấy vị trí", err);
                setLoading(false);
                // Có thể hiển thị thông báo lỗi ở đây
            }
        );
    };

    return (
        <button
            onClick={handleLocate}
            disabled={loading}
            className="absolute top-2 right-2 z-[1000] bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white border px-4 py-2 rounded shadow-lg font-medium"
        >
            {loading ? "⏳ Đang lấy..." : "📍 Lấy vị trí"}
        </button>
    );
}

export default function Map({ onPositionChange }: { onPositionChange?: (pos: [number, number]) => void }) {
    const [center] = useState<[number, number]>([10.2899, 103.9840]); // Phú Quốc
    const [position, setPosition] = useState<[number, number]>();
    const [isLocked, setIsLocked] = useState(true);

    // Khóa ban đầu
    useEffect(() => {
        if (position && onPositionChange) {
            onPositionChange(position);
        }
    }, [position, onPositionChange]);

    return (
        <div className="relative w-full h-[300px] rounded-lg overflow-hidden border border-gray-200">
            <MapContainer
                center={center}
                zoom={10}
                style={{height: "100%", width: "100%"}}
                dragging={!isLocked}
                zoomControl={!isLocked}
                scrollWheelZoom={!isLocked}
                doubleClickZoom={!isLocked}
                touchZoom={!isLocked}
                boxZoom={!isLocked}
                keyboard={!isLocked}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Marker theo state */}
                {position && <Marker position={position} icon={markerIcon}/>}

                {/* Nút lấy vị trí hiện tại */}
                <LocateButton setPosition={setPosition} setIsLocked={setIsLocked}/>

                {/* Controller để quản lý trạng thái khóa */}
                <MapController isLocked={isLocked}/>

                {/* Lắng nghe drag/move để update marker */}
                <MarkerUpdater setPosition={setPosition} isLocked={isLocked}/>

            </MapContainer>

            {/* Overlay khóa */}
            {isLocked && (
                <div
                    className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[999] rounded-lg">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm mx-4">
                        <div className="text-4xl mb-3">🔒</div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            Cần cấp quyền vị trí
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                            Vui lòng bấm "Lấy vị trí" để sử dụng bản đồ
                        </p>
                        <div className="text-xs text-gray-500">
                            Map sẽ được mở khóa sau khi lấy được vị trí hiện tại
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}