import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import {prisma} from '@/app/dbConnection';
import { User, ValoarntMMR } from '@/components/types';

import { authOptions } from '../../auth/[...nextauth]/route';

export async function POST(req: Request) {

    // Get the session
    const session = await getServerSession(authOptions);
    if(!session) return Response.json({error: 'No session found'}, {status: 401})

    const body = await req.json()

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        }
    })

    if(!user) return Response.json({error: 'User not found'}, {status: 404})

    const { name } = user;

    // validate the name change request
    if(!body.name) return Response.json({error: 'No name provided'}, {status: 400})
    if(body.name === name) return Response.json({error: 'Name is the same'}, {status: 400})

    // Check if the uses latin characters
    const latin = /^[a-zA-Z0-9]+$/;
    if(!latin.test(body.name)) return Response.json({error: 'Name contains non-latin characters'}, {status: 400})

    // Updating the user
    const updatedUser = await prisma.user.update({
        where: {
            id: session.user.id
        },
        data: {
            name: body.name
        }
    })

    return Response.json({success: 'Name updated'}, {status: 200})
    
}