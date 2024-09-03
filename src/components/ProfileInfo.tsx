"use client";

// import { useEffect, useState } from "react";
// import {roundToTwo} from "@/lib/utils";

// export default function ProfileInfo(){
//     const [timerCount, setTimerCount] = useState(0);
//     const [balanceInfo, setbalanceInfo] = useState<BalanceDataType>();

//     const fetchData = async () => {
//         let response:BalanceDataType[]|false = await getAccountInfo();
//         if(!response) return false;
//         let data:BalanceDataType[] = response.filter((item:BalanceDataType) => {
//             return item.asset == "USDT";
//         });
//         if(data){
//             setbalanceInfo(data[0]);
//         }
//     }

//     useEffect(() => {
//         fetchData();
//         const intervalId = setInterval(() => {
//             setTimerCount(timerCount+1);
//         }, 60000);
//         return () => clearInterval(intervalId);
//     }, [timerCount]);


//     return(
//         <div className="text-center leading-3">
//             <div className="font-extrabold text-2xl text-primary">
//                 {roundToTwo(balanceInfo?.free??0)} USDT 
//                 <span className="text-[10px]">=${roundToTwo(balanceInfo?.free??0)}</span>
//             </div>
//         </div>
//     )
// }




import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function ProfileInfo(){
  //Public API that will echo messages sent to it back to the client
  const [socketUrl, setSocketUrl] = useState('wss://echo.websocket.org');
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
    }
  }, [lastMessage]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl('wss://demos.kaazing.com/echo'),
    []
  );

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <div>
      <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  );
};