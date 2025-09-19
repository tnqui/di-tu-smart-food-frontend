import {Loader2} from "lucide-react";

export function Spinner() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <Loader2 className="h-10 w-10 animate-spin text-primary"/>
        </div>
    );
}
