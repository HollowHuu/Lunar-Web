
export interface Account { // Not tested
    id: number;
    userId: number;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
}

export interface Session { // Not tested
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: User;
}

export interface User {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    banner: string | null;
    riot: string | null;
}

export interface ValorantAccount {
    account_level: number;
    card: {
        small: string;
        large: string;
        wide: string;
        id: string;
    };
    last_updated: string;
    last_updated_raw: number;
    name: string;
    puuid: string;
    region: string;
    tag: string;
}

export interface ValoarntMMR {
    name: string;
    tag: string;
    elo: number;
    currenttier: number;
    currenttierpatched: string;
    banner: {
        small: string;
        large: string;
        wide: string;
    }
}