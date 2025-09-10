"use client"

import * as React from "react"
import Link from "next/link"
import {cn} from "@/lib/utils"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavMenu() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuLink asChild>
                    <Link href="/" className={navigationMenuTriggerStyle()}>
                        Trang Chủ
                    </Link>
                </NavigationMenuLink>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Thực Đơn</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/menu"
                                    >
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            Xem Tất Cả
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Khám phá menu đa dạng với nhiều món ăn hấp dẫn
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/menu/appetizers" title="Khai Vị">
                                Các món khai vị ngon miệng để bắt đầu bữa ăn
                            </ListItem>
                            <ListItem href="/menu/main-course" title="Món Chính">
                                Các món ăn chính phong phú và đa dạng
                            </ListItem>
                            <ListItem href="/menu/desserts" title="Tráng Miệng">
                                Các món tráng miệng ngọt ngào kết thúc bữa ăn
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Dịch Vụ</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            <ListItem href="/delivery" title="Giao Hàng Tận Nơi">
                                Dịch vụ giao hàng nhanh chóng và tiện lợi
                            </ListItem>
                            <ListItem href="/reservation" title="Đặt Bàn">
                                Đặt bàn trước để có trải nghiệm tốt nhất
                            </ListItem>
                            <ListItem href="/catering" title="Tiệc Cưới">
                                Dịch vụ tổ chức tiệc và sự kiện
                            </ListItem>
                            <ListItem href="/loyalty" title="Ưu Đãi">
                                Chương trình khách hàng thân thiết
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuLink href="/contact" className={navigationMenuTriggerStyle()}>
                        Liên Hệ
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & { href: string; title: string }
>(({className, title, children, href, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    href={href}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"