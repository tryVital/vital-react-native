/**
 *
 * @param props Props passed by the user
 * @param theme Theme object
 * @param colorModeProps `colorMode` object
 * @param componentTheme Theme for specific components
 * @param currentBreakpoint Current breakpoint values
 * @returns Extracting props from defaultProps while overriding the props that are already present
 */
export declare function extractProps(props: any, theme: any, {}: {}, componentTheme: any, currentBreakpoint: number): any;
/**
 * If property is functional in componentTheme, get its returned object
 *
 * @param property : name of the prop
 * @param props : all props
 * @param theme : provided theme without components
 * @param componentTheme : component specific theme
 * @returns
 */
export declare const extractPropertyFromFunction: (property: string, props: any, theme: any, componentTheme: any) => any;
export declare function mergeUnderscoreProps(newProps: any, props: any): any;
/**
 *
 * Checks the property and resolves it if it has breakpoints
 * @param values : value from props
 * @param currentBreakpoint : current value for which breakpoint will be calculated
 * @param property : property name
 * @returns
 */
export declare const resolveValueWithBreakpoint: (values: any, breakpointTheme: any, currentBreakpoint: number, property: any) => any;
/**
 * Takes all prop related data and returns the props that needs to be applied to the component
 *
 * @param theme Theme object
 * @param colorModeProps Color mode information
 * @param componentTheme Theme object for the specific component
 * @param props Props passed by the user
 * @param windowWidth Width of the current window
 * @returns props to be applied
 */
export declare function calculateProps(theme: any, colorModeProps: any, componentTheme: any, props: any, windowWidth: any): any;
