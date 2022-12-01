import type { CustomProps } from '../../../components/types';
import type { InterfaceBoxProps } from '../../primitives/Box';
import type { ColorSchemeType } from '../../../components/types';
export interface InterfaceTagProps extends InterfaceBoxProps<ITagProps> {
    variant?: 'solid' | 'subtle' | 'outline';
    colorScheme?: ColorSchemeType;
    size?: string | number;
}
export declare type IInputComponentType = (props: ITagProps) => JSX.Element;
export declare type ITagProps = InterfaceTagProps & CustomProps<'Tag'>;
