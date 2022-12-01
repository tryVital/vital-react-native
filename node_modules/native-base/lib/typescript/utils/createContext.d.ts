import React from 'react';
declare function createContext<ContextValueType extends object>(rootComponentName: string): readonly [{
    (props: ContextValueType & {
        children: React.ReactNode;
    }): JSX.Element;
    displayName: string;
}, (consumerName: string) => ContextValueType];
export { createContext };
