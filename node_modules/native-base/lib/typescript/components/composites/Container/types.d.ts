import type { CustomProps } from '../../../components/types';
import type { InterfaceBoxProps } from '../../primitives/Box';
export declare type InterfaceContainerProps = InterfaceBoxProps<IContainerProps> & {
    centerContent?: boolean;
};
export declare type IContainerProps = InterfaceContainerProps & CustomProps<'Container'>;
