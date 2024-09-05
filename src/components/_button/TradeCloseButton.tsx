'use client';
import { Button } from "@/components/ui/button";
import { TradeDCAAndClose } from "@/lib/types";

export default function TradeCloseButton({ className = '' }: TradeDCAAndClose) {
    return (
        <Button className={`flex ${className}`}>Close Trade</Button>
    );
}