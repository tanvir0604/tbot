"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { TradingPairType } from "@/lib/types"

const coins:TradingPairType[] = [];

import { getTradingPairs } from '@/lib/actions';

export default function SelectCoin({onSelect, defaultValue}:{onSelect:Function, defaultValue:string}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(defaultValue)
  const [coinData, setCoinData] = React.useState<TradingPairType[]>([])

  const fetchData = async () => {
    let data:TradingPairType[]|false = await getTradingPairs();
    if(data){
        setCoinData(data);
    }
  }
  
  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? coinData.find((item:TradingPairType) => item.symbol === value)?.symbol
            : "Select coin..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {coinData.map((item, index) => (
                <CommandItem
                  key={index}
                  value={item.symbol}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    onSelect(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.symbol ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.symbol}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
