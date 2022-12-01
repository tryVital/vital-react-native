export declare const getColor: (rawValue: any, scale: any, theme: any) => any;
export declare const layout: {
    readonly width: {
        readonly property: "width";
        readonly scale: "sizes";
    };
    readonly w: {
        readonly property: "width";
        readonly scale: "sizes";
    };
    readonly height: {
        readonly property: "height";
        readonly scale: "sizes";
    };
    readonly h: {
        readonly property: "height";
        readonly scale: "sizes";
    };
    readonly minWidth: {
        readonly property: "minWidth";
        readonly scale: "sizes";
    };
    readonly minW: {
        readonly property: "minWidth";
        readonly scale: "sizes";
    };
    readonly minHeight: {
        readonly property: "minHeight";
        readonly scale: "sizes";
    };
    readonly minH: {
        readonly property: "minHeight";
        readonly scale: "sizes";
    };
    readonly maxWidth: {
        readonly property: "maxWidth";
        readonly scale: "sizes";
    };
    readonly maxW: {
        readonly property: "maxWidth";
        readonly scale: "sizes";
    };
    readonly maxHeight: {
        readonly property: "maxHeight";
        readonly scale: "sizes";
    };
    readonly maxH: {
        readonly property: "maxHeight";
        readonly scale: "sizes";
    };
    readonly size: {
        readonly properties: readonly ["width", "height"];
        readonly scale: "sizes";
    };
    readonly boxSize: {
        readonly properties: readonly ["width", "height"];
        readonly scale: "sizes";
    };
    readonly overflow: true;
    readonly overflowX: true;
    readonly overflowY: true;
    readonly display: true;
    readonly verticalAlign: true;
    readonly textAlign: true;
};
export declare const flexbox: {
    readonly alignItems: true;
    readonly alignContent: true;
    readonly justifyItems: true;
    readonly justifyContent: true;
    readonly flexWrap: true;
    readonly flexDirection: true;
    readonly flexDir: {
        readonly property: "flexDirection";
        readonly scale: "flexDirection";
    };
    readonly flex: true;
    readonly flexGrow: true;
    readonly flexShrink: true;
    readonly flexBasis: true;
    readonly justifySelf: true;
    readonly alignSelf: true;
    readonly order: true;
};
export declare const position: {
    readonly position: true;
    readonly zIndex: {
        readonly property: "zIndex";
    };
    readonly top: {
        readonly property: "top";
        readonly scale: "space";
    };
    readonly right: {
        readonly property: "right";
        readonly scale: "space";
    };
    readonly bottom: {
        readonly property: "bottom";
        readonly scale: "space";
    };
    readonly left: {
        readonly property: "left";
        readonly scale: "space";
    };
};
export declare const color: {
    readonly color: {
        readonly property: "color";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly tintColor: {
        readonly property: "tintColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly backgroundColor: {
        readonly property: "backgroundColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly opacity: {
        readonly property: "opacity";
        readonly scale: "opacity";
    };
    readonly bg: {
        readonly property: "backgroundColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly bgColor: {
        readonly property: "backgroundColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly background: {
        readonly property: "backgroundColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly textDecorationColor: {
        readonly property: "textDecorationColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
};
export declare const border: {
    readonly borderWidth: {
        readonly property: "borderWidth";
        readonly scale: "borderWidths";
    };
    readonly borderStyle: {
        readonly property: "borderStyle";
        readonly scale: "borderStyles";
    };
    readonly borderColor: {
        readonly property: "borderColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly borderRadius: {
        readonly property: "borderRadius";
        readonly scale: "radii";
    };
    readonly borderTop: {
        readonly property: "borderTop";
        readonly scale: "borders";
    };
    readonly borderTopRadius: {
        readonly properties: readonly ["borderTopLeftRadius", "borderTopRightRadius"];
        readonly scale: "radii";
    };
    readonly borderLeftRadius: {
        readonly properties: readonly ["borderTopLeftRadius", "borderBottomLeftRadius"];
        readonly scale: "radii";
    };
    readonly borderRightRadius: {
        readonly properties: readonly ["borderTopRightRadius", "borderBottomRightRadius"];
        readonly scale: "radii";
    };
    readonly borderTopLeftRadius: {
        readonly property: "borderTopLeftRadius";
        readonly scale: "radii";
    };
    readonly borderTopRightRadius: {
        readonly property: "borderTopRightRadius";
        readonly scale: "radii";
    };
    readonly borderRight: {
        readonly property: "borderRight";
        readonly scale: "borders";
    };
    readonly borderBottom: {
        readonly property: "borderBottom";
        readonly scale: "borders";
    };
    readonly borderBottomLeftRadius: {
        readonly property: "borderBottomLeftRadius";
        readonly scale: "radii";
    };
    readonly borderBottomRightRadius: {
        readonly property: "borderBottomRightRadius";
        readonly scale: "radii";
    };
    readonly borderLeft: {
        readonly property: "borderLeft";
        readonly scale: "borders";
    };
    readonly borderX: {
        readonly properties: readonly ["borderLeft", "borderRight"];
        readonly scale: "borders";
    };
    readonly borderY: {
        readonly properties: readonly ["borderTop", "borderBottom"];
        readonly scale: "borders";
    };
    readonly borderTopWidth: {
        readonly property: "borderTopWidth";
        readonly scale: "borderWidths";
    };
    readonly borderTopColor: {
        readonly property: "borderTopColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly borderTopStyle: {
        readonly property: "borderTopStyle";
        readonly scale: "borderStyles";
    };
    readonly borderBottomWidth: {
        readonly property: "borderBottomWidth";
        readonly scale: "borderWidths";
    };
    readonly borderBottomColor: {
        readonly property: "borderBottomColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly borderBottomStyle: {
        readonly property: "borderBottomStyle";
        readonly scale: "borderStyles";
    };
    readonly borderLeftWidth: {
        readonly property: "borderLeftWidth";
        readonly scale: "borderWidths";
    };
    readonly borderLeftColor: {
        readonly property: "borderLeftColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly borderLeftStyle: {
        readonly property: "borderLeftStyle";
        readonly scale: "borderStyles";
    };
    readonly borderRightWidth: {
        readonly property: "borderRightWidth";
        readonly scale: "borderWidths";
    };
    readonly borderRightColor: {
        readonly property: "borderRightColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly borderRightStyle: {
        readonly property: "borderRightStyle";
        readonly scale: "borderStyles";
    };
    readonly rounded: {
        readonly property: "borderRadius";
        readonly scale: "radii";
    };
    readonly roundedTopLeft: {
        readonly property: "borderTopLeftRadius";
        readonly scale: "radii";
    };
    readonly roundedTopRight: {
        readonly property: "borderTopRightRadius";
        readonly scale: "radii";
    };
    readonly roundedBottomLeft: {
        readonly property: "borderBottomLeftRadius";
        readonly scale: "radii";
    };
    readonly roundedBottomRight: {
        readonly property: "borderBottomRightRadius";
        readonly scale: "radii";
    };
    readonly roundedTop: {
        readonly properties: readonly ["borderTopLeftRadius", "borderTopRightRadius"];
        readonly scale: "radii";
    };
    readonly borderBottomRadius: {
        readonly properties: readonly ["borderBottomLeftRadius", "borderBottomRightRadius"];
        readonly scale: "radii";
    };
    readonly roundedBottom: {
        readonly properties: readonly ["borderBottomLeftRadius", "borderBottomRightRadius"];
        readonly scale: "radii";
    };
    readonly roundedLeft: {
        readonly properties: readonly ["borderTopLeftRadius", "borderBottomLeftRadius"];
        readonly scale: "radii";
    };
    readonly roundedRight: {
        readonly properties: readonly ["borderTopRightRadius", "borderBottomRightRadius"];
        readonly scale: "radii";
    };
};
export declare const background: {
    readonly backgroundSize: true;
    readonly backgroundPosition: true;
    readonly backgroundRepeat: true;
    readonly backgroundAttachment: true;
    readonly backgroundBlendMode: true;
    readonly bgImage: {
        readonly property: "backgroundImage";
    };
    readonly bgImg: {
        readonly property: "backgroundImage";
    };
    readonly bgBlendMode: {
        readonly property: "backgroundBlendMode";
    };
    readonly bgSize: {
        readonly property: "backgroundSize";
    };
    readonly bgPosition: {
        readonly property: "backgroundPosition";
    };
    readonly bgPos: {
        readonly property: "backgroundPosition";
    };
    readonly bgRepeat: {
        readonly property: "backgroundRepeat";
    };
    readonly bgAttachment: {
        readonly property: "backgroundAttachment";
    };
};
export declare const space: {
    readonly margin: {
        readonly property: "margin";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly m: {
        readonly property: "margin";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly marginTop: {
        readonly property: "marginTop";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly mt: {
        readonly property: "marginTop";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly marginRight: {
        readonly property: "marginRight";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly mr: {
        readonly property: "marginRight";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly marginBottom: {
        readonly property: "marginBottom";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly mb: {
        readonly property: "marginBottom";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly marginLeft: {
        readonly property: "marginLeft";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly ml: {
        readonly property: "marginLeft";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly marginX: {
        readonly properties: readonly ["marginLeft", "marginRight"];
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly mx: {
        readonly properties: readonly ["marginLeft", "marginRight"];
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly marginY: {
        readonly properties: readonly ["marginTop", "marginBottom"];
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly my: {
        readonly properties: readonly ["marginTop", "marginBottom"];
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly padding: {
        readonly property: "padding";
        readonly scale: "space";
    };
    readonly p: {
        readonly property: "padding";
        readonly scale: "space";
    };
    readonly paddingTop: {
        readonly property: "paddingTop";
        readonly scale: "space";
    };
    readonly pt: {
        readonly property: "paddingTop";
        readonly scale: "space";
    };
    readonly paddingRight: {
        readonly property: "paddingRight";
        readonly scale: "space";
    };
    readonly pr: {
        readonly property: "paddingRight";
        readonly scale: "space";
    };
    readonly paddingBottom: {
        readonly property: "paddingBottom";
        readonly scale: "space";
    };
    readonly pb: {
        readonly property: "paddingBottom";
        readonly scale: "space";
    };
    readonly paddingLeft: {
        readonly property: "paddingLeft";
        readonly scale: "space";
    };
    readonly pl: {
        readonly property: "paddingLeft";
        readonly scale: "space";
    };
    readonly paddingX: {
        readonly properties: readonly ["paddingLeft", "paddingRight"];
        readonly scale: "space";
    };
    readonly px: {
        readonly properties: readonly ["paddingLeft", "paddingRight"];
        readonly scale: "space";
    };
    readonly paddingY: {
        readonly properties: readonly ["paddingTop", "paddingBottom"];
        readonly scale: "space";
    };
    readonly py: {
        readonly properties: readonly ["paddingTop", "paddingBottom"];
        readonly scale: "space";
    };
    readonly gap: {
        readonly property: "gap";
        readonly scale: "space";
    };
};
export declare const typography: {
    readonly fontFamily: {
        readonly property: "fontFamily";
        readonly scale: "fonts";
    };
    readonly fontSize: {
        readonly property: "fontSize";
        readonly scale: "fontSizes";
    };
    readonly fontWeight: {
        readonly property: "fontWeight";
        readonly scale: "fontWeights";
        readonly transformer: (val: any, scale: any) => any;
    };
    readonly lineHeight: {
        readonly property: "lineHeight";
        readonly scale: "lineHeights";
    };
    readonly letterSpacing: {
        readonly property: "letterSpacing";
        readonly scale: "letterSpacings";
    };
    readonly textAlign: true;
    readonly fontStyle: true;
    readonly wordBreak: true;
    readonly overflowWrap: true;
    readonly textOverflow: true;
    readonly textTransform: true;
    readonly whiteSpace: true;
    readonly textDecoration: {
        readonly property: "textDecorationLine";
    };
    readonly txtDecor: {
        readonly property: "textDecorationLine";
    };
    readonly textDecorationLine: true;
};
export declare const propConfig: {
    readonly outline: true;
    readonly outlineWidth: true;
    readonly outlineColor: true;
    readonly outlineStyle: true;
    readonly shadow: {
        readonly scale: "shadows";
    };
    readonly cursor: true;
    readonly overflow: true;
    readonly userSelect: {
        readonly property: "userSelect";
    };
    readonly backgroundSize: true;
    readonly backgroundPosition: true;
    readonly backgroundRepeat: true;
    readonly backgroundAttachment: true;
    readonly backgroundBlendMode: true;
    readonly bgImage: {
        readonly property: "backgroundImage";
    };
    readonly bgImg: {
        readonly property: "backgroundImage";
    };
    readonly bgBlendMode: {
        readonly property: "backgroundBlendMode";
    };
    readonly bgSize: {
        readonly property: "backgroundSize";
    };
    readonly bgPosition: {
        readonly property: "backgroundPosition";
    };
    readonly bgPos: {
        readonly property: "backgroundPosition";
    };
    readonly bgRepeat: {
        readonly property: "backgroundRepeat";
    };
    readonly bgAttachment: {
        readonly property: "backgroundAttachment";
    };
    readonly fontFamily: {
        readonly property: "fontFamily";
        readonly scale: "fonts";
    };
    readonly fontSize: {
        readonly property: "fontSize";
        readonly scale: "fontSizes";
    };
    readonly fontWeight: {
        readonly property: "fontWeight";
        readonly scale: "fontWeights";
        readonly transformer: (val: any, scale: any) => any;
    };
    readonly lineHeight: {
        readonly property: "lineHeight";
        readonly scale: "lineHeights";
    };
    readonly letterSpacing: {
        readonly property: "letterSpacing";
        readonly scale: "letterSpacings";
    };
    readonly textAlign: true;
    readonly fontStyle: true;
    readonly wordBreak: true;
    readonly overflowWrap: true;
    readonly textOverflow: true;
    readonly textTransform: true;
    readonly whiteSpace: true;
    readonly textDecoration: {
        readonly property: "textDecorationLine";
    };
    readonly txtDecor: {
        readonly property: "textDecorationLine";
    };
    readonly textDecorationLine: true;
    readonly position: true;
    readonly zIndex: {
        readonly property: "zIndex";
    };
    readonly top: {
        readonly property: "top";
        readonly scale: "space";
    };
    readonly right: {
        readonly property: "right";
        readonly scale: "space";
    };
    readonly bottom: {
        readonly property: "bottom";
        readonly scale: "space";
    };
    readonly left: {
        readonly property: "left";
        readonly scale: "space";
    };
    readonly borderWidth: {
        readonly property: "borderWidth";
        readonly scale: "borderWidths";
    };
    readonly borderStyle: {
        readonly property: "borderStyle";
        readonly scale: "borderStyles";
    };
    readonly borderColor: {
        readonly property: "borderColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly borderRadius: {
        readonly property: "borderRadius";
        readonly scale: "radii";
    };
    readonly borderTop: {
        readonly property: "borderTop";
        readonly scale: "borders";
    };
    readonly borderTopRadius: {
        readonly properties: readonly ["borderTopLeftRadius", "borderTopRightRadius"];
        readonly scale: "radii";
    };
    readonly borderLeftRadius: {
        readonly properties: readonly ["borderTopLeftRadius", "borderBottomLeftRadius"];
        readonly scale: "radii";
    };
    readonly borderRightRadius: {
        readonly properties: readonly ["borderTopRightRadius", "borderBottomRightRadius"];
        readonly scale: "radii";
    };
    readonly borderTopLeftRadius: {
        readonly property: "borderTopLeftRadius";
        readonly scale: "radii";
    };
    readonly borderTopRightRadius: {
        readonly property: "borderTopRightRadius";
        readonly scale: "radii";
    };
    readonly borderRight: {
        readonly property: "borderRight";
        readonly scale: "borders";
    };
    readonly borderBottom: {
        readonly property: "borderBottom";
        readonly scale: "borders";
    };
    readonly borderBottomLeftRadius: {
        readonly property: "borderBottomLeftRadius";
        readonly scale: "radii";
    };
    readonly borderBottomRightRadius: {
        readonly property: "borderBottomRightRadius";
        readonly scale: "radii";
    };
    readonly borderLeft: {
        readonly property: "borderLeft";
        readonly scale: "borders";
    };
    readonly borderX: {
        readonly properties: readonly ["borderLeft", "borderRight"];
        readonly scale: "borders";
    };
    readonly borderY: {
        readonly properties: readonly ["borderTop", "borderBottom"];
        readonly scale: "borders";
    };
    readonly borderTopWidth: {
        readonly property: "borderTopWidth";
        readonly scale: "borderWidths";
    };
    readonly borderTopColor: {
        readonly property: "borderTopColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly borderTopStyle: {
        readonly property: "borderTopStyle";
        readonly scale: "borderStyles";
    };
    readonly borderBottomWidth: {
        readonly property: "borderBottomWidth";
        readonly scale: "borderWidths";
    };
    readonly borderBottomColor: {
        readonly property: "borderBottomColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly borderBottomStyle: {
        readonly property: "borderBottomStyle";
        readonly scale: "borderStyles";
    };
    readonly borderLeftWidth: {
        readonly property: "borderLeftWidth";
        readonly scale: "borderWidths";
    };
    readonly borderLeftColor: {
        readonly property: "borderLeftColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly borderLeftStyle: {
        readonly property: "borderLeftStyle";
        readonly scale: "borderStyles";
    };
    readonly borderRightWidth: {
        readonly property: "borderRightWidth";
        readonly scale: "borderWidths";
    };
    readonly borderRightColor: {
        readonly property: "borderRightColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly borderRightStyle: {
        readonly property: "borderRightStyle";
        readonly scale: "borderStyles";
    };
    readonly rounded: {
        readonly property: "borderRadius";
        readonly scale: "radii";
    };
    readonly roundedTopLeft: {
        readonly property: "borderTopLeftRadius";
        readonly scale: "radii";
    };
    readonly roundedTopRight: {
        readonly property: "borderTopRightRadius";
        readonly scale: "radii";
    };
    readonly roundedBottomLeft: {
        readonly property: "borderBottomLeftRadius";
        readonly scale: "radii";
    };
    readonly roundedBottomRight: {
        readonly property: "borderBottomRightRadius";
        readonly scale: "radii";
    };
    readonly roundedTop: {
        readonly properties: readonly ["borderTopLeftRadius", "borderTopRightRadius"];
        readonly scale: "radii";
    };
    readonly borderBottomRadius: {
        readonly properties: readonly ["borderBottomLeftRadius", "borderBottomRightRadius"];
        readonly scale: "radii";
    };
    readonly roundedBottom: {
        readonly properties: readonly ["borderBottomLeftRadius", "borderBottomRightRadius"];
        readonly scale: "radii";
    };
    readonly roundedLeft: {
        readonly properties: readonly ["borderTopLeftRadius", "borderBottomLeftRadius"];
        readonly scale: "radii";
    };
    readonly roundedRight: {
        readonly properties: readonly ["borderTopRightRadius", "borderBottomRightRadius"];
        readonly scale: "radii";
    };
    readonly alignItems: true;
    readonly alignContent: true;
    readonly justifyItems: true;
    readonly justifyContent: true;
    readonly flexWrap: true;
    readonly flexDirection: true;
    readonly flexDir: {
        readonly property: "flexDirection";
        readonly scale: "flexDirection";
    };
    readonly flex: true;
    readonly flexGrow: true;
    readonly flexShrink: true;
    readonly flexBasis: true;
    readonly justifySelf: true;
    readonly alignSelf: true;
    readonly order: true;
    readonly width: {
        readonly property: "width";
        readonly scale: "sizes";
    };
    readonly w: {
        readonly property: "width";
        readonly scale: "sizes";
    };
    readonly height: {
        readonly property: "height";
        readonly scale: "sizes";
    };
    readonly h: {
        readonly property: "height";
        readonly scale: "sizes";
    };
    readonly minWidth: {
        readonly property: "minWidth";
        readonly scale: "sizes";
    };
    readonly minW: {
        readonly property: "minWidth";
        readonly scale: "sizes";
    };
    readonly minHeight: {
        readonly property: "minHeight";
        readonly scale: "sizes";
    };
    readonly minH: {
        readonly property: "minHeight";
        readonly scale: "sizes";
    };
    readonly maxWidth: {
        readonly property: "maxWidth";
        readonly scale: "sizes";
    };
    readonly maxW: {
        readonly property: "maxWidth";
        readonly scale: "sizes";
    };
    readonly maxHeight: {
        readonly property: "maxHeight";
        readonly scale: "sizes";
    };
    readonly maxH: {
        readonly property: "maxHeight";
        readonly scale: "sizes";
    };
    readonly size: {
        readonly properties: readonly ["width", "height"];
        readonly scale: "sizes";
    };
    readonly boxSize: {
        readonly properties: readonly ["width", "height"];
        readonly scale: "sizes";
    };
    readonly overflowX: true;
    readonly overflowY: true;
    readonly display: true;
    readonly verticalAlign: true;
    readonly margin: {
        readonly property: "margin";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly m: {
        readonly property: "margin";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly marginTop: {
        readonly property: "marginTop";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly mt: {
        readonly property: "marginTop";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly marginRight: {
        readonly property: "marginRight";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly mr: {
        readonly property: "marginRight";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly marginBottom: {
        readonly property: "marginBottom";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly mb: {
        readonly property: "marginBottom";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly marginLeft: {
        readonly property: "marginLeft";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly ml: {
        readonly property: "marginLeft";
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly marginX: {
        readonly properties: readonly ["marginLeft", "marginRight"];
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly mx: {
        readonly properties: readonly ["marginLeft", "marginRight"];
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly marginY: {
        readonly properties: readonly ["marginTop", "marginBottom"];
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly my: {
        readonly properties: readonly ["marginTop", "marginBottom"];
        readonly scale: "space";
        readonly transformer: (n: any, scale: any) => any;
    };
    readonly padding: {
        readonly property: "padding";
        readonly scale: "space";
    };
    readonly p: {
        readonly property: "padding";
        readonly scale: "space";
    };
    readonly paddingTop: {
        readonly property: "paddingTop";
        readonly scale: "space";
    };
    readonly pt: {
        readonly property: "paddingTop";
        readonly scale: "space";
    };
    readonly paddingRight: {
        readonly property: "paddingRight";
        readonly scale: "space";
    };
    readonly pr: {
        readonly property: "paddingRight";
        readonly scale: "space";
    };
    readonly paddingBottom: {
        readonly property: "paddingBottom";
        readonly scale: "space";
    };
    readonly pb: {
        readonly property: "paddingBottom";
        readonly scale: "space";
    };
    readonly paddingLeft: {
        readonly property: "paddingLeft";
        readonly scale: "space";
    };
    readonly pl: {
        readonly property: "paddingLeft";
        readonly scale: "space";
    };
    readonly paddingX: {
        readonly properties: readonly ["paddingLeft", "paddingRight"];
        readonly scale: "space";
    };
    readonly px: {
        readonly properties: readonly ["paddingLeft", "paddingRight"];
        readonly scale: "space";
    };
    readonly paddingY: {
        readonly properties: readonly ["paddingTop", "paddingBottom"];
        readonly scale: "space";
    };
    readonly py: {
        readonly properties: readonly ["paddingTop", "paddingBottom"];
        readonly scale: "space";
    };
    readonly gap: {
        readonly property: "gap";
        readonly scale: "space";
    };
    readonly color: {
        readonly property: "color";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly tintColor: {
        readonly property: "tintColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly backgroundColor: {
        readonly property: "backgroundColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly opacity: {
        readonly property: "opacity";
        readonly scale: "opacity";
    };
    readonly bg: {
        readonly property: "backgroundColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly bgColor: {
        readonly property: "backgroundColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly background: {
        readonly property: "backgroundColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
    readonly textDecorationColor: {
        readonly property: "textDecorationColor";
        readonly scale: "colors";
        readonly transformer: (rawValue: any, scale: any, theme: any) => any;
    };
};
export declare const getStyleAndFilteredProps: ({ style, theme, debug, currentBreakpoint, getResponsiveStyles, styledSystemProps, }: any) => {
    styleSheet: {
        box: any;
    };
    styleFromProps: any;
    dataSet: any;
};
export declare type StyledPropConfig = typeof propConfig;
