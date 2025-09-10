"use client";

import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 px-4 sm:px-8 md:px-32 lg:px-40 py-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo & Thông tin doanh nghiệp */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Di4Food</h2>
                    <p>Quán Ăn Đêm Dì Tư</p>
                    <p>📍 Trần Hưng Đạo, Khu Phố 3, Đặc Khu Phú Quốc, Việt Nam</p>
                    <p>📞 0774 826 656</p>
                    <p>📧 ditusmartfood@gmail.com</p>
                </div>

                {/* Liên kết nhanh */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Liên kết nhanh</h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-white">Trang chủ</a></li>
                        <li><a href="/menu" className="hover:text-white">Thực đơn</a></li>
                        <li><a href="/about" className="hover:text-white">Giới thiệu</a></li>
                        <li><a href="/contact" className="hover:text-white">Liên hệ</a></li>
                    </ul>
                </div>

                {/* Hỗ trợ */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Hỗ trợ</h3>
                    <ul className="space-y-2">
                        <li><a href="/faq" className="hover:text-white">Câu hỏi thường gặp</a></li>
                        <li><a href="/privacy" className="hover:text-white">Chính sách bảo mật</a></li>
                        <li><a href="/terms" className="hover:text-white">Điều khoản sử dụng</a></li>
                        <li><a href="/shipping" className="hover:text-white">Chính sách giao hàng</a></li>
                    </ul>
                </div>

                {/* Mạng xã hội */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Kết nối</h3>
                    <div className="flex space-x-4 text-2xl">
                        <a href="#" className="hover:text-white"><FaFacebook /></a>
                        <a href="#" className="hover:text-white"><FaInstagram /></a>
                        <a href="#" className="hover:text-white"><FaTiktok /></a>
                        <a href="#" className="hover:text-white"><FaYoutube /></a>
                    </div>
                    <p className="mt-4">Thanh toán an toàn:</p>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
                © {new Date().getFullYear()} Di4Food. All rights reserved.
            </div>
        </footer>
    );
}
