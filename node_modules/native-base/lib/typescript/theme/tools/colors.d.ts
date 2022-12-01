import type { Dict } from './utils';
export declare function mode(light: any, dark: any): (props: any) => any;
export declare const transparentize: (color: string, opacity: number) => (theme: Dict) => string;
export declare const getColor: (theme: Dict, color: string, fallback?: string | undefined) => any;
export declare const tone: (color: string) => (theme: Dict) => "light" | "dark";
export declare const isDark: (color: string) => (theme: Dict) => boolean;
export declare const isLight: (color: string) => (theme: Dict) => boolean;
interface RandomColorOptions {
    /**
     * If passed, string will be used to generate
     * random color
     */
    string?: string;
    /**
     * List of colors to pick from at random
     */
    colors?: string[];
}
export declare function randomColor(opts?: RandomColorOptions): string;
export {};
