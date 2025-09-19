import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function Profile() {
    return (
        <Avatar className={"w-5 h-5"}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
