'use client';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, CircleX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { TradeType } from "@/lib/types";
import WebSocket from 'isomorphic-ws';

export default function PairCards({item} : {item : TradeType}) {

    const tradingViewRef = useRef(null);
    const [volume, setVolume] = useState<number | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!tradingViewRef.current) return;
        
        if ((window as any).TradingView) {
            new (window as any).TradingView.widget({
                symbol: `BINANCE:${item.symbol}.P`,
                container_id: `tradingview_${item.symbol}`,
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

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${item.symbol.toLowerCase()}@ticker`);

        ws.onopen = () => {
            setLoading(true);
            // Set a timeout to handle cases where the data is not received
            timeoutId = setTimeout(() => {
                if (loading) {
                    setVolume(0);
                    setPrice(0);
                    setLoading(false);
                }
            }, 5000); // 5 seconds timeout
        };

        ws.onmessage = (event: { data: any; }) => {
            const data = JSON.parse(event.data);
            setVolume(parseFloat(data.v)); // 'v' is the volume
            setPrice(parseFloat(data.c)); // 'c' is the current price
            setLoading(false); // Data received successfully, stop loading
            clearTimeout(timeoutId); // Clear the timeout if data is received
        };

        ws.onerror = () => {
            setVolume(null);
            setPrice(null);
            setLoading(false);
            clearTimeout(timeoutId);
        };

        ws.onclose = () => {
            clearTimeout(timeoutId);
        };

        return () => {
            ws.close();
            clearTimeout(timeoutId);
        };
    }, [item.symbol]);

    const formatVolume = (volume: number) => {
        if (volume >= 1e9) {
            return (volume / 1e9).toFixed(1) + 'B';
        } else if (volume >= 1e6) {
            return (volume / 1e6).toFixed(1) + 'M';
        } else if (volume >= 1e3) {
            return (volume / 1e3).toFixed(1) + 'k';
        } else {
            return volume.toString();
        }
    }
    

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center w-full">
                <CardTitle className={`flex-shrink-0 w-1/3 text-left font-extrabold ${item.type === 'LONG' ? 'text-green-500' : 'text-red-500'}`}>{item.symbol}</CardTitle>
                <CardTitle className="flex-1 text-center">V:{loading ? 'Loading...' : volume ? formatVolume(volume) : 0}</CardTitle>
                <CardTitle className="flex-shrink-0 w-1/3 text-right">CP:{loading ? 'Loading...' : price}</CardTitle>
            </CardHeader>

            <CardContent>
                <div ref={tradingViewRef} id={`tradingview_${item.symbol}`} className="w-full mb-4"></div>
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
                            <TableCell>${price ? price : 0}</TableCell>
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
