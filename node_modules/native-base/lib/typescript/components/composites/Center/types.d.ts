import type { CustomProps } from '../../../components/types/utils';
import type { InterfaceBoxProps } from '../../../components/primitives/Box/types';
export interface InterfaceCenterProps extends InterfaceBoxProps<ICenterProps> {
}
export declare type ICircleProps = InterfaceBoxProps<ICircleProps> & {
    size?: number | string;
};
export declare type ISquareProps = InterfaceBoxProps<ISquareProps> & {
    size?: number | string;
};
export declare type ICenterProps = InterfaceCenterProps & CustomProps<'Center'>;
