'use client';
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react' 

export default function Profile() {
  const { data: session, status } = useSession();

  const [banner, setBanner] = useState("");
  const [username, setUsername] = useState("");

  const fetchData = async () => {
    const data = await fetch('/api/valorant/bypuuid')
    .then(res => res.json())
    
    setBanner(data.banner.wide)
    setUsername(data.name)
  }

  useEffect(() => {
    if(status != "authenticated") return;

    fetchData();
    
  }, [status])

    return (
        <div className="min-h-screen">        
        <div className='relative border-0 '>
          {banner != "" && <div className='absolute inset-0 bg-gradient-to-t from-[#322842] border-0 backdrop-blur-sm'></div>}
          
          
          <img src={banner} alt="Banner" className='w-full m-0 border-0 ' />
          {/* <div className='absolute bottom-0 w-full h-full'></div> */}
        </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">
            {status == "unauthenticated" && <p>Login to see your profile</p>}
            {status == "loading" && <p>Loading...</p>}
            {status == "authenticated" && (
              <div>
                {username && username}
                {!username && 'Loading valorant account...'}
              </div>
            )}

          </div>
          <div className="bg-gradient-to-b from-[#322842] to-black min-h-[50vh] m-0">
            
          </div>
        </div>
    )
}