"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Ward {
    code: number
    name: string
}

interface District {
    code: number
    name: string
    wards: Ward[]
}

interface Province {
    code: number
    name: string
    districts: District[]
}

export default function AddressSelect() {
    const [provinces, setProvinces] = useState<Province[]>([])
    const [districts, setDistricts] = useState<District[]>([])
    const [wards, setWards] = useState<Ward[]>([])

    const [selectedProvince, setSelectedProvince] = useState<string>("")
    const [selectedDistrict, setSelectedDistrict] = useState<string>("")
    const [selectedWard, setSelectedWard] = useState<string>("")

    // Load danh sách tỉnh thành
    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/?depth=3")
            .then(res => res.json())
            .then((data: Province[]) => setProvinces(data))
    }, [])

    // Khi chọn tỉnh → load quận/huyện
    const handleProvinceChange = (provinceCode: string) => {
        setSelectedProvince(provinceCode)
        const province = provinces.find(p => p.code.toString() === provinceCode)
        setDistricts(province?.districts || [])
        setSelectedDistrict("")
        setWards([])
    }

    // Khi chọn quận → load phường/xã
    const handleDistrictChange = (districtCode: string) => {
        setSelectedDistrict(districtCode)
        const district = districts.find(d => d.code.toString() === districtCode)
        setWards(district?.wards || [])
        setSelectedWard("")
    }

    return (
        <div className="grid gap-4 py-4">
            {/* Province */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="province" className="text-right">Tỉnh/TP</Label>
                <Select onValueChange={handleProvinceChange}>
                    <SelectTrigger id="province" className="col-span-3">
                        <SelectValue placeholder="Chọn tỉnh/thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                        {provinces.map(province => (
                            <SelectItem key={province.code} value={province.code.toString()}>
                                {province.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* District */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="district" className="text-right">Quận/Huyện</Label>
                <Select onValueChange={handleDistrictChange} disabled={!districts.length}>
                    <SelectTrigger id="district" className="col-span-3">
                        <SelectValue placeholder="Chọn quận/huyện" />
                    </SelectTrigger>
                    <SelectContent>
                        {districts.map(district => (
                            <SelectItem key={district.code} value={district.code.toString()}>
                                {district.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Ward */}
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ward" className="text-right">Phường/Xã</Label>
                <Select onValueChange={setSelectedWard} disabled={!wards.length}>
                    <SelectTrigger id="ward" className="col-span-3">
                        <SelectValue placeholder="Chọn phường/xã" />
                    </SelectTrigger>
                    <SelectContent>
                        {wards.map(ward => (
                            <SelectItem key={ward.code} value={ward.code.toString()}>
                                {ward.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}
