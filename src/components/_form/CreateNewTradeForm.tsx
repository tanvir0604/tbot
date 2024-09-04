'use client';

import ActionButton from "@/components/_button/ActionButton";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateNewTradeSchema } from "@/lib/schema";
import { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

  

import { createNewTrade } from "@/lib/actions";
import Notification from "@/components/Notification";
import { NotificationType } from "@/lib/types";
import SelectCoin from "@/components/SelectCoin";


export default function CreateNewTradeForm() {
    const [ isPending, startTransition ] = useTransition();
    const [ message, setMessage ] = useState<NotificationType>({});
    const [ symbol, setSymbol ] = useState<string>('');

    const defaultValues = {
        symbol: ""
    };

    const form = useForm<z.infer<typeof CreateNewTradeSchema>>({
        resolver: zodResolver(CreateNewTradeSchema),
        defaultValues: defaultValues,
    });

    const onSubmit = (values: z.infer<typeof CreateNewTradeSchema>) => {
        setMessage({});
        startTransition(() => {
            createNewTrade(values)
            .then((data) => {
                if(data?.type){
                    setMessage(data);
                    if(data.type == 'success'){
                        form.reset(defaultValues);
                    }
                }
            });
        })
    }

    useEffect(() => {
        checkTrade(symbol);
    }, [symbol])


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <Notification type={message.type} msg={message.msg} className="mb-3" />


                <div className="space-y-3 text-zinc-700 dark:text-zinc-400">
                    
                    <FormField 
                    control={form.control} 
                    name="symbol" 
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Symbol</FormLabel>
                            <FormControl>
                                <SelectCoin defaultValue={field.value} onSelect={(value:string) => {
                                    form.setValue("symbol", value);
                                    setSymbol(value);
                                }}/>
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                    />
                    
                </div>
                <ActionButton pending={isPending} className="mt-3" type="submit">Create New Trade</ActionButton>
            </form>
        </Form>
    );
}