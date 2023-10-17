import Image from 'next/image'
import Header from '@/components/header'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <div className='text-6xl font-light mb-8'>Welcome to Lunar!</div>
      <div className='max-w-[600px] mb-4 rounded-lg shadow-sm overflow-hidden border-slate-100 border-2 p-4'>
        <div className='text-3xl'>What is Lunar?</div>
        <div className='text-sm m-1'>
          Lunar is a Discord role system with Dashboard.
          Lunar is made to be an automatic role system for small Discord servers.
          Using the Valorant API, it will fetch profile and rank data about you, which it will use to automatically assign rank roles on Discord. The Dashboard does currently not do much standalone
        </div>
      </div>
      
      <div className='max-w-[600px] mb-4 rounded-lg shadow-sm overflow-hidden border-slate-100 border-2 p-4' >
        <div className='text-3xl'>Lunar quickstart</div>
        <div className='text-sm m-1'>
          <p className='mb-4'>Lunar is a Discord bot that will automatically assign roles to you based on your Valorant rank.</p>
          <p className='mb-4'>To use Lunar, you need to link your Discord account to your Valorant account.</p>
          <p className='mb-4'>You can do this by going to the Settings page and clicking the Link Account button after logging in.</p>
          <p className='mb-4'>After linking your account, you can use the /profile command to see your rank and level.</p>
          <p className='mb-4'>To use the auto role system, you need to make roles with the names Iron, Bronze, Silver, Gold, Platinum, Diamond, Immortal and Radiant.</p>
          <p className='mb-4'>Automation is currently not available, but will be added soon.</p>
        </div>
      </div>

    </div>
  )
}
