
import CreateNewOrderForm from "@/components/_form/CreateNewOrderForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
export default function CreateNewOrderButton({symbol}:{symbol:string}){
    
    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button className="bg-primary text-zinc-100 w-full">Create New Order</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => {
          e.preventDefault();
        }}>
            <DialogHeader>
            <DialogTitle>Create New Trade</DialogTitle>
            <DialogDescription>
                Please choose right data before you submit.
            </DialogDescription>
            </DialogHeader>
            
            <CreateNewOrderForm symbol={symbol}/>
            
        </DialogContent>
        </Dialog>
    )
}