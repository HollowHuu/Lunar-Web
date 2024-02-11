import { prisma } from '@/app/dbConnection'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/route'
import { genApiKey, saveAPIKey } from '@/components/API/genApiKey'


export async function GET() {
    // Get session
    const session = await getServerSession(authOptions)
    if(!session) return Response.json({message: 'Unautharized'}, {status: 401})

    if (!session.user) return Response.json({message: 'Unautharized'}, {status: 401})
    
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        }
    })

    if(!user) return Response.json({message: 'User not found'}, {status: 404})

    const apiKey = await genApiKey(user)
    saveAPIKey(apiKey, user.id)

    return Response.json({apiKey}, {status: 200})
    
}
