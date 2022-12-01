import React from 'react';
import { IBoxProps, ITextProps, IIconProps, IStackProps } from '../../primitives';
export declare const StatLabel: React.MemoExoticComponent<React.ForwardRefExoticComponent<import("../../primitives/Text/types").InterfaceTextProps<ITextProps> & {
    variant?: unknown;
    size?: unknown;
    colorScheme?: import("../../types").ColorSchemeType;
} & React.RefAttributes<unknown>>>;
export declare const StatNumber: React.MemoExoticComponent<React.ForwardRefExoticComponent<import("../../primitives/Text/types").InterfaceTextProps<ITextProps> & {
    variant?: unknown;
    size?: unknown;
    colorScheme?: import("../../types").ColorSchemeType;
} & React.RefAttributes<unknown>>>;
export declare const StatHelpText: React.MemoExoticComponent<React.ForwardRefExoticComponent<import("../../primitives/Box").InterfaceBoxProps<null> & {
    variant?: unknown;
    size?: unknown;
    colorScheme?: import("../../types").ColorSchemeType;
} & React.RefAttributes<unknown>>>;
declare type IStatArrowProps = IIconProps & {
    type?: 'increase' | 'decrease';
};
export declare const StatArrow: React.MemoExoticComponent<React.ForwardRefExoticComponent<import("../../primitives/Icon/types").InterfaceIconProps & Partial<{}> & {
    variant?: unknown;
    size?: import("../../types").ThemeComponentSizeType<"Icon">;
    colorScheme?: import("../../types").ColorSchemeType;
} & {
    type?: "increase" | "decrease" | undefined;
} & React.RefAttributes<unknown>>>;
export declare const StatGroup: React.MemoExoticComponent<React.ForwardRefExoticComponent<import("../../primitives/Box").InterfaceBoxProps<null> & {
    variant?: unknown;
    size?: unknown;
    colorScheme?: import("../../types").ColorSchemeType;
} & React.RefAttributes<unknown>>>;
declare type IStatComponentType = ((props: IBoxProps & {
    ref?: any;
}) => JSX.Element) & {
    Label: React.MemoExoticComponent<(props: ITextProps & {
        ref?: any;
    }) => JSX.Element>;
    Number: React.MemoExoticComponent<(props: ITextProps & {
        ref?: any;
    }) => JSX.Element>;
    HelpText: React.MemoExoticComponent<(props: IBoxProps & {
        ref?: any;
    }) => JSX.Element>;
    Arrow: React.MemoExoticComponent<(props: IStatArrowProps & {
        ref?: any;
    }) => JSX.Element>;
    Group: React.MemoExoticComponent<(props: IStackProps & {
        ref?: any;
    }) => JSX.Element>;
};
declare const Stat: IStatComponentType;
export default Stat;
