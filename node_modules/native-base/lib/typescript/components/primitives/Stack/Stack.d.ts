import React from 'react';
import { InterfaceBoxProps } from '../Box';
import type { CustomProps, ResponsiveValue, SpaceType } from '../../types';
export interface InterfaceStackProps extends InterfaceBoxProps<IStackProps> {
    /**
     * The divider element to use between elements.
     */
    divider?: JSX.Element;
    /**
     * The space between each stack item. Accepts Responsive values
     */
    space?: ResponsiveValue<'gutter' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | SpaceType>;
    /**
     * Determines whether to reverse the direction of Stack Items.
     */
    reversed?: boolean;
    /**
     * The direction of the Stack Items.
     * @default column
     */
    direction?: ResponsiveValue<'column' | 'row' | 'column-reverse' | 'row-reverse'>;
    /**
     * If true, the Stack will be in hovered state.
     */
    isHovered?: boolean;
    /**
     * If true, the Stack will be focused.
     */
    isFocused?: boolean;
    /**
     * If true, the Stack will be disabled.
     */
    isDisabled?: boolean;
    /**
     * If true, the Stack will be invalid.
     */
    isInvalid?: boolean;
    /**
     * If true, prevents the value of the children from being edited. Used with FormControls.
     */
    isReadOnly?: boolean;
}
export declare type IStackProps = InterfaceStackProps & CustomProps<'Stack'>;
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<InterfaceStackProps & Partial<{}> & {
    variant?: unknown;
    size?: import("../../types").ThemeComponentSizeType<"Stack">;
    colorScheme?: import("../../types").ColorSchemeType;
} & React.RefAttributes<unknown>>>;
export default _default;
