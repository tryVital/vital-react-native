import type { ViewStyle } from 'react-native';
export interface IOverlayProps {
    isOpen?: boolean;
    children?: any;
    useRNModalOnAndroid?: boolean;
    useRNModal?: boolean;
    onRequestClose?: any;
    isKeyboardDismissable?: boolean;
    animationPreset?: 'fade' | 'slide' | 'none';
    style?: ViewStyle;
    unmountOnExit?: boolean;
}
export declare function Overlay({ children, isOpen, useRNModal, useRNModalOnAndroid, isKeyboardDismissable, animationPreset, onRequestClose, style, unmountOnExit, }: IOverlayProps): JSX.Element | null;
