import React from 'react';
import { ITypeaheadProps } from './types';
export declare const Typeahead: React.ForwardRefExoticComponent<import("../../primitives/Box").InterfaceBoxProps<ITypeaheadProps> & {
    options: any[];
    renderItem?: ((item: any) => any) | undefined;
    onChange?: ((value: string) => void) | undefined;
    toggleIcon?: any;
    dropdownHeight?: string | number | undefined;
    inputValue?: string | undefined;
    onSelectedItemChange?: ((value: any) => void) | undefined;
    numberOfItems?: number | undefined;
    getOptionLabel?: ((item: any) => string) | undefined;
    getOptionKey?: ((item: any) => any) | undefined;
    disabledKeys?: any[] | undefined;
    label?: string | undefined;
} & React.RefAttributes<unknown>>;
