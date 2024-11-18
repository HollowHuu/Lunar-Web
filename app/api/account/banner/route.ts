import fs from 'fs'

import { prisma } from '@/app/dbConnection'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'

// Types
type RequestData = {
    image: Uint8Array;
}

export async function POST(request: Request) {
    // Get session
    const session = await getServerSession(authOptions)
    if(!session) return Response.json({message: 'Unauthenticated'}, {status: 401})

    const body = await request.json() as RequestData

    // Send file to API endpoint: "https://lunar-api.onrender.com/banner/{userid}/{Date.now()"
    // This endpoint will save the file to a folder in public
    const date = Date.now();
    fetch(`https://lunar-api.onrender.com/banner/1/${date}`, {
        method: 'POST',
        body: body.image,
        headers: {
            "authorization": `${process.env.API_KEY}`
        }
    }).then(console.log) // OK
    .catch(console.error);

    return Response.json({message: 'UNDER DEVELOPMENT, NOT WORKING YET'}) // TODO - Work on this, whatever it is
}