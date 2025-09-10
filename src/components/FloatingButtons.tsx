import {Button} from "@/components/ui/button";

export default function FloatingButtons() {
    return (
        <>
            {/* Nút nổi màu primary */}
            <Button
                className="fixed bottom-6 right-6 w-14 h-14 p-0 rounded-full shadow-lg flex items-center justify-center"
                variant="default"
            >
            </Button>
        </>
    );
}
