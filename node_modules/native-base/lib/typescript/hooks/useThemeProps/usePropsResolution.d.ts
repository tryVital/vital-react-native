import { IStateProps } from './propsFlattener';
import type { ComponentTheme } from '../../theme';
/**
 * @summary Combines provided porps with component's theme props and resloves them.
 * @arg {string} component - Name of the component.
 * @arg {object} incomingProps - Props passed by the user.
 * @arg {object} state - dependent states.
 * @arg {object} config - configuration for resolution. Accepts key like ignoreProps, resolveResponsively.
 * @returns {object} Resolved and flattened props.
 */
export declare function usePropsResolution(component: string, incomingProps: any, state?: IStateProps, config?: {
    componentTheme?: any;
    resolveResponsively?: string[];
    ignoreProps?: string[];
    cascadePseudoProps?: boolean;
    extendTheme?: string[];
}): any;
export declare const usePropsResolutionWithComponentTheme: (componentTheme: ComponentTheme, incomingProps: any, state?: {
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
} | undefined, config?: {
    componentTheme?: any;
    resolveResponsively?: string[] | undefined;
    ignoreProps?: string[] | undefined;
    cascadePseudoProps?: boolean | undefined;
    extendTheme?: string[] | undefined;
} | undefined) => Partial<any>;
