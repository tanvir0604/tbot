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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

  

import { checkTrade, createNewTrade } from "@/lib/actions";
import Notification from "@/components/Notification";
import { NotificationType } from "@/lib/types";
import SelectCoin from "@/components/SelectCoin";


export default function CreateNewTradeForm() {
    const [ isPending, startTransition ] = useTransition();
    const [ message, setMessage ] = useState<NotificationType>({});
    const [ symbol, setSymbol ] = useState<string>('');
    const [ leverage, setLeverage ] = useState<number>(1);
    const [ price, setPrice ] = useState<number>(0);
    const [ quantity, setQuantity ] = useState<number>(0);
    const [ size, setSize ] = useState<number>(0);

    const defaultValues = {
        symbol: "",
        price: 0,
        size: 0,
        quantity: 0,
        leverage: "1"
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
        if(symbol == "") return;
        checkTrade(symbol).then((res) => {
            if(res == true){
                console.log(res);
            }else{
                setMessage(res);
            }
        }).catch((err) => {
            console.log(err);
        });
    }, [symbol]);



    useEffect(() => {
        console.log('updating price');
        let price = form.getValues('price');
        if(price <= 0) return;
        let qty = (size*leverage)/price;
        form.setValue('quantity', qty);
    }, [price]);
    useEffect(() => {
        console.log('updating size');
        let size = form.getValues('size');
        if(price <= 0) return;
        let qty = (size*leverage)/price;
        form.setValue('quantity', qty);
    }, [size]);
    useEffect(() => {
        console.log('updating quantity');
        let quantity = form.getValues('quantity');
        let size = quantity*price;
        form.setValue('size', size);
    }, [quantity])
    useEffect(() => {
        console.log('updating leverage');
        let size = form.getValues('size');
        if(price <= 0) return;
        let qty = (size*leverage)/price;
        form.setValue('quantity', qty);
    }, [leverage])


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


                    <FormField 
                    control={form.control} 
                    name="leverage" 
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>Adjust Leverage</FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={(value:string) => {
                                field.onChange;
                                setLeverage(Number(value));
                            }}
                            defaultValue={field.value}
                            className="flex space-x-2"
                            >
                            <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="1" />
                                </FormControl>
                                <FormLabel className="font-normal">1x</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="2" />
                                </FormControl>
                                <FormLabel className="font-normal">2x</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="5" />
                                </FormControl>
                                <FormLabel className="font-normal">5x</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="10" />
                                </FormControl>
                                <FormLabel className="font-normal">10x</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="15" />
                                </FormControl>
                                <FormLabel className="font-normal">15x</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="20" />
                                </FormControl>
                                <FormLabel className="font-normal">20x</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-1 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="25" />
                                </FormControl>
                                <FormLabel className="font-normal">25x</FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />


                    <FormField 
                    control={form.control} 
                    name="price" 
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input onChangeCapture={e => setPrice(Number(e.currentTarget.value))} type="number" placeholder="Price" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                    />

                    <FormField 
                    control={form.control} 
                    name="size" 
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Size</FormLabel>
                            <FormControl>
                                <Input onChangeCapture={e => setSize(Number(e.currentTarget.value))} type="number" placeholder="Size" {...field} />
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
                                <Input onChangeCapture={e => setQuantity(Number(e.currentTarget.value))} type="number" placeholder="Quantity" {...field} />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                    />
                    
                </div>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <ActionButton pending={isPending} className="mt-3 bg-success hover:bg-success/90" type="submit">Buy / Long</ActionButton>
                        <div className="mt-2 text-start">
                            <span className="block text-[11px] text-zinc-500">Est Liq Price: <span className="text-zinc-200 text-sm">100</span></span>
                            <span className="block text-[11px] text-zinc-500">Cost: <span className="text-zinc-200 text-sm">{size*leverage} USDT</span></span>
                            <span className="block text-[11px] text-zinc-500">Max: <span className="text-zinc-200 text-sm">100</span></span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <ActionButton pending={isPending} className="mt-3 bg-destructive hover:bg-destructive/90" type="submit">Sell / Short</ActionButton>
                        <div className="mt-2 text-end">
                            <span className="block text-[11px] text-zinc-500">Est Liq Price: <span className="text-zinc-200 text-sm">100</span></span>
                            <span className="block text-[11px] text-zinc-500">Cost: <span className="text-zinc-200 text-sm">{size*leverage}</span></span>
                            <span className="block text-[11px] text-zinc-500">Max: <span className="text-zinc-200 text-sm">100</span></span>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    );
}