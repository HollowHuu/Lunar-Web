'use client';
import Unauthenticated from '@/components/unauthenticated';
import { useSession, signIn } from 'next-auth/react'
import { useState, useEffect } from 'react' 
import { ValoarntMMR } from '@/components/types';

export default function Profile() {
  const { data: session, status } = useSession();

  const [banner, setBanner] = useState("");
  const [username, setUsername] = useState("");
  const [valorant, setValorant] = useState({} as ValoarntMMR)

  const fetchData = async () => {
    const data = await fetch('/api/valorant/bypuuid')
    .then(res => res.json())
    console.log({data})
    setBanner(data.banner.wide)
    setUsername(data.name)
    setValorant(data)
  }

  useEffect(() => {
    if(status != "authenticated") return;

    fetchData();
    
  }, [status])

	if (status != "authenticated") {
	  return (
      <Unauthenticated></Unauthenticated>
		)
	}
    return (
        <div className="min-h-screen">        
        <div className='relative border-0 '>
          
          
          
          {banner && (
            <div>
              <div className='absolute inset-0 bg-gradient-to-t from-[#2B4B70] border-0 backdrop-blur-sm'></div>
              <img src={banner} alt="Banner" className='w-full m-0 border-0' />
            </div>
          )}
          {/* <div className='absolute bottom-0 w-full h-full'></div> */}
        </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl">
            
            {session.user.riot && (
              <div>
                <div className='text-6xl'>
                  <strong>Profile</strong>
                </div>
            
                <div>
                  {username && username}
                  {!username && 'Loading valorant account...'}
                </div>
              </div>
            )}
            {!session.user.riot && (
              <div>
                <div className='text-6xl'>
                  <strong>Profile</strong>
                </div>
            
                <div>
                  <button className='mt-2 border-2 border-blue-900 rounded-full bg-blue-500 p-2' onClick={e => {
                      e.preventDefault()
                      document.location.href = '/settings'
                  }}>Link Valorant</button>
                </div>
              </div>  
            )}




          </div>
          {banner && (
            <div className="bg-gradient-to-b from-[#2B4B70] to-black min-h-[50vh] m-0">
              <div className='text-3xl text-white text-center'>
                <strong>Stats</strong>

                <div>
                  {valorant.elo && (
                    <div>
                      <p><strong>Elo:</strong> {valorant.elo}</p>
                      <p><strong>Current Tier:</strong> {valorant.currenttierpatched}</p> 

                    </div>
                  )}
                  {!valorant.elo && (
                    <div>
                      <strong>Loading...</strong>
                    </div>
                  )}

              </div>
            </div>
            </div>
          )}
        </div>
        
    )
}
