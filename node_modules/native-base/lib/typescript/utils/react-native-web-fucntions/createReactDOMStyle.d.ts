declare type Style = {
    [key: string]: any;
};
export declare const createTransformValue: (style: Style) => string;
/**
 * Reducer
 */
declare const createReactDOMStyle: (style: Style, isInline?: boolean | undefined) => Style;
export default createReactDOMStyle;
