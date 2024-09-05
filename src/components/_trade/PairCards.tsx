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
import { TradeType, WSDataType } from "@/lib/types";
import { useWebSocket } from '@/contexts/WebSocketContext';
import TradeCloseButton from "../_button/TradeCloseButton";
import TradeDcaButton from "../_button/TradeDcaButton";

export default function PairCards({item} : {item : TradeType}) {

    const tradingViewRef = useRef(null);
    const [volume, setVolume] = useState<number | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [changeAmount, setChangeAmount] = useState<number | null>(null);
    const [changePercentage, setChangePercentage] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const wsData = useWebSocket();

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
        if (wsData[item.symbol]) {
            setVolume(wsData[item.symbol]?.volume || 0);
            setPrice(wsData[item.symbol]?.price || 0);
            setChangeAmount(wsData[item.symbol]?.changeAmount || 0);
            setChangePercentage(wsData[item.symbol]?.changePercentage || 0);
            setLoading(false);
        }
    }, [wsData]);

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
                <CardTitle className="flex-shrink-0 w-1/3 text-left">
                    <div className={`font-extrabold ${item.type === 'LONG' ? 'text-success' : 'text-danger'}`}>{item.symbol}</div>
                    <div className="text-[12px] font-medium mt-2">{loading ? 'Loading...' : volume ? formatVolume(volume) : 0}</div>
                </CardTitle>
                <CardTitle className="flex-1 text-center">{loading ? 'Loading...' : volume ? formatVolume(volume) : 0}</CardTitle>
                <CardTitle className="flex-shrink-0 w-1/3 text-right">
                    <div className={`font-extrabold`}>{loading ? 'Loading...' : price}</div>
                    <div className={`text-[12px] font-medium mt-2 ${changeAmount && changeAmount >= 0 ? 'text-success' : 'text-danger'}`}>{loading ? 'Loading...' : changeAmount ? changeAmount+' ('+changePercentage+'%)' : 0}</div>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div ref={tradingViewRef} id={`tradingview_${item.symbol}`} className="w-full"></div>
                <Table className="w-full mt-4 mb-0">
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
                            <TableCell>{price ? price : 0}</TableCell>
                            <TableCell>$98</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Table className="w-full mt-2">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/4">Price</TableHead>
                            <TableHead className="w-1/4">Size</TableHead>
                            <TableHead className="w-1/4">Type</TableHead>
                            <TableHead className="w-1/4">Completed?</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>$110</TableCell>
                            <TableCell>50%</TableCell>
                            <TableCell>TP</TableCell>
                            <TableCell>Yes</TableCell>
                            <TableCell><CircleX color="white" size={20} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>$115</TableCell>
                            <TableCell>25%</TableCell>
                            <TableCell>TP</TableCell>
                            <TableCell>No</TableCell>
                            <TableCell><CircleX color="white" size={20} /></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>$115</TableCell>
                            <TableCell>100%</TableCell>
                            <TableCell>SL</TableCell>
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
            <CardFooter>
                <div className="flex flex-col md:flex-row items-center w-full">
                    <TradeDcaButton className="md:w-2/3 w-full mr-5 bg-success hover:bg-success text-zink" />
                    <TradeCloseButton className="md:w-2/3 w-full bg-destructive hover:bg-destructive text-zink" />
                </div>
            </CardFooter>
        </Card>
    )
}
