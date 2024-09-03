// components/PairCards.js
'use client';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, CircleX } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function PairCards({symbol} : {symbol : String}) {

    const tradingViewRef = useRef(null);

    useEffect(() => {
        if (!tradingViewRef.current) return;
        
        if ((window as any).TradingView) {
            // Initialize the TradingView widget
            new (window as any).TradingView.widget({
                symbol: symbol,  // Dynamic symbol
                container_id: `tradingview_${symbol}`,  // Unique container ID
                width: '100%',
                height: 300,
                interval: '1H',
                timezone: 'Etc/UTC',
                theme: 'dark',
                style: '1',
                locale: 'en',
                toolbar_bg: '#f1f3f6',
                enable_publishing: false,
                allow_symbol_change: false,
                studies: ['BB@tv-basicstudies'],
                show_popup_button: true,
                popup_width: '1000',
                popup_height: '650',
            });
        };
    }, []);

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center w-full">
                <CardTitle className="flex-shrink-0 w-1/3 text-left">{symbol}</CardTitle>
                <CardTitle className="flex-1 text-center">V:204567</CardTitle>
                <CardTitle className="flex-shrink-0 w-1/3 text-right">CP:59345.02</CardTitle>
            </CardHeader>

            <CardContent>
                <div ref={tradingViewRef} id={`tradingview_${symbol}`} className="w-full mb-4"></div>
                <Table className="w-full mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Entry Price</TableHead>
                            <TableHead>Breakeven Price</TableHead>
                            <TableHead>Mark. Price</TableHead>
                            <TableHead>Liq. Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>$100</TableCell>
                            <TableCell>$105</TableCell>
                            <TableCell>$102</TableCell>
                            <TableCell>$98</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <h5 className="mt-4 text-left w-full">Take Profit</h5>
                <Table className="w-full mt-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/3">Price</TableHead>
                            <TableHead className="w-1/3">Size</TableHead>
                            <TableHead className="w-1/3">Completed?</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>$110</TableCell>
                            <TableCell>50%</TableCell>
                            <TableCell>Yes</TableCell>
                            <TableCell><CircleX color="white" size={20} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>$115</TableCell>
                            <TableCell>25%</TableCell>
                            <TableCell>No</TableCell>
                            <TableCell><CircleX color="white" size={20} /></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className="flex flex-col md:flex-row items-center mt-4">
                    <Label className="flex-shrink-0 mb-2 md:mb-0 md:mr-2">Take Profit:</Label>
                    <Input className="flex-1 mb-2 md:mb-0 md:mr-2" placeholder="Enter value" />
                    <Input className="flex-1 mb-2 md:mb-0 md:mr-2" placeholder="Enter percentage" />
                    <Check color="white" size={20} />
                </div>
                <div className="flex flex-col md:flex-row items-center mt-4">
                    <Label className="flex-shrink-0 mb-2 md:mb-0 md:mr-2">Stop Loss:</Label>
                    <Input className="flex-1 mb-2 md:mb-0 md:mr-2" placeholder="Enter value" />
                    <Input className="flex-1 mb-2 md:mb-0 md:mr-2" placeholder="Enter percentage" />
                    <Check color="white" size={20} />
                </div>
            </CardContent>
        </Card>
    )
}
