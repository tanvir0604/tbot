import prisma from "@/lib/prisma";
import { QueryType } from "../types";
import { Prisma } from "@prisma/client";


export default class Model {
    table: Uncapitalize<Prisma.ModelName>;
    constructor(){
        this.table = 'user';
    }

    async createItem (
        data: {},
        disconnect: boolean = true
    ) {
        try {
            const item = await (prisma[this.table] as any).create({
                data: data
            });
            return item;
        } catch (error) {
            return false;
        }finally{
            if(disconnect){
                await prisma.$disconnect();
            }
        }
    }

    async createManyItem (
        data: {}[],
        disconnect: boolean = true
    ) {
        try {
            const item = await (prisma[this.table] as any).createMany({
                data: data,
                skipDuplicates: true
            });
            return item;
        } catch (error) {
            return false;
        }finally{
            if(disconnect){
                await prisma.$disconnect();
            }
        }
    }


    async getItemCount(
        where: {} | undefined,
        disconnect: boolean = true
    ){
        try {
            const count = await (prisma[this.table] as any).aggregate({
                where: where,
                _count: {
                    id: true
                }
            });
            return count._count?.id ?? 0;
        } catch (error) {
            return 0;
        }finally{
            if(disconnect){
                await prisma.$disconnect();
            }
        }
    }


    async getItems(
        where?: {} | undefined,
        select?:{} | undefined | null | false,
        include?:{} | undefined,
        orderBy?:{} | undefined,
        limit?:number|undefined, 
        skip?:number|undefined,
        disconnect: boolean = true
    ) {
        try {
            let query:QueryType = {where: where, take: limit, skip: skip, orderBy: orderBy};
            select?query.select=select:query.include = include;
            const items = await (prisma[this.table] as any).findMany(query);
            return items;
        } catch (error) {
            return [];
        }finally{
            if(disconnect){
                await prisma.$disconnect();
            }
        }
    }


    async getItemDetails(
        where: {},
        select?:{} | undefined | false | null,
        include?:{} | undefined,
        disconnect: boolean = true
    ) {
        try {
            let query:QueryType = {where: where};
            select?query.select=select:query.include = include;
            const item = await (prisma[this.table] as any).findFirst(query);
            return item;
        } catch (error) {
            return false;
        }finally{
            if(disconnect){
                await prisma.$disconnect();
            }
        }
        
    }

    async getItemDetailsById(
        id: number,
        select?:{} | undefined,
        include?:{} | undefined,
        disconnect: boolean = true
    ) {
        try {
            let query:QueryType = {where: {id: id}};
            select?query.select=select:query.include = include;
            const item = await (prisma[this.table] as any).findFirst(query);
            return item;
        } catch (error) {
            return false;
        }finally{
            if(disconnect){
                await prisma.$disconnect();
            }
        }
        
    }

    async updateItems (
        where: {}, 
        data: {},
        disconnect: boolean = true
    ) {
        try {
            const item = await (prisma[this.table] as any).update({
                where: where,
                data: data
            });
            return item;
        } catch (error) {
            return false;
        }finally{
            if(disconnect){
                await prisma.$disconnect();
            }
        }
    }

    async updateOrCreateItems (
        where: {}, 
        update: {},
        create: {},
        disconnect: boolean = true
    ) {
        try {
            const item = await (prisma[this.table] as any).upsert({
                where: where,
                update: update,
                create: create
            });
            return item;
        } catch (error) {
            return false;
        }finally{
            if(disconnect){
                await prisma.$disconnect();
            }
        }
    }

    async updateItemById (
        id: number, 
        data: {},
        disconnect: boolean = true
    ) {
        try {
            const item = await (prisma[this.table] as any).update({
                where: {
                    id: id
                },
                data: data
            });
            return item;
        } catch (error) {
            return false;
        }finally{
            if(disconnect){
                await prisma.$disconnect();
            }
        }
    }


    async deleteItem(
        where: {},
        disconnect: boolean = true
    ) {
        try {
            const item = await (prisma[this.table] as any).delete({
                where: where
            });
            return item;
        } catch (error) {
            return false;
        }finally{
            if(disconnect){
                await prisma.$disconnect();
            }
        }
    }


    async deleteItemById(
        id: number,
        disconnect: boolean = true
    ) {
        try {
            const item = await (prisma[this.table] as any).delete({
                where: {id: id}
            });
            return item;
        } catch (error) {
            return false;
        }finally{
            if(disconnect){
                await prisma.$disconnect();
            }
        }
    }

    async deleteManyItem(
        where: {},
        disconnect: boolean = true
    ) {
        try {
            const item = await (prisma[this.table] as any).deleteMany({
                where: where
            });
            return item;
        } catch (error) {
            return false;
        }finally{
            if(disconnect){
                await prisma.$disconnect();
            }
        }
    }

    async getAggrItems(
        aggregate: {},
        where?: {} | undefined,
        disconnect: boolean = true
    ) {
        try {
            const item = await (prisma[this.table] as any).aggregate({
                ...aggregate,
                where: where
            });
            return item;
        } catch (error) {
            return false;
        }finally{
            if(disconnect){
                await prisma.$disconnect();
            }
        }
    }

    async truncate(
        disconnect: boolean = true
    ) {
        try {
            const item = await (prisma[this.table] as any).deleteMany();
            return item;
        } catch (error) {
            return false;
        }finally{
            if(disconnect){
                await prisma.$disconnect();
            }
        }
    }
}