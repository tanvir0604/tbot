import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function roundToTwo(num:number) {
  return (Math.round((Number(num)+Number.EPSILON) * 100) / 100).toFixed(2);
}

export function roundToFour(num:number) {
  return (Math.round((Number(num)+Number.EPSILON) * 10000) / 10000).toFixed(4);
}

export function generalNumber(num:number){
  return roundToFour(num);
}