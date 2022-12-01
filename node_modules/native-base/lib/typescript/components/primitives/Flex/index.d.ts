import React from 'react';
import type { IFlexProps } from './types';
export declare const Spacer: (props: any) => JSX.Element;
export type { IFlexProps };
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<import("../Box").InterfaceBoxProps<IFlexProps> & {
    direction?: import("csstype").Property.FlexDirection | undefined;
    align?: import("csstype").Property.AlignItems | undefined;
    justify?: import("csstype").Property.JustifyContent | undefined;
    wrap?: import("csstype").Property.FlexWrap | undefined;
    basis?: import("csstype").Property.FlexBasis<0 | (string & {})> | undefined;
    grow?: import("csstype").Property.FlexGrow | undefined;
    shrink?: import("csstype").Property.FlexShrink | undefined;
} & Partial<{}> & {
    variant?: unknown;
    size?: unknown;
    colorScheme?: import("../../types").ColorSchemeType;
} & React.RefAttributes<unknown>>>;
export default _default;
