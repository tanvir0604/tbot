import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Check } from "lucide-react";

export default function TakeProfitForm() {
  return (
    <div className="flex flex-col md:flex-row items-center mt-4">
        <Label className="flex-shrink-0 mb-2 md:mb-0 md:mr-2">Take Profit:</Label>
        <Input className="flex-1 mb-2 md:mb-0 md:mr-2" placeholder="Enter value" />
        <Input className="flex-1 mb-2 md:mb-0 md:mr-2" placeholder="Enter percentage" />
        <Check color="white" size={20} />
    </div>
  );
}
