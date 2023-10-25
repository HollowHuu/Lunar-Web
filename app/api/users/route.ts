import type { NextApiRequest, NextApiResponse } from 'next';
import { headers } from 'next/headers'
import { NextResponse } from 'next/server';

import {prisma} from '@/app/dbConnection';


type ResponseData = {
    name: string;
    avatar: string;
    banner: string;
}[];


export async function GET() {
    const headerList = headers()

    const name = headerList.get('name')
    console.log({name})
    if(!name) return Response.json({error: 'No name provided'})

    // Pull users from the mysql DB using drizzle-orm
    const result = await prisma.user.findMany({
        where: {
            name: { contains: name}
        }
    });
    
    let selectedUsers = result.filter(res => res.name?.toLowerCase().includes(name.toString().toLowerCase()));
    return Response.json(selectedUsers);
}