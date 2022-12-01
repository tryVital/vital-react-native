/// <reference types="react" />
export declare function mergeRefs<T = any>(refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>): React.RefCallback<T>;
export declare function composeEventHandlers<E>(originalEventHandler?: null | ((event: E) => void), ourEventHandler?: (event: E) => void): (event: E) => void;
