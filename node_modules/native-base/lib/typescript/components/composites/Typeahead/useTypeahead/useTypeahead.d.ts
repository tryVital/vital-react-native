import type { AccessibilityRole } from 'react-native';
import type { IUseTypeaheadProps } from './types';
export declare function useTypeahead(props: IUseTypeaheadProps): {
    getInputProps: (propInputVal?: any, propOnchangeText?: any) => {
        onChangeText: any;
        value: any;
        accessibilityRole: AccessibilityRole;
        accessibilityLabel: string;
        accessibilityState: {
            expanded: any;
        };
    };
    getMenuItemProps: (item: any, index: number) => {
        onPress: () => void;
        accessible: boolean;
        accessiblityRole: AccessibilityRole;
    };
    getMenuProps: () => {
        accessible: boolean;
        accessibilityRole: AccessibilityRole;
        accessibilityHint: string;
    };
    getToggleButtonProps: () => {
        onPress: () => void;
    };
    isOpen: any;
};
