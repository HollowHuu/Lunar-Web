import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import {prisma} from '@/app/dbConnection';
import { User, ValoarntMMR } from '@/components/types';

import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {

    const session = await getServerSession(authOptions);
    if(!session) return Response.json({error: 'No session found'}, {status: 401})

    const puuid = session?.user.riot
    if(!puuid) return Response.json({error: 'no Riot account linked'}, {status: 401})

    
    const profileData = await fetch(`https://api.henrikdev.xyz/valorant/v1/by-puuid/account/${puuid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "authorization": `${process.env.HDEV_API_KEY}`
        }
    })
    .then(res => res.json())
    .then(json => json.data)

    if(!profileData) return Response.json({error: 'No profile found'}, {status: 404})
    
    const mmr = await fetch(`https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/eu/${puuid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "authorization": `${process.env.HDEV_API_KEY}`
        }
    }).then(res => res.json())
    .then(json => json.data)

    if(!mmr) return Response.json({error: 'No mmr found'}, {status: 404})
    
    const responseData: ValoarntMMR = {
        name: profileData.name as string,
        tag: profileData.tag as string,
        elo: mmr.current_data.elo as number,
        currenttier: mmr.current_data.currenttier as number,
        currenttierpatched: mmr.current_data.currenttierpatched as string, 
        banner: {
            small: profileData.card.small as string,
            large: profileData.card.large as string,
            wide: profileData.card.wide as string
        }
    }

    return Response.json(responseData)
}