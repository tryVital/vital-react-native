import React from 'react';
declare type ResponsiveQueryContextType = {
    disableCSSMediaQueries?: boolean;
};
export declare const ResponsiveQueryContext: React.Context<ResponsiveQueryContextType>;
export declare const ResponsiveQueryProvider: (props: ResponsiveQueryContextType & {
    children: React.ReactNode;
}) => JSX.Element;
export {};
