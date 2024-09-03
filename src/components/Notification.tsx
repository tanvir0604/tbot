import { cn } from "@/lib/utils";
import { BadgeCheck, BadgeAlert } from "lucide-react";
import { NotificationType } from "@/lib/types";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


type props = NotificationType & {
    className?: string
}
export default function Notification({type, msg, className}: props) {
    const [msgType, setMsgType] = useState(type);
    useEffect(() => {
        setMsgType(type);
        if(type == 'success' || type == 'error'){
            setTimeout(() => {
                setMsgType('');
            }, 5000);
        }
    }, [type, msg]);
    return (
        <>
            {msgType &&
                <Alert variant={msgType == 'error'?'destructive':'default'} className={cn('w-full', className, msgType == 'success'?'bg-success':'')}>
                    {msgType == 'success' && <BadgeCheck className="h-4 w-4" />}
                    {msgType == 'error' && <BadgeAlert className="h-4 w-4" />}
                    <AlertTitle>সতর্কতা!</AlertTitle>
                    <AlertDescription>
                        {msg}
                    </AlertDescription>
                </Alert>
            }
        </>
        
    )
}