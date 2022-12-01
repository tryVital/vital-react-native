import type { SafeAreaProps } from './../../components/types/ExtraProps';
export declare function calculatePaddingProps(safeAreaProps: SafeAreaProps, paddingProps: any, insets: any, sizes: any): Partial<any>;
export declare function calculatePaddingTop(safeAreaProps: SafeAreaProps, paddingProps: any, insets: any, sizes: any): string | undefined;
export declare function calculatePaddingBottom(safeAreaProps: SafeAreaProps, paddingProps: any, insets: any, sizes: any): string | undefined;
export declare function calculatePaddingLeft(safeAreaProps: SafeAreaProps, paddingProps: any, insets: any, sizes: any): string | undefined;
export declare function calculatePaddingRight(safeAreaProps: SafeAreaProps, paddingProps: any, insets: any, sizes: any): string | undefined;
export declare function getSortedProps(props: any): {
    safeAreaProps: Partial<any>;
    paddingProps: Partial<any>;
    sansPaddingProps: Partial<any>;
};
