import React from 'react';
import { InterfaceBoxProps } from '../Box';
import type { CustomProps } from '../../../components/types';
export interface InterfaceZStackProps extends InterfaceBoxProps<IZStackProps> {
    /**
     * The direction to stack the elements.
     */
    reversed?: boolean;
}
export declare type IZStackProps = InterfaceZStackProps & CustomProps<'ZStack'>;
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<InterfaceZStackProps & {
    variant?: unknown;
    size?: unknown;
    colorScheme?: import("../../types/utils").ColorSchemeType;
} & React.RefAttributes<unknown>>>;
export default _default;
