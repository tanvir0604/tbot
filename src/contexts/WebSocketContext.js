'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Define the context and provider
const WebSocketContext = createContext(null);

export function WebSocketProvider({ coins, children }) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!coins || coins.length === 0) return;

    // Create WebSocket connection
    const socket = new WebSocket('wss://stream.binance.com:9443/ws');

    // Send subscription request for each coin
    socket.onopen = () => {
      const symbols = coins.map(coin => `${coin.symbol.toLowerCase()}@ticker`).join('/');
      socket.send(JSON.stringify({
        method: 'SUBSCRIBE',
        params: symbols.split('/'),
        id: 1
      }));
    };

    // Handle incoming messages
    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.e === '24hrTicker') {
        setData(prevData => ({
          ...prevData,
          [parsedData.s]: {
            volume: parseFloat(parsedData.v),
            price: parseFloat(parsedData.c),
            changeAmount: parseFloat(parsedData.p),
            changePercentage: parseFloat(parsedData.P),
          }
        }));
      }
    };

    return () => {
      socket.close();
    };
  }, [coins]);

  return (
    <WebSocketContext.Provider value={data}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext);
}
