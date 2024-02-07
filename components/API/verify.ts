import { prisma } from "@/app/dbConnection";

export async function validateKey(key: string): Promise<boolean> {
    const keyData = await prisma.aPIKey.findUnique({
        where: { apiKey: key}
    })
    if(!keyData) return false
    return true
}