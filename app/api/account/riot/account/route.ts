
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'


export async function GET() {
    // Get session
    const session = await getServerSession(authOptions)
    if(!session) return Response.json({message: 'Unautharized'}, {status: 401})

    const headerList = headers()
    const name = headerList.get('name')

    if(!name) return Response.json({error: 'No name provided'}, {status: 400, statusText: 'Missing name header'})
    const [username, tag] = name.split('#')

    // Pull valorant account info from henrikdev API
    const result = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${username}/${tag}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${process.env.HDEV_API_KEY}`
        }
    })

    const json = await result.json()
    console.log(json)
    return Response.json(json)
    
}