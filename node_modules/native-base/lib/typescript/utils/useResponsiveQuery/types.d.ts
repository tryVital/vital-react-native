import type { StyleSheet } from 'react-native';
declare type StyleSheetStyle = Parameters<typeof StyleSheet.create>[0]['initial'];
export declare type Query = {
    minWidth?: number;
    maxWidth?: number;
    style?: StyleSheetStyle | StyleSheetStyle[];
};
export declare type UseResponsiveQueryParams = {
    initial?: StyleSheetStyle | StyleSheetStyle[];
    query?: Query[];
    disableCSSMediaQueries?: boolean;
};
export declare type DataSet = {
    [key: string]: string;
};
export declare type GetResponsiveStylesParams = Omit<UseResponsiveQueryParams, 'disableCSSMediaQueries'>;
export declare type GetResponsiveStylesReturnType = {
    styles?: StyleSheetStyle[];
    dataSet?: DataSet;
};
export declare type UseResponsiveQueryReturnType = GetResponsiveStylesReturnType & {
    getResponsiveStyles: (params: GetResponsiveStylesParams) => GetResponsiveStylesReturnType;
};
export {};
