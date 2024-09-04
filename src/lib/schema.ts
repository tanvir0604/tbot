import { z } from 'zod';

export const CreateOrderSchema = z.object({
    symbol: z.string({
        required_error: "This field is required",
        invalid_type_error: "String needed"
    }).min(1, "This field is required"),
    quantity: z.coerce.number({
        required_error: "This field is required",
        invalid_type_error: "Number needed"
    }).positive({
        message: "must be positive",
    }).min(0.001, {message: "must be greater than 0.001",}),
    price: z.coerce.number({
        required_error: "This field is required",
        invalid_type_error: "Number needed"
    }).positive({
        message: "must be positive",
    }).min(0.001, {message: "must be greater than 0.001",}),
    type: z.string({
        required_error: "This field is required",
        invalid_type_error: "String needed"
    }).min(1, "This field is required")
});

export const CreateNewTradeSchema = z.object({
    symbol: z.string({
        required_error: "This field is required",
        invalid_type_error: "String needed"
    }).min(1, "This field is required"),
    price: z.coerce.number({
        required_error: "This field is required",
        invalid_type_error: "Number needed"
    }).positive({
        message: "must be positive",
    }).min(5, {message: "must be greater than 5",}),
    size: z.coerce.number({
        required_error: "This field is required",
        invalid_type_error: "Number needed"
    }).positive({
        message: "must be positive",
    }).min(5, {message: "must be greater than 5",}),
    quantity: z.coerce.number({
        required_error: "This field is required",
        invalid_type_error: "Number needed"
    }).positive({
        message: "must be positive",
    }).min(0.02, {message: "must be greater than 0.02",}),
    leverage: z.string({
        required_error: "This field is required",
        invalid_type_error: "String needed"
    }).min(1, "This field is required"),
});