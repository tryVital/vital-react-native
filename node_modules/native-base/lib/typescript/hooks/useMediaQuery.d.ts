declare type QueryKeys = 'maxWidth' | 'minWidth' | 'maxHeight' | 'minHeight' | 'orientation';
declare type SubQuery = {
    [queryKey in QueryKeys]?: number | string;
};
declare type Query = Array<SubQuery>;
export declare function useMediaQuery(query: SubQuery | Query): boolean[];
export {};
