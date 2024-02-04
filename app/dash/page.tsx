'use client';
import Unauthenticated from '@/components/unauthenticated';
import { useSession, signIn } from 'next-auth/react'
import { useState, useEffect } from 'react' 

export default function Dash() {
    const { data: session, status } = useSession();


    if(status != "authenticated") return (
        <Unauthenticated></Unauthenticated>
    )

    return (
        <div className="min-h-screen">        
            {/* Think this is bot stuff */}
        </div>
    )
}