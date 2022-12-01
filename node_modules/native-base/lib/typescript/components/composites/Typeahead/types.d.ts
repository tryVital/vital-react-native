import type { InterfaceBoxProps } from '../../primitives/Box/types';
export declare type ITypeaheadProps = InterfaceBoxProps<ITypeaheadProps> & {
    options: any[];
    renderItem?: (item: any) => any;
    onChange?: (value: string) => void;
    toggleIcon?: any;
    dropdownHeight?: number | string;
    inputValue?: string;
    onSelectedItemChange?: (value: any) => void;
    numberOfItems?: number;
    getOptionLabel?: (item: any) => string;
    getOptionKey?: (item: any) => any;
    disabledKeys?: Array<any>;
    label?: string;
};
export declare type IComboBoxProps = {
    items: any[];
    renderItem?: (item: any) => any;
    onInputChange?: (value: string) => void;
    toggleIcon?: any;
    dropdownHeight?: number | string;
    inputValue?: string;
    onSelectionChange?: (value: any) => void;
    children: any;
    disabledKeys?: Array<any>;
    label?: string;
};
export declare const layoutPropsList: string[];
