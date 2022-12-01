declare const breakpoints: {
    base: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
};
export declare type IBreakpoint = keyof typeof breakpoints;
export default breakpoints;
