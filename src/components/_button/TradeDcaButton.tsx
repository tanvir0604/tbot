'use client';
import { Button } from "@/components/ui/button";
import { TradeDCAAndClose } from "@/lib/types";

export default function TradeDcaButton({ className = '' }: TradeDCAAndClose) {
    return (
        <Button className={`flex ${className}`}>DCA</Button>
    );
}