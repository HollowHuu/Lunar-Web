
export async function GET() {
    const baseUrl = process.env.NEXTAUTH_URL;
    const callBackUrl = `${baseUrl}/api/oauth/callback`;
    const provider = "https://auth.riotgames.com"

    const link = `${provider}/authorize?client_id=${process.env.RIOT_CLIENT_ID}&redirect_uri=${callBackUrl}&response_type=code&scope=openid`
    return link;
}