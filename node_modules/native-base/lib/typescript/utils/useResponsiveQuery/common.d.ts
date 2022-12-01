import type { GetResponsiveStylesParams, GetResponsiveStylesReturnType } from './types';
import { ScaledSize } from 'react-native';
export declare const getResponsiveStylesImpl: (width: number) => (queries: GetResponsiveStylesParams) => GetResponsiveStylesReturnType;
export declare const useDimensionsWithEnable: ({ enable }: {
    enable?: boolean | undefined;
}) => ScaledSize;
