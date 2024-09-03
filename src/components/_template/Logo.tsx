// import Image from "next/image";
// import LogoImage from '@/../public/logo/logo256.png'
export default function Logo() {
    return (
        <>
        {/* <Image src={LogoImage} alt="Logo" height={35}></Image> */}
        <span className="h-auto font-bold text-3xl bg-primary text-zinc-100 tracking-tighter rounded-s-sm ps-1 pe-2">T</span>
        <span className="h-auto font-bold text-3xl dark:text-primary text-zinc-100 bg-zinc-700 dark:bg-zinc-100 rounded-e-sm tracking-tighter ps-1 pe-2">B</span>
        </>
    );
}