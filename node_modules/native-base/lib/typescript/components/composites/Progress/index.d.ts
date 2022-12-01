import React from 'react';
import type { InterfaceBoxProps } from '../../primitives/Box';
import type { ColorSchemeType } from '../../../components/types';
import type { CustomProps, ThemeComponentSizeType } from '../../../components/types';
export interface InterfaceProgressProps extends InterfaceBoxProps<IProgressProps> {
    /**
     * Value of Progress.
     * @default 0
     */
    value?: number;
    /**
     * Defines height of Progress
     * @default sm
     */
    size?: ThemeComponentSizeType<'Progress'>;
    /**
     * The color scheme of the progress. This should be one of the color keys in the theme (e.g."green", "red").
     * @default primary
     */
    colorScheme?: ColorSchemeType;
    /**
     * Pseudo prop to give Prop to filled track
     */
    _filledTrack?: InterfaceBoxProps<IProgressProps>;
    /**
     * Min progress value
     * @default 0
     */
    min?: number;
    /**
     * Max progress value
     * @default 100
     */
    max?: number;
}
export declare type IProgressProps = InterfaceProgressProps & CustomProps<'Progress'>;
declare const _default: React.MemoExoticComponent<React.ForwardRefExoticComponent<InterfaceProgressProps & Partial<{}> & {
    variant?: unknown;
    size?: ThemeComponentSizeType<"Progress">;
    colorScheme?: ColorSchemeType;
} & React.RefAttributes<unknown>>>;
export default _default;
