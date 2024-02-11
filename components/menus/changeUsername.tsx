import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

const Username = () => {
    const name = (document.getElementById('newUsername') as HTMLInputElement)?.value

    if (!name) return alert('No name provided')
    if (name === 'undefined') return alert('Name is the same')

    fetch('api/account/username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name})
    })
}

export default function ChangeUsername() {
    const { data: session, status } = useSession();
    if(status == 'unauthenticated') return (
        <div className='mx-auto text-center'>
        <h1>Access Denied<br />You must be signed in to view this page</h1>
        <br />
        <p>
            <Link
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                href="/api/auth/signin"
                onClick={(e) => {
                    e.preventDefault();
                    signIn();
                }}
            >
                Sign In
            </Link>
        </p>
      </div>
    )
    return (
        <div>
            <div className="text-center text-[1.5rem] pb-[1rem] border-b-2 border-b-slate-300 mb-[1rem]">Change Username</div>
            <div className="box-border outline-0">
                <div className="grid grid-cols-4 gap-[1rem] mb-[1rem] items-center">
                    <label className="text-right pr-[1rem]" htmlFor="currentUsername">Current Username</label>
                    <input className="bg-[#9b9b9b] border-2 border-[#727272] rounded-md p-[.5rem] text-lg outline-0" type="text" id="currentUsername" name="currentUsername" value={session?.user.name || "undefined"} disabled />
                </div>
                <div className="grid grid-cols-4 gap-[1rem] mb-[1rem] items-center">
                    <label className="text-right pr-[1rem]" htmlFor="newUsername">New Username</label>
                    <input className="bg-[#cecece] border-2 border-[#727272] rounded-md p-[.5rem] text-lg outline-0" type="text" id="newUsername" name="newUsername" placeholder="New Username"/>
                </div>

                <div className='flex justify-end'>
                    <button className='p-5 border border-blue-500 bg-blue-500 rounded-lg' onClick={e => Username()}>
                        Change Username
                    </button> 
                </div>

            </div>
        </div>
    )
}
