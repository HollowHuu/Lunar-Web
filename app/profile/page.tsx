'use client';
import { useSession } from 'next-auth/react'

export default function Profile() {
  const { data: session, status } = useSession();

    return (
        <div className="min-h-screen">        
        <div className='relative border-0 '>
          <div className='absolute inset-0 bg-gradient-to-t from-[#322842] border-0 backdrop-blur-sm'></div>
          
          <img src='https://media.valorant-api.com/playercards/7d7f15c5-46f5-58ea-b1d5-bba31c60d5d0/wideart.png' alt="Banner" className='w-full m-0 border-0 ' />
          {/* <div className='absolute bottom-0 w-full h-full'></div> */}
        </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">
            {status == "unauthenticated" && <p>Login to see your profile</p>}
            {status == "loading" && <p>Loading...</p>}
            {status == "authenticated" && <p>{session.user?.name}</p>}

          </div>
          <div className="bg-gradient-to-b from-[#322842] to-black min-h-[50vh] m-0">
            
          </div>
        </div>
    )
}