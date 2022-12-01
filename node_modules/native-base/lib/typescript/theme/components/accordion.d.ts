export declare const Accordion: {
    baseStyle: (props: Record<string, any>) => {
        borderWidth: number;
        borderColor: any;
        borderRadius: string;
    };
};
export declare const AccordionItem: {};
export declare const AccordionIcon: {};
export declare const AccordionSummary: {
    baseStyle: (props: Record<string, any>) => {
        borderTopWidth: number;
        borderTopColor: any;
        p: number;
        _hover: {
            bg: any;
        };
        _expanded: {
            bg: string;
            borderBottomColor: any;
            _text: {
                color: string;
            };
        };
        _disabled: {
            bg: any;
        };
    };
};
export declare const AccordionDetails: {
    baseStyle: {
        p: number;
    };
};
