import { signIn } from 'next-auth/react'

export default function Loading() {
  return (
    <div className="min-h-screen">        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl text-center">
        <p><strong>Loading...</strong></p>
        </div>
    </div>
  )
}