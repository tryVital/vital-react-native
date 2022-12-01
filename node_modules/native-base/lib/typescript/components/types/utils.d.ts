import type { Leaves } from '../../theme/base/types';
import type { ComponentTheme, ITheme } from '../../theme';
import type { ResponsiveValue } from './responsiveValue';
export declare type VariantType<Component extends keyof ITheme['components']> = 'variants' extends keyof ITheme['components'][Component] ? ResponsiveValue<keyof ITheme['components'][Component]['variants'] | (string & {})> : unknown;
export declare type SpaceType = ResponsiveValue<keyof ITheme['space'] | (string & {}) | number>;
export declare type SizeType = ResponsiveValue<keyof ITheme['sizes'] | (string & {}) | number>;
export declare type ThemeComponentSizeType<Component extends keyof ITheme['components']> = ResponsiveValue<'sizes' extends keyof ITheme['components'][Component] ? keyof ITheme['components'][Component]['sizes'] | (string & {}) | number : unknown>;
export declare type CombinedSizeType<Component extends keyof ITheme['components']> = SizeType | ThemeComponentSizeType<Component>;
export declare type ColorType = ResponsiveValue<Leaves<ITheme['colors']> | (string & {})>;
export declare type ColorSchemeType = ResponsiveValue<Exclude<keyof ITheme['colors'], 'contrastThreshold'> | (string & {})>;
declare type ComponentType<T extends keyof ITheme['components']> = {
    [Property in keyof ITheme['components'][T]]: ITheme['components'][T][Property];
};
declare type ParametersOf<T> = {
    [Key in keyof T]: T[Key] extends (...args: any) => void ? Parameters<T[Key]>[0] extends {} ? Parameters<T[Key]>[0] : {} : {};
}[keyof T];
declare type ParameterType<T, Key> = ParametersOf<ComponentType<T>[Key]>;
declare type CustomPropType<T extends keyof ITheme['components'], Key> = Extract<ParameterType<T, Key>, Pick<ParameterType<T, Key>, keyof ParameterType<T, Key>>>;
export declare type CustomComponentProps<T extends keyof ITheme['components']> = Partial<Exclude<{
    [Key in keyof ComponentTheme]: CustomPropType<T, Key>;
}[keyof ComponentTheme], undefined>>;
export declare type CustomPropsTemp<T extends keyof ITheme['components']> = CustomComponentProps<T> extends never ? {} : // : CustomComponentProps<T> extends Record<string, any>
UnionToIntersection<CustomComponentProps<T>> & {};
export declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
declare type VariantSizeColorScheme<T extends keyof ITheme['components']> = {
    variant?: VariantType<T>;
    size?: ThemeComponentSizeType<T>;
    colorScheme?: ColorSchemeType;
};
export declare type CustomProps<T extends keyof ITheme['components']> = UnionToIntersection<CustomPropsTemp<T> | VariantSizeColorScheme<T>>;
export {};
