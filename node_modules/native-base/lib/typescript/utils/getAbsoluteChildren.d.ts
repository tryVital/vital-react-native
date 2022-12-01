import React from 'react';
declare const getAbsoluteChildren: (children: JSX.Element[] | JSX.Element, reverse?: boolean | undefined) => React.DetailedReactHTMLElement<{
    style: {
        position: "absolute";
    };
    position?: undefined;
} | {
    position: string;
    style?: undefined;
}, HTMLElement>[][];
export default getAbsoluteChildren;
