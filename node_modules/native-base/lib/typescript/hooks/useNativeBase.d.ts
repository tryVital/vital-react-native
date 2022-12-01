/**
 *
 * @returns object containing `colorMode` information and `theme` object
 */
export declare function useNativeBase(): {
    theme: import("..").ITheme;
    colorMode: import("./../core/color-mode").ColorMode;
    toggleColorMode: () => void;
    setColorMode: (value: any) => void;
    accessibleColors: boolean;
    setAccessibleColors: (value: boolean) => void;
};
