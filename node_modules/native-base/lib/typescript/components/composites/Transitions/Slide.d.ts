import React from 'react';
import type { ISlideProps } from './types';
export declare const Slide: React.MemoExoticComponent<React.ForwardRefExoticComponent<import("../../primitives/Box").InterfaceBoxProps<ISlideProps> & {
    in?: boolean | undefined;
    duration?: number | undefined;
    delay?: number | undefined;
    placement?: "top" | "right" | "bottom" | "left" | undefined;
    overlay?: boolean | undefined;
    _overlay?: import("../../primitives/Overlay").IOverlayProps | undefined;
} & React.RefAttributes<unknown>>>;
export default Slide;
