import React from 'react';
import { InterfaceStackProps } from './Stack';
import type { CustomProps, ResponsiveValue } from '../../types';
export interface InterfaceHStackProps extends InterfaceStackProps {
    /**
     * The direction of the Stack Items.
     * @default row
     */
    direction?: ResponsiveValue<'column' | 'row' | 'column-reverse' | 'row-reverse'>;
}
export declare type IHStackProps = InterfaceHStackProps & CustomProps<'HStack'>;
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<InterfaceHStackProps & {
    variant?: unknown;
    size?: import("../../types").ThemeComponentSizeType<"HStack">;
    colorScheme?: import("../../types").ColorSchemeType;
} & React.RefAttributes<unknown>>>;
export default _default;
