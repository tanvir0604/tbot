import { X } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { cancelOrder } from "@/lib/actions";
  
export default function CloseTradeButton({symbol, orderId, disabled}:{symbol: string, orderId: BigInt, disabled: boolean}){
    const cancelAction = async () => {
        if(disabled) return false;
        await cancelOrder(symbol, orderId);
    }
    return (

        <AlertDialog>
        <AlertDialogTrigger asChild>
            <X size={14} className={disabled?"cursor-not-allowed":"cursor-pointer"}/>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                You are going to cancel this order.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                    <Button onClick={cancelAction} className="text-zinc-100">Continue</Button>
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
        </AlertDialog>


        
    )
}