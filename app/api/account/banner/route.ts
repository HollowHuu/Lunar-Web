import fs from 'fs'

import { prisma } from '@/app/dbConnection'

// Types
type RequestData = {
    banner: File;
}

export async function POST(request: Request) {

    // File from request
    const form: FormData = await request.formData()
    if(!form) return Response.json({message: 'No form found'}, {status: 400})

    // Now we want to save the file to a folder in our project
    const file = form.get('image') as File
    if(!file) return Response.json({message: 'No file found'}, {status: 400})

    // Send file to API endpoint: "https://lunar-api.onrender.com/banner/{userid}/{Date.now()"
    // This endpoint will save the file to a folder in public
    const date = Date.now();
    fetch(`https://lunar-api.onrender.com/banner/1/${date}`, {
        method: 'POST',
        body: file,
        headers: {
            "authorization": `${process.env.API_KEY}`
        }
    }).then(console.log) // OK
    .catch(console.error);

    return Response.json({message: 'UNDER DEVELOPMENT, NOT WORKING YET'})
}