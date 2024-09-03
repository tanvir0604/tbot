const WS_URL = 'wss://testnet.binancefuture.com/ws-fapi/v1';

export default function WebSocket(endPoint: string){
    const ws = new WebSocket(`${WS_URL}/${endPoint}`);
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setPrice(data.p);
    };
    return () => ws.close();
}