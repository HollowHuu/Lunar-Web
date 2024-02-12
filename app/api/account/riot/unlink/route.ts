import { prisma } from "@/app/dbConnection";
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { User } from "@/components/types";

export async function GET() {
    const session = await getServerSession(authOptions)
    if(!session) return Response.json({message: 'Unautharized'}, {status: 401})


    let user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        }
    }) as User

    if (!user) return Response.json({message: 'User not found'}, {status: 402})

    user = await prisma.user.update({
        where: {
            id: session.user.id
        },
        data: {
            riot: null
        }
    })

    return Response.json(user)
}