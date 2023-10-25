
export type Account = {
    id: number;
    userId: number;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
}

export type Session = {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: User;
}

export type User = {
    id: number;
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    banner?: string;
    accounts?: Account[];
    sessions?: Session[];
}