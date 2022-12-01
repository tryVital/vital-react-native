export declare function useClipboard(): {
    value: string;
    onCopy: (copiedValue: string) => Promise<void>;
    hasCopied: boolean;
};
