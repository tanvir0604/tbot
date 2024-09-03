'use client';

import ActionButton from "@/components/_button/ActionButton";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateOrderSchema } from "@/lib/schema";
import { useState, useTransition } from "react";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

  

import { createOrder } from "@/lib/actions";
import Notification from "@/components/Notification";
import { NotificationType } from "@/lib/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";


export default function CreateNewOrderForm({symbol}:{symbol:string}) {
    const [ isPending, startTransition ] = useTransition();
    const [ message, setMessage ] = useState<NotificationType>({});

    const defaultValues = {
        symbol: symbol,
        price: 0,
        quantity: 0,
        type: 'BUY'
    };

    const form = useForm<z.infer<typeof CreateOrderSchema>>({
        resolver: zodResolver(CreateOrderSchema),
        defaultValues: defaultValues,
    });

    const onSubmit = (values: z.infer<typeof CreateOrderSchema>) => {
        setMessage({});
        startTransition(() => {
            createOrder(values)
            .then((data) => {
                if(data?.type){
                    setMessage(data);
                    form.reset(defaultValues);
                }
            });
        })
    }


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
                                <Input readOnly type="text" placeholder="" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                    />

                    <FormField 
                    control={form.control} 
                    name="type" 
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="BUY">BUY</SelectItem>
                                    <SelectItem value="SELL">SELL</SelectItem>
                                </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                    />
                    
                    <FormField 
                    control={form.control} 
                    name="quantity" 
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="200" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                    />

                    <FormField 
                    control={form.control} 
                    name="price" 
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price (USDT)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="60" {...field} />
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