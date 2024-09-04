'use client';
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export default function ActionButton({
    type, pending, children, className, onClick
}:{type: "submit"|"button"|"reset", pending: boolean, children:string, className?:string, onClick?: () => void}) {
    return (
        <Button type={type} onClick={onClick} className={cn("w-full text-zinc-100", className)} disabled={pending}>
            {pending?
            <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
            </>
            :
            <>
                {children}
            </>
            }
        </Button>
    );
}