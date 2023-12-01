import { signIn } from 'next-auth/react'

export default function Unauthenticated() {
  return (
    <div className="min-h-screen">        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-center">
        <p><strong>You need to be signed in to view this page</strong></p>
            <button className='mt-2 border-2 border-blue-900 rounded-full bg-blue-500 p-2' onClick={e => {
                e.preventDefault()
                signIn()
            }}>Sign In</button>
        </div>
    </div>
  )
}