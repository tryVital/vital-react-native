import React from 'react';
import type { ComponentTheme } from '../theme';
export default function Factory<P>(Component: React.ComponentType<P>, componentTheme?: ComponentTheme): React.ForwardRefExoticComponent<React.PropsWithoutRef<P & import("..").StyledProps & import("../components/types").PlatformProps<import("..").StyledProps> & {
    children?: string | JSX.Element | JSX.Element[] | undefined;
    _state?: {
        readonly isIndeterminate?: boolean | undefined;
        readonly isChecked?: boolean | undefined;
        readonly isReadOnly?: boolean | undefined;
        readonly isInvalid?: boolean | undefined;
        readonly isFocused?: boolean | undefined;
        readonly isFocusVisible?: boolean | undefined;
        readonly isHovered?: boolean | undefined;
        readonly isPressed?: boolean | undefined;
        readonly isDisabled?: boolean | undefined;
        readonly isLoading?: boolean | undefined;
    } | undefined;
}> & React.RefAttributes<unknown>>;
