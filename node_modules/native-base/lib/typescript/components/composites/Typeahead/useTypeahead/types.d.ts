export declare const InputChange = "__input_change__";
export declare const InputBlur = "__input_blur__";
export declare const ItemClick = "__item_click__";
export declare const ToggleButtonClick = "__togglebutton_click__";
export declare const FunctionToggleMenu = "__function_toggle_menu__";
export declare const FunctionOpenMenu = "__function_open_menu__";
export declare const FunctionCloseMenu = "__function_close_menu__";
export declare const FunctionSelectItem = "__function_select_item__";
export declare const FunctionSetInputValue = "__function_set_input_value__";
export declare const FunctionReset = "__function_reset__";
export declare const ControlledPropUpdatedSelectedItem = "__controlled_prop_updated_selected_item__";
export declare type IItem = any;
export declare type IUseTypeaheadProps = {
    isOpen?: boolean;
    items: IItem[];
    itemToString: (item?: any) => string;
    selectedItem?: IItem;
    onInputValueChange?: ({ inputValue }: {
        inputValue: string;
    }) => any;
    onSelectedItemChange?: (item: IItem) => any;
};
