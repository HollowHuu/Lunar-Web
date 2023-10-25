import { useSession } from 'next-auth/react';



export default function HeaderDropdown() {
    const { data: session, status } = useSession();

    return (
        <div className="float-left absolute text-center bg-white text-black min w-full min-w-[160px] shadow-black z-10 right-0 left-auto rounded-s-lg rounded-tr-none text-[1.2em]">
            {status == "authenticated" && <a className="block px-[12px]" href="/settings">Settings</a>}
            <a className="block px-[12px]" href="/help">Help</a>
            {status == "authenticated" && <a className="block px-[12px]" href="/api/auth/signout">Logout</a>}
            {status == "unauthenticated" && <a className="block px-[12px]" href="/api/auth/signin">Login</a>}
            <p className="text-[0.8em] text-slate-700">Made by HollowHuu</p>
        </div>
    )
}