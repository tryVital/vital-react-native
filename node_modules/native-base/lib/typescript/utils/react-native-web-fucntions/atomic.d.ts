declare type Value = Object | Array<any> | string | number;
declare type Style = {
    [key: string]: Value;
};
declare type Rule = string;
declare type Rules = Array<Rule>;
declare type RulesData = [Rules, number];
declare type CompiledStyle = {
    $$css: boolean;
    $$css$localize?: boolean;
    [key: string]: string | Array<string>;
};
declare type CompilerOutput = [CompiledStyle, Array<RulesData>];
export declare function atomic(style: Style): CompilerOutput;
/**
 * Create a value string that normalizes different input values with a common
 * output.
 */
export declare function stringifyValueWithProperty(value: Value, property?: string): string;
export {};
