declare const typography: {
    letterSpacings: {
        xs: string;
        sm: string;
        md: number;
        lg: string;
        xl: string;
        '2xl': string;
    };
    lineHeights: {
        '2xs': string;
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        '5xl': string;
    };
    fontConfig: {};
    fontWeights: {
        hairline: number;
        thin: number;
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
        extrabold: number;
        black: number;
        extraBlack: number;
    };
    fonts: {
        heading: undefined;
        body: undefined;
        mono: undefined;
    };
    fontSizes: {
        '2xs': number;
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        '2xl': number;
        '3xl': number;
        '4xl': number;
        '5xl': number;
        '6xl': number;
        '7xl': number;
        '8xl': number;
        '9xl': number;
    };
};
export declare type ITypography = typeof typography;
export declare type IFontSize = keyof typeof typography.fontSizes;
export declare type ILetterSpacing = keyof typeof typography.letterSpacings;
export declare type ILineHeight = keyof typeof typography.lineHeights;
export declare type IFontWeight = keyof typeof typography.fontWeights;
export interface IFont {
    heading?: string;
    body?: string;
    mono?: string;
}
export default typography;
