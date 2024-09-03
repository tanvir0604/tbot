import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black dark:text-zinc-200 tracking-wide border-t mt-auto">
      {/* <div className="container flex flex-wrap items-center justify-center px-4 py-8 mx-auto  lg:justify-between max-w-7xl m-auto">
        <div className="flex flex-wrap justify-center">
          <ul className="flex items-center space-x-4">
            <li><Link href={"/"}>Home</Link></li>
            <li><Link href={"/"}>Settings</Link></li>
          </ul>
        </div>
        
      </div> */}
      <div className="pb-6 pt-6">
        <p className="text-center">
          @2024 All Rights Reserver
        </p>
      </div>
    </footer>
  )
}