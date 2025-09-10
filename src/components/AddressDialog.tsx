import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import AddressSelect from "@/components/AddressSelect";

export default function AddressDialog() {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="text-blue-600 text-sm">Nhập thông tin giao hàng</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Thông tin giao hàng</DialogTitle>
                        <DialogDescription>
                            Vui lòng nhập đầy đủ thông tin để chúng tôi giao hàng chính xác.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Họ tên</Label>
                            <Input id="name" placeholder="Nguyễn Văn A" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">Số điện thoại</Label>
                            <Input id="phone" type="tel" placeholder="0123456789" className="col-span-3" />
                        </div>
                        <AddressSelect/>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <Label htmlFor="note" className="text-right">Ghi chú</Label>
                            <Textarea id="note" placeholder="Ví dụ: Gọi trước khi giao, gửi bảo vệ..." className="col-span-3" />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Xác nhận</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
    )
}