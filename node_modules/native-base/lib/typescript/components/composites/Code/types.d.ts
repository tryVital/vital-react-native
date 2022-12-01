import type { CustomProps } from '../../../components/types/utils';
import type { InterfaceBoxProps } from '../../primitives/Box';
import type { ColorSchemeType } from '../../../components/types';
export declare type InterfaceCodeProps = InterfaceBoxProps<ICodeProps> & {
    colorScheme?: ColorSchemeType;
};
export declare type ICodeProps = InterfaceCodeProps & CustomProps<'Code'>;
