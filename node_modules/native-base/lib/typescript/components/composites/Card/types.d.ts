import type { CustomProps } from '../../../components/types/utils';
import type { InterfaceBoxProps } from '../../primitives/Box';
export interface InterfaceCardProps extends InterfaceBoxProps<ICardProps> {
}
export declare type ICardProps = InterfaceCardProps & CustomProps<'Card'>;
