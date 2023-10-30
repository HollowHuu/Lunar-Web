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

    const openModal = (e: MouseEvent) => {
        e.preventDefault();
        setModal(true);
    }
    const closeModal = (e: MouseEvent) => {
        e.preventDefault();
        setModal(false);
    }

    const searchAccount = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();        

        fetch('/api/account/riot', {
            method: 'GET',
            headers: {
                'name': (e.currentTarget[0] as HTMLFormElement).value,
            }
        }).then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if(data.status != 200) return setError(data.message || data.error);

            const valo: ValorantAccount = data.data;
            setConfirm(valo)
        })
    }

    const confirmAccount = (e: MouseEvent) => {
        e.preventDefault();

        fetch('/api/account/riot', {
            method: 'POST',
            body: JSON.stringify(confirm),
        }).then((res) => {
            if(res.status != 200) {
                res.json().then(data => {
                    if(data.message) return setError(data.message);
                    if(data.error) return setError(data.error)
                })
                
            }
            window.location.reload();
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
    }, [status])

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
                                <button className='mt-2 border-2 border-slate-300 p-2 rounded-md'>Disconnect Account</button>(Coming Soon)
                            </div>
                        )}
                        {!riot.name && (
                            <div>
                                                   <div className='text-white text-lg'>
                                <button className='mt-2 border-2 border-slate-300 p-2 rounded-md' onClick={openModal}>Connect Account</button>
                            </div>
                                <ReactModal isOpen={modal} style={{content: {
                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                },
                                overlay: {
                                    backgroundColor: 'rgba(0,0,0,0)',
                                
                                }}} >
                                    <div className='text-center align-center'>

                                        {/* Close button top right */}
                                        <button className='absolute top-3 right-3 text-3xl text-red-500' onClick={closeModal}>X</button>

                                        {/* For for user#tag */}
                                        <div className='text-white text-lg'>
                                            <div>Enter your Riot username and tag (e.g. user#tag)</div>
                                            <form onSubmit={searchAccount}>
                                                <input type="text" className='rounded-md text-black'/>
                                                <button type='submit'></button>
                                            </form>
                                        </div>
                                        <div className='mt-5'>
                                        {error && (
                                                  
                                            <div className='text-red-500'>
                                                <p className='p-2'>Error</p>
                                                <p className='p-2'>{error}</p>
                                            </div>
    
                                        )}
                                            {(confirm as ValorantAccount).name && (
                                                <div>
                                                    <div className='grid grid-cols-2 border-2 rounded-md bg-[rgba(0,0,0,0.7)] text-2xl '>
                                                        <p>Username:</p>
                                                        <p className='text-left'>{(confirm as ValorantAccount).name +'#'+ (confirm as ValorantAccount).tag}</p>

                                                        <p>Region:</p>
                                                        <p className='text-left'>{(confirm as ValorantAccount).region}</p>

                                                        <p>Account level:</p>
                                                        <p className='text-left'>{(confirm as ValorantAccount).account_level}</p>
                                                    </div>
                                                    <p className='m-5'><strong>Is this the right account?</strong></p>
                                                    <button className='border-[1px] rounded-sm bg-black p-2' onClick={confirmAccount}>Confirm Choice</button>
                                                </div>

                                            )}
                                        </div>
                                    </div>
                                </ReactModal>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}