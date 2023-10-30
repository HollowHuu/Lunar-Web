import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProdvider from 'next-auth/providers/discord'

const prisma = new PrismaClient()

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        DiscordProdvider({
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            clientId: process.env.DISCORD_CLIENT_ID as string
        })
    ],
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id
            session.user.riot = user.riot
            return session;
        }
    
    }
} satisfies NextAuthOptions
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }