/**
 * Common Logic Sharing between useSx and useStyledSytem
 * @param styledSystemProps
 * @param theme
 * @param currentBreakpoint
 * @returns styleFromProps, responsiveStyles
 */
export declare const getStyledFromProps: (styledSystemProps: any, theme: any, currentBreakpoint: any, propConfig: any) => {
    styleFromProps: any;
    responsiveStyles: Record<string | number | symbol, any[]> | null;
};
