import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Check } from "lucide-react";
import { CreateTPSLSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useState, useTransition } from "react";

export default function StopLossForm() {
    const [isPending, startTransition] = useTransition();

    const defaultValues = {
        amount: undefined,
        percentage: undefined
    };

    const form = useForm<z.infer<typeof CreateTPSLSchema>>({
        resolver: zodResolver(CreateTPSLSchema),
        defaultValues: defaultValues
    });

    const onSubmit = (values: z.infer<typeof CreateTPSLSchema>) => {
        // Submit logic here
    };

    return (
        <div className="flex items-center mt-4">
            <Label className="mr-10">Stop.L:</Label>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-4">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input type="number" placeholder="Amount" value={field.value ?? ''} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="percentage"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <div className="relative flex items-center">
                                        <Input
                                            type="number"
                                            placeholder="Percentage"
                                            value={field.value ?? ''}
                                            onChange={field.onChange}
                                            className="pr-10" // Padding-right to create space for the '%' symbol
                                        />
                                        <span className="absolute right-2 text-gray-500">%</span> {/* Position the '%' symbol */}
                                    </div>
                                </FormControl>
                                <FormMessage className="text-xs" />
                            </FormItem>
                        )}
                    />
                    <button type="submit" className="p-0 bg-transparent hover:bg-transparent flex items-center">
                        <Check color="white" size={20} />
                    </button>
                </form>
            </Form>
        </div>
    );
}
