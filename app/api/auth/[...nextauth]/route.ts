import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import DiscordProdvider from 'next-auth/providers/discord'

const prisma = new PrismaClient()

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        DiscordProdvider({
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            clientId: process.env.DISCORD_CLIENT_ID as string
        })
    ],
})

export { handler as GET, handler as POST }