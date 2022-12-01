import { AccessibilityRole } from 'react-native';
declare type IMenuTriggerProps = {
    handleOpen: () => void;
    isOpen: boolean;
};
export declare const useMenuTrigger: ({ handleOpen, isOpen }: IMenuTriggerProps) => {
    onKeyDownCapture: (event: KeyboardEvent) => void;
    'aria-haspopup': string;
    'aria-expanded': boolean | undefined;
    nativeID: string;
};
export declare const useMenu: () => {
    onKeyDown: (e: KeyboardEvent) => void;
    accessibilityRole: AccessibilityRole;
};
export declare const useMenuItem: ({ textValue, ref, }: {
    textValue: string;
    ref: any;
}) => {
    accessibilityRole: AccessibilityRole;
    dataSet: {
        nativebaseMenuItem: string;
    };
    onHoverIn: () => void;
};
export declare const useMenuOptionItem: ({ isChecked, type, }: {
    isChecked: boolean;
    type: 'checkbox' | 'radio';
}) => {
    accessibilityRole: AccessibilityRole;
    accessibilityState: {
        checked: boolean;
    };
    accessibilityChecked: boolean;
};
export declare const useMenuTypeahead: (props: any) => any;
export {};
