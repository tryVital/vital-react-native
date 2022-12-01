import type { IInputProps, IStackProps } from '../../primitives';
import type { InterfaceInputProps } from '../../primitives/Input/types';
import type { InterfaceBoxProps } from '../../primitives/Box/types';
import type { CustomProps } from '../../../components/types';
export declare type INumberInputProps = (InterfaceInputProps & InterfaceBoxProps<INumberInputProps> & {
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    isReadOnly?: boolean;
    isInvalid?: boolean;
    isDisabled?: boolean;
    keepWithinRange?: boolean;
    allowMouseWheel?: boolean;
    clampValueOnBlur?: boolean;
    focusInputOnChange?: boolean;
    getAriaValueText?: boolean;
    children?: JSX.Element[] | JSX.Element;
}) & CustomProps<'NumberInput'>;
export declare type INumberInputFieldProps = IInputProps & {};
export declare type INumberInputSteppersProps = IStackProps & {
    children: JSX.Element[] | JSX.Element;
};
export declare type INumberInputStepperProps = InterfaceBoxProps<INumberInputStepperProps> & {
    isDisabled?: boolean;
    _disabled?: Omit<INumberInputStepperProps, '_disabled'>;
    _active?: Omit<INumberInputStepperProps, '_active'>;
};
export declare type INumberInputContext = INumberInputProps & {
    numberInputValue?: number;
    value?: number;
    handleChange?: (value: number) => void;
    handleChangeWithoutCheck?: (value: number) => void;
    numberInputStepper?: any;
    setNumberInputStepper?: any;
    isControlled?: boolean;
};
