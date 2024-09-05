import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming you're using a button component from your UI kit
import { SettingsIcon } from "lucide-react"; // Using Lucide for icons, replace with your preferred icon library

export function SettingsButton() {
  return (
    <Link href="/Settings" passHref target="_blank">
      <Button variant="outline" size="icon">
        <SettingsIcon className="h-5 w-5" />
        <span className="sr-only">Settings</span> {/* Accessible label */}
      </Button>
    </Link>
  );
}
