import React from 'react';
import { ViewStyle } from 'react-native';
import type { InterfaceBoxProps } from '../../primitives/Box';
import type { CustomProps } from '../../../components/types';
export declare type InterfaceCollapseProps = InterfaceBoxProps<ICollapseProps> & {
    style?: ViewStyle;
    endingHeight?: number;
    startingHeight?: number;
    duration?: number;
    animateOpacity?: boolean;
    isOpen?: boolean;
    onAnimationEnd?: Function;
    onAnimationStart?: Function;
};
export declare type ICollapseProps = InterfaceCollapseProps & CustomProps<'Box'>;
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<InterfaceBoxProps<ICollapseProps> & {
    style?: ViewStyle | undefined;
    endingHeight?: number | undefined;
    startingHeight?: number | undefined;
    duration?: number | undefined;
    animateOpacity?: boolean | undefined;
    isOpen?: boolean | undefined;
    onAnimationEnd?: Function | undefined;
    onAnimationStart?: Function | undefined;
} & {
    variant?: unknown;
    size?: unknown;
    colorScheme?: import("../../types/utils").ColorSchemeType;
} & React.RefAttributes<unknown>>>;
export default _default;
