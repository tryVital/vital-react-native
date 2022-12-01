import type { ResponsiveValue } from '../components/types';
declare type IProps = {
    [key: string]: ResponsiveValue<number | string>;
};
declare type INewProps = {
    [key: string]: number | string;
};
export declare const useBreakpointResolvedProps: (props: IProps) => INewProps;
export {};
