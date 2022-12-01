import type { IUseLinkProp } from './types';
import type { AccessibilityRole } from 'react-native';
export declare function useLink(props: IUseLinkProp): {
    linkProps: {
        accessibilityRole: AccessibilityRole;
        accessible: boolean;
    };
};
