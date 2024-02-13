
import { useSearchParams } from "next/navigation";

const clientId = process.env.RIOT_CLIENT_ID;
const clientSecret = process.env.RIOT_CLIENT_SECRET;
const baseUrl = process.env.NEXTAUTH_URL;
const callBackUrl = `${baseUrl}/api/oauth/callback`;
const provider = "https://auth.riotgames.com"
const authUrl = provider + "/authorize";
const tokenUrl = provider + "/token";

export async function GET() {
    // Query params
    const params = useSearchParams();
    const code = params.get('code');

    if (!code) {
        return {
            status: 400,
            body: 'No code provided'
        }
    }

    fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
        },
        body: JSON.stringify({
            grant_type: 'authorization_code',
            code: decodeURIComponent(code),
            redirect_uri: callBackUrl
        })
    }).then(res => res.json())
    .then(data => {
        console.log(data);
    })
}