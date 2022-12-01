import type { ColorMode, StorageManager, IColorModeContextProps } from './types';
export declare const useColorMode: () => IColorModeContextProps;
export declare function useColorModeValue(light: any, dark: any): any;
export declare const useAppState: () => import("react-native").AppStateStatus;
export declare const useColorScheme: () => "light" | "dark" | null | undefined;
export declare function useModeManager(initialColorMode: ColorMode, useSystemColorMode: boolean | undefined, colorModeManager?: StorageManager): {
    colorMode: ColorMode;
    setColorMode: (val: ColorMode) => Promise<void>;
};
export declare function useAccessibleColors(): [
    boolean,
    (val: boolean) => void,
    () => void
];
