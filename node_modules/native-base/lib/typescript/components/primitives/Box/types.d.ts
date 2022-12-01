import type { ViewProps } from 'react-native';
import type { StyledProps } from '../../../theme/types';
import type { SafeAreaProps, PlatformProps, ResponsiveValue, ColorType, CustomProps } from '../../types';
import type { ITextProps } from './../Text/types';
export interface ILinearGradientProps {
    linearGradient?: {
        colors: Array<string>;
        start?: Array<number>;
        end?: Array<number>;
        locations?: Array<number>;
    };
}
export interface InterfaceBoxProps<T = null> extends ViewProps, SafeAreaProps, PlatformProps<T extends null ? IBoxProps<any> : T>, Omit<StyledProps, 'bgColor' | 'background' | 'bg' | 'backgroundColor'> {
    /**
     * Renders components as Box children. Accepts a JSX.Element or an array of JSX.Element. */
    children?: JSX.Element | JSX.Element[] | string | any;
    /**
     * For providing props to Text inside Box
     */
    _text?: Partial<ITextProps>;
    bg?: ResponsiveValue<ColorType | (string & {}) | ILinearGradientProps>;
    background?: ResponsiveValue<ColorType | (string & {}) | ILinearGradientProps>;
    bgColor?: ResponsiveValue<ColorType | (string & {}) | ILinearGradientProps>;
    backgroundColor?: ResponsiveValue<ColorType | (string & {}) | ILinearGradientProps>;
}
export declare type IBoxProps<T = null> = InterfaceBoxProps<T> & CustomProps<'Box'>;
