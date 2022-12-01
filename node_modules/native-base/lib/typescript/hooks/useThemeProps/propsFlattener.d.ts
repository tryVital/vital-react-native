declare const pseudoPropsMap: {
    readonly _web: {
        readonly dependentOn: "platform";
        readonly priority: 10;
    };
    readonly _ios: {
        readonly dependentOn: "platform";
        readonly priority: 10;
    };
    readonly _android: {
        readonly dependentOn: "platform";
        readonly priority: 10;
    };
    readonly _light: {
        readonly dependentOn: "colormode";
        readonly priority: 10;
    };
    readonly _dark: {
        readonly dependentOn: "colormode";
        readonly priority: 10;
    };
    readonly _indeterminate: {
        readonly dependentOn: "state";
        readonly respondTo: "isIndeterminate";
        readonly priority: 30;
    };
    readonly _checked: {
        readonly dependentOn: "state";
        readonly respondTo: "isChecked";
        readonly priority: 30;
    };
    readonly _readOnly: {
        readonly dependentOn: "state";
        readonly respondTo: "isReadOnly";
        readonly priority: 30;
    };
    readonly _invalid: {
        readonly dependentOn: "state";
        readonly respondTo: "isInvalid";
        readonly priority: 40;
    };
    readonly _focus: {
        readonly dependentOn: "state";
        readonly respondTo: "isFocused";
        readonly priority: 50;
    };
    readonly _focusVisible: {
        readonly dependentOn: "state";
        readonly respondTo: "isFocusVisible";
        readonly priority: 55;
    };
    readonly _hover: {
        readonly dependentOn: "state";
        readonly respondTo: "isHovered";
        readonly priority: 60;
    };
    readonly _pressed: {
        readonly dependentOn: "state";
        readonly respondTo: "isPressed";
        readonly priority: 70;
    };
    readonly _disabled: {
        readonly dependentOn: "state";
        readonly respondTo: "isDisabled";
        readonly priority: 100;
    };
    readonly _loading: {
        readonly dependentOn: "state";
        readonly respondTo: "isLoading";
        readonly priority: 110;
    };
    readonly _important: {
        readonly dependentOn: null;
        readonly priority: 1000;
    };
};
declare type IPseudoPropsMap = typeof pseudoPropsMap;
declare type ExtractState<T extends IPseudoPropsMap> = {
    [P in keyof T as T[P]['respondTo']]?: boolean;
};
export declare type IStateProps = ExtractState<IPseudoPropsMap>;
export declare const compareSpecificity: (exisiting: any, upcoming: any, ignorebaseTheme?: boolean | undefined) => boolean;
export declare const propsFlattener: ({ props, colormode, platform, state, currentSpecificityMap, previouslyFlattenProps, cascadePseudoProps, }: any, priority: number) => any[];
export {};
