import { User } from "@prisma/client";
import { prisma } from "@/app/dbConnection";

export const genApiKey = async (user: User) => {
    const { name, id } = user;
    if(!name) throw new Error('User does not have a name')
    
    const random = [...Array(30)]
        .map(e => ((Math.random() * 36) | 0).toString(36))
        .join('');

    // Base64 encode username and id
    const encodedUsername = Buffer.from(name).toString('base64');
    const encodedId = Buffer.from(id).toString('base64');

    // Combine encoded username and id
    const combined = encodedUsername + encodedId;

    // combine encoded username and id with random string
    const apiKey = combined +'.'+ random;

    return apiKey;
}

// TODO - Make an endpoint to save the api key to the user
// TODO - Combine this with the genApiKey function
// NOTE - Untested code
export const saveAPIKey = async (apiKey: string, userId: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });

    if(!user) throw new Error('User not found');

    const keys = await prisma.APIKey.findUnique({
        where: {
            userId: userId
        }
    })

    if(keys) {
        await prisma.APIKey.update({
            where: {
                userId: userId
            },
            data: {
                apiKey: apiKey
            }
        })
    } else {
        await prisma.APIKey.create({
            data: {
                apiKey: apiKey,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    }

    return user;
}
