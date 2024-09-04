"use client";

import { useEffect, useState } from "react";
import {roundToTwo} from "@/lib/utils";

export default function ProfileInfo(){
    const [timerCount, setTimerCount] = useState(0);
    const [balanceInfo, setbalanceInfo] = useState<BalanceDataType>();

    const fetchData = async () => {
        let response:BalanceDataType[]|false = await getAccountInfo();
        if(!response) return false;
        let data:BalanceDataType[] = response.filter((item:BalanceDataType) => {
            return item.asset == "USDT";
        });
        if(data){
            setbalanceInfo(data[0]);
        }
    }

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(() => {
            setTimerCount(timerCount+1);
        }, 60000);
        return () => clearInterval(intervalId);
    }, [timerCount]);


    return(
        <div className="text-center leading-3">
            <div className="font-extrabold text-2xl text-primary">
                {roundToTwo(balanceInfo?.free??0)} USDT 
                <span className="text-[10px]">=${roundToTwo(balanceInfo?.free??0)}</span>
            </div>
        </div>
    )
}