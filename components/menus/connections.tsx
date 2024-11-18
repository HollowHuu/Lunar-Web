import { useSession, signIn, signOut } from 'next-auth/react'
import { useState, useEffect, MouseEvent, FormEvent } from 'react'
import Link from 'next/link'

import ReactModal from 'react-modal';

// Types 
import { ValorantAccount } from '@/components/types';

interface RiotError {
    status: number;
    errors: [{}]
}



export default function Connections() {
    const { data: session, status } = useSession();

    const [riot, setRiot] = useState({
        name: '',
        puuid: '',
    });
    const [confirm, setConfirm] = useState({})
    const [modal, setModal] = useState(false);
    const [error, setError] = useState("");



    const unlinkAccount = (event: MouseEvent) => {
        event.preventDefault();
        console.log('unlink account')

        fetch("/api/account/riot/unlink", {
            method: "GET"
        }).then((res) => res.json())
        .then((data) => {
            if (data.riot) console.log(data)
            setRiot({
                name: '',
                puuid: ''
            })
        })
    }

    const redirect = () => {
        fetch("/api/oauth/link").then((res) => res.json())
        .then((data) => {
            console.log(data) // NOTE - Verify the data is correct
            window.location.href = data;
        })
    }


    useEffect(() => {
        async function getRiot() {
            if(status != 'authenticated') return;
            if(!session.user?.riot) return;
            const res = await fetch('/api/valorant/bypuuid' ,{
                method: 'GET',
            })
            if(res.status != 200) return;

            const data = await res.json();
            console.log({data})
            setRiot({
                name: `${data.name}#${data.tag}`,
                puuid: session.user.riot
            })
            
        }
        getRiot();
    }, [status, session?.user.riot])

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
            <div className="text-center text-[1.5rem] pb-[1rem] border-b-2 border-b-slate-300 mb-[1rem]">Connections</div>
            <form className="box-border outline-0" action="">
                <div className="grid grid-cols-2 gap-[1rem] mb-[1rem] items-center">
                    <div className='bg-[#ff4655] block p-[.5rem] border-[#727272] border-[1px] rounded-md text-center align-center'>
                        <svg className='m-auto' _ngcontent-ng-c2681147724="" fill="#000000" height="5rem" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title _ngcontent-ng-c2681147724="">Riot Games icon</title><path _ngcontent-ng-c2681147724="" d="M12.534 21.77l-1.09-2.81 10.52.54-.451 4.5zM15.06 0L.307 6.969 2.59 17.471H5.6l-.52-7.512.461-.144 1.81 7.656h3.126l-.116-9.15.462-.144 1.582 9.294h3.31l.78-11.053.462-.144.82 11.197h4.376l1.54-15.37Z"></path></svg>
                        {riot.name && (
                            <div className='text-white text-lg'>
                                <p>{riot.name}</p>
                                <p>{riot.puuid}</p>
                                <button className='mt-2 border-2 border-slate-300 p-2 rounded-md' onClick={e => unlinkAccount(e)}>Disconnect Account</button>
                            </div>
                        )}
                        {!riot.name && (
                            <div className='text-white text-lg'>
                                <button className='mt-2 border-2 border-slate-300 p-2 rounded-md' onClick={redirect}>Connect Account</button>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}