'use client';
import { Button } from "@/components/ui/button";

const handleClidk = () => {
    alert('hi');
  }
export default function MyButton(){
    return (
        <Button onClick={handleClidk}>Click</Button>
    )
}