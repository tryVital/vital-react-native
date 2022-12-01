declare type Join<K, P> = K extends string | number ? P extends string | number ? `${K}${'' extends P ? '' : '.'}${P}` : never : never;
export declare type Leaves<T> = T extends object ? {
    [K in keyof T]-?: Join<K, Leaves<T[K]>>;
}[keyof T] : '';
export {};
