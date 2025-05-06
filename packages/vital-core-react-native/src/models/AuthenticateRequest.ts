export type Environment = "dev" | "sandbox" | "production";
export type Region = "us" | "eu";

export interface AuthenticateRequestSignInToken {
    type: "signInToken";
    rawToken: string;
}

export interface AuthenticateRequestAPIKey {
    type: "apiKey";
    key: string;
    environment: Environment;
    region: Region;
}

export type AuthenticateRequest = AuthenticateRequestSignInToken | AuthenticateRequestAPIKey;
