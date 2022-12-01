export declare type IDrawerProps = {
    placement?: 'top' | 'left' | 'right' | 'bottom';
    children?: any;
    isOpen: boolean;
    onClose?: () => void;
};
declare const Drawer: ({ children, isOpen, onClose, placement, }: IDrawerProps) => JSX.Element | null;
export default Drawer;
