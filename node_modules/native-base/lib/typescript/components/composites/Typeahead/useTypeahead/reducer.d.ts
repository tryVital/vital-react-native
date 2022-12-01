declare type IState = {
    isOpen: boolean;
    selectedItem: any;
    inputValue: string;
};
export declare function useTypeaheadReducer(state: IState, action: any): {
    isOpen: boolean;
    selectedItem: any;
    inputValue: string;
} | {
    isOpen: any;
    selectedItem: any;
    inputValue: any;
} | {
    isOpen: boolean;
    selectedItem: any;
    inputValue: string;
} | {
    isOpen: boolean;
    inputValue: any;
    selectedItem: any;
} | {
    selectedItem: any;
    inputValue: any;
    isOpen: boolean;
} | {
    inputValue: any;
    isOpen: boolean;
    selectedItem: any;
};
export {};
