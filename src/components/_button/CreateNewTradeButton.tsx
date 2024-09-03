'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateNewTradeForm from "@/components/_form/CreateNewTradeForm";

export default function CreateNewTradeButton(){
    return(
        <Dialog>
        <DialogTrigger asChild>
            <Button className="bg-primary text-zinc-100">Create New Trade</Button>
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
            
            <CreateNewTradeForm />
            
        </DialogContent>
        </Dialog>

    )
}