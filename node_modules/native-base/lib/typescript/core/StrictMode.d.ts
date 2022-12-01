export declare type IModeType = 'off' | 'warn' | 'error';
declare const tokenNotString = "tokenNotString";
declare const tokenNotFound = "tokenNotFound";
export declare const strictModeLogger: ({ token, scale, mode, type, }: {
    token: string;
    scale: string;
    mode: IModeType;
    type: typeof tokenNotString | typeof tokenNotFound;
}) => void;
export {};
