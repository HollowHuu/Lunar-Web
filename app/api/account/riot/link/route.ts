import fs, { Stats } from 'fs'

import { prisma } from '@/app/dbConnection'
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import { ValorantAccount, User } from '@/components/types'


// Types
type RequestData = {
    image: Uint8Array;
}


export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if(!session) return Response.json({message: 'Unautharized'}, {status: 401})

    const body = await req.json() as ValorantAccount
    if(!body) return Response.json({message: 'No body provided'}, {status: 400})

    console.log({body})

    let user = await prisma.user.findUnique({
        where: { id: session.user.id }
    }) as User

    user.riot = body.puuid;
    

    // Update user.riot in the DB
    const updateUser = await prisma.user.update({
        where: { id: session.user.id },
        data: user
    }) as User

    console.log({updateUser})

    if(!user) return Response.json({message: 'User not found'}, {status: 404})
    
    

    return Response.json({user: user})
}