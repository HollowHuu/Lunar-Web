'use client';
import Loading from '@/components/loading';
import Unauthenticated from '@/components/unauthenticated';
import { useSession, signIn } from 'next-auth/react'
import { useState, useEffect } from 'react' 

const drinkingData = (): boolean => {
    // TODO - Get the user's drinking data
    return false;
}

export default function Drink() {
    const { data: session, status } = useSession();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {  
        setMounted(true);
    }, [])

    if(!mounted || status == "loading") return (
        <Loading></Loading>
    )

    if(status != "authenticated") return (
        <Unauthenticated></Unauthenticated>
    )

    return (
        <div className="min-h-screen">        
            {/* A page for pairing drinking buddies. */}



            <div className="text-center text-[1.5rem] pb-[1rem] border-b-2 border-b-slate-300 mb-[1rem]">Drink</div>

            {/* Introduction to drinking page */}
            <div className="mb-[1rem] text-center ">
                <h1 className='text-xl'>
                    You&apos;re not supposed to be here...
                </h1>
                <p>
                    Whatever, I&apos;m not your mom. Do what you want. <br />
                    But now that you&apos;re here, let me tell you about the drinking page. <br />
                </p>
                <p className='text-4xl font-bold text-center text-blue-500 mt-10'>
                    I present to thee,
                </p>
                <div className='border p-2 w-[50%] m-auto my-5 rounded'>
                    {/* Huge glamerous valorant drinking explanation */}
                    <p className='text-orange-500 text-xl drop-shadow-lg'>
                        Drunk Comp
                    </p>

                    <p>
                        This is a place to find other sad people who are also drinking alone. <br />
                        By drinking together, you can pretend you&apos;re not drinking alone. <br />
                        It&apos;s like a support group, but with alcohol. <br />

                        <br />
                        <div className='flex justify-end'>
                            <span className='text-sm text-gray-400 text-right'>
                                *I&apos;m not responsible for any bad decisions you make while drinking
                            </span>
                        </div>

                    </p>
                </div>

            </div>




            {/* Checking to see if we already have information on them */}
            {drinkingData() && (
                <div className="grid grid-cols-3 gap-[1rem] mb-[1rem]">
                    <div className="block p-[.5rem] border-solid border-white border-2 rounded-lg hover:bg-purple-400">Find a Buddy</div>
                    <div className="block p-[.5rem] border-solid border-white border-2 rounded-lg hover:bg-purple-400">Find a Group</div>
                    <div className="block p-[.5rem] border-solid border-white border-2 rounded-lg hover:bg-purple-400">Find a Bar</div>

                </div>
            )}

            {/* If we don't have information on them */}
            {!drinkingData() && (
                <div className="text-center">
                    <p>
                        We don&apos;t have any information on you yet. <br />
                        <button className='border-2 border-blue-500 p-2 rounded-full bg-blue-300' onClick={e => {
                            e.preventDefault()
                            // TODO - Add a way to update the user's drinking data
                        }}>Update your drinking data</button>
                    </p>
                </div>
                
            )}

            
  
    </div>
    )
}