import Logo from "@/components/_template/Logo";
import { ModeToggle } from "@/components/_template/ModeToggle";
import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CreateNewTradeButton from "@/components/_button/CreateNewTradeButton";
// import ProfileInfo from "@/components/ProfileInfo";
// import RefreshButton from "./RefreshButton";

export async function Navbar() {
  return (
    <div className="bg-white dark:bg-black dark:border-b drop-shadow-lg">
      <div className="flex h-20 shrink-0 items-center max-w-7xl mx-auto px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetClose asChild>
              <Link href="/" className="lg:hidden" prefetch={false}>
                <Logo />
              </Link>
            </SheetClose>
            <hr className="my-4" />
            <div className="grid gap-2">
              <SheetClose asChild>
                <Link
                  href="/"
                  className="text-lg tracking-wide text-zinc-900 dark:text-zinc-200 hover:text-primary active:text-primary"
                >
                  Home
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/"
                  className="text-lg tracking-wide text-zinc-900 dark:text-zinc-200 hover:text-primary active:text-primary"
                >
                  Settings
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <CreateNewTradeButton />
              </SheetClose>
              
            </div>
          </SheetContent>
        </Sheet>
        <div className="lg:hidden flex ml-auto gap-2">
          <ModeToggle />
        </div>
          <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
            <Logo />
          </Link>
          <div className="ml-auto">
            {/* <ProfileInfo /> */}
          </div>
          <nav className="ml-auto hidden lg:flex gap-2">
            {/* <Link
              href="/"
              className="text-lg tracking-wide text-zinc-900 dark:text-zinc-200 hover:text-primary active:text-primary"
            >
              Home
            </Link>
            <Link
              href="/"
              className="text-lg tracking-wide text-zinc-900 dark:text-zinc-200 hover:text-primary active:text-primary"
            >
              Settings
            </Link> */}
            {/* <RefreshButton /> */}
            <CreateNewTradeButton />
            
            <ModeToggle /> 
          </nav>
      </div>
    </div>
  )
}

function MenuIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}