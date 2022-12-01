import type { StatusBarProps } from 'react-native';
import type { CustomProps } from '../../../components/types';
export interface InterfaceStatusBarProps extends StatusBarProps {
}
export declare type IStatusBarProps = InterfaceStatusBarProps & CustomProps<'StatusBar'>;
export declare type IStatusBarComponentType = (props: IStatusBarProps) => JSX.Element;
