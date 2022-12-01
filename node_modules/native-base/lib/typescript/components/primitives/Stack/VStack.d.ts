import React from 'react';
import { InterfaceStackProps } from './Stack';
import type { CustomProps, ResponsiveValue } from '../../types';
export interface InterfaceVStackProps extends InterfaceStackProps {
    /**
     * The direction of the Stack Items.
     * @default column
     */
    direction?: ResponsiveValue<'column' | 'row' | 'column-reverse' | 'row-reverse'>;
}
export declare type IVStackProps = InterfaceVStackProps & CustomProps<'VStack'>;
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<InterfaceVStackProps & {
    variant?: unknown;
    size?: import("../../types").ThemeComponentSizeType<"VStack">;
    colorScheme?: import("../../types").ColorSchemeType;
} & React.RefAttributes<unknown>>>;
export default _default;
