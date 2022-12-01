"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePropsResolutionTest = usePropsResolutionTest;

var _lodash = _interopRequireDefault(require("lodash.get"));

var _lodash2 = _interopRequireDefault(require("lodash.merge"));

var _reactNative = require("react-native");

var _useNativeBase = require("../useNativeBase");

var _colorMode = require("../../core/color-mode");

var _tools = require("../../theme/tools");

var _useContrastText = require("../useContrastText");

var _useBreakpointResolvedProps = require("../useBreakpointResolvedProps");

var _propsFlattenerTest = require("./propsFlattenerTest");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SPREAD_PROP_SPECIFICITY_ORDER = ['p', 'padding', 'px', 'py', 'pt', 'pb', 'pl', 'pr', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'm', 'margin', 'mx', 'my', 'mt', 'mb', 'ml', 'mr', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight'];
const FINAL_SPREAD_PROPS = ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight', 'marginTop', 'marginBottom', 'marginLeft', 'marginRight'];
const MARGIN_MAP = {
  mx: ['marginRight', 'marginLeft'],
  my: ['marginTop', 'marginBottom'],
  mt: ['marginTop'],
  mb: ['marginBottom'],
  mr: ['marginRight'],
  ml: ['marginLeft']
};
MARGIN_MAP.margin = [...MARGIN_MAP.mx, ...MARGIN_MAP.my];
MARGIN_MAP.m = MARGIN_MAP.margin;
MARGIN_MAP.marginTop = MARGIN_MAP.mt;
MARGIN_MAP.marginBottom = MARGIN_MAP.mb;
MARGIN_MAP.marginLeft = MARGIN_MAP.ml;
MARGIN_MAP.marginRight = MARGIN_MAP.mr;
const PADDING_MAP = {
  px: ['paddingRight', 'paddingLeft'],
  py: ['paddingTop', 'paddingBottom'],
  pt: ['paddingTop'],
  pb: ['paddingBottom'],
  pr: ['paddingRight'],
  pl: ['paddingLeft']
};
PADDING_MAP.padding = [...PADDING_MAP.px, ...PADDING_MAP.py];
PADDING_MAP.p = PADDING_MAP.padding;
PADDING_MAP.paddingTop = PADDING_MAP.pt;
PADDING_MAP.paddingBottom = PADDING_MAP.pb;
PADDING_MAP.paddingLeft = PADDING_MAP.pl;
PADDING_MAP.paddingRight = PADDING_MAP.pr;
const SPREAD_PROP_SPECIFICITY_MAP = { ...PADDING_MAP,
  ...MARGIN_MAP
};

function propsSpreader(incomingProps, incomingSpecifity) {
  const flattenedDefaultProps = { ...incomingProps
  };
  const specificity = {};
  SPREAD_PROP_SPECIFICITY_ORDER.forEach(prop => {
    if (prop in flattenedDefaultProps) {
      const val = incomingProps[prop] || flattenedDefaultProps[prop];

      if (!FINAL_SPREAD_PROPS.includes(prop)) {
        delete flattenedDefaultProps[prop];
        specificity[prop] = incomingSpecifity[prop];
      }

      SPREAD_PROP_SPECIFICITY_MAP[prop].forEach(newProp => {
        if ((0, _propsFlattenerTest.compareSpecificity)(specificity[newProp], specificity[prop])) {
          specificity[newProp] = incomingSpecifity[prop];
          flattenedDefaultProps[newProp] = val;
        }
      });
    }
  });
  return (0, _lodash2.default)({}, flattenedDefaultProps);
}
/**
 * @summary Combines provided porps with component's theme props and resloves them.
 * @arg {string} component - Name of the component.
 * @arg {object} incomingProps - Props passed by the user.
 * @arg {object} state - dependent states.
 * @arg {object} config - configuration for resolution. Accepts key like ignoreProps, resolveResponsively.
 * @returns {object} Resolved and flattened props.
 */


function usePropsResolutionTest(component, incomingProps, state, config) {
  var _flattenProps$bg, _flattenProps$backgro, _flattenProps$bgColor, _flattenProps$backgro2, _ref, _flattenProps$bg2, _flattenProps, _flattenProps$_text, _flattenProps2, _flattenProps2$_text;

  const [ignoredProps, cleanIncomingProps] = (0, _tools.extractInObject)(incomingProps, ['children', 'onPress', 'icon', 'onOpen', 'onClose'].concat((config === null || config === void 0 ? void 0 : config.ignoreProps) || []));
  const resolveResponsively = ['colorScheme', 'size', 'variant', ...((config === null || config === void 0 ? void 0 : config.resolveResponsively) || [])];
  const {
    theme
  } = (0, _useNativeBase.useNativeBase)();
  const colorModeProps = (0, _colorMode.useColorMode)();
  const componentTheme = (0, _lodash.default)(theme, "components.".concat(component), {}); // STEP 1: combine default props and incoming props

  const incomingWithDefaultProps = (0, _lodash2.default)({}, componentTheme.defaultProps || {}, cleanIncomingProps); // STEP 2: flatten them

  let [flattenProps, specificityMap] = (0, _propsFlattenerTest.propsFlattener)({
    props: incomingWithDefaultProps,
    platform: _reactNative.Platform.OS,
    colormode: colorModeProps.colorMode,
    state: state || {},
    previouslyFlattenProps: {}
  }, 2); // STEP 2.5: resolving responsive props

  const responsiveProps = {};
  resolveResponsively.map(propsName => {
    if (flattenProps[propsName]) {
      // @ts-ignore
      responsiveProps[propsName] = flattenProps[propsName];
    }
  });
  const responsivelyResolvedProps = (0, _useBreakpointResolvedProps.useBreakpointResolvedProps)(responsiveProps);
  flattenProps = { ...flattenProps,
    ...responsivelyResolvedProps
  }; // STEP 3: Pass it to baseStyle, then variant and then size and resolve them.
  // NOTE: Resoloving baseStyle

  let componentBaseStyle = {},
      flattenBaseStyle,
      baseSpecificityMap;

  if (componentTheme.baseStyle) {
    componentBaseStyle = typeof componentTheme.baseStyle !== 'function' ? componentTheme.baseStyle : componentTheme.baseStyle({
      theme,
      ...flattenProps,
      ...colorModeProps
    });
    [flattenBaseStyle, baseSpecificityMap] = (0, _propsFlattenerTest.propsFlattener)({
      props: componentBaseStyle,
      platform: _reactNative.Platform.OS,
      colormode: colorModeProps.colorMode,
      state: state || {},
      currentSpecificityMap: specificityMap,
      previouslyFlattenProps: flattenProps
    }, 1);
  } // NOTE: Resolving variants


  const variant = flattenProps.variant;
  let componentVariantProps = {},
      flattenVariantStyle,
      variantSpecificityMap; // Extracting props from variant

  if (variant && componentTheme.variants && componentTheme.variants[variant]) {
    componentVariantProps = typeof componentTheme.variants[variant] !== 'function' ? componentTheme.variants[variant] : componentTheme.variants[variant]({
      theme,
      ...flattenProps,
      ...colorModeProps
    });
    [flattenVariantStyle, variantSpecificityMap] = (0, _propsFlattenerTest.propsFlattener)({
      props: componentVariantProps,
      platform: _reactNative.Platform.OS,
      colormode: colorModeProps.colorMode,
      state: state || {},
      currentSpecificityMap: baseSpecificityMap || specificityMap,
      // NOTE: Ideally flattenBaseStyle and flattenProps should be deeply merged to create previouslyFlattenProps.
      previouslyFlattenProps: flattenProps
    }, 1); // We remove variant from original props if we found it in the componentTheme
    //@ts-ignore

    flattenProps.variant = undefined;
  } // NOTE: Resolving size


  const size = flattenProps.size;
  let componentSizeProps = {},
      flattenSizeStyle,
      sizeSpecificityMap; // Extracting props from size

  if (size && componentTheme.sizes && componentTheme.sizes[size]) {
    // Type - sizes: {lg: 1}. Refer icon theme
    if (typeof componentTheme.sizes[size] === 'string' || typeof componentTheme.sizes[size] === 'number') {
      flattenProps.size = componentTheme.sizes[size]; //@ts-ignore
      // componentSizeProps.size = componentTheme.sizes[size];
    } // Type - sizes: (props) => ({lg: {px: 1}}). Refer heading theme
    else if (typeof componentTheme.sizes[size] === 'function') {
        flattenProps.size = undefined;
        componentSizeProps = componentTheme.sizes[size]({
          theme,
          ...flattenProps,
          ...colorModeProps
        });
      } // Type - sizes: {lg: {px: 1}}. Refer button theme
      else {
          flattenProps.size = undefined;
          componentSizeProps = componentTheme.sizes[size];
        }

    [flattenSizeStyle, sizeSpecificityMap] = (0, _propsFlattenerTest.propsFlattener)({
      props: componentSizeProps,
      platform: _reactNative.Platform.OS,
      colormode: colorModeProps.colorMode,
      state: state || {},
      currentSpecificityMap: variantSpecificityMap || baseSpecificityMap || specificityMap,
      previouslyFlattenProps: flattenProps
    }, 1);
  } // // STEP 4: merge


  const defaultStyles = (0, _lodash2.default)({}, flattenBaseStyle, flattenVariantStyle, flattenSizeStyle);

  for (const prop in defaultStyles) {
    delete flattenProps[prop];
  }

  const defaultSpecificity = (0, _lodash2.default)({}, specificityMap, baseSpecificityMap, variantSpecificityMap, sizeSpecificityMap);
  flattenProps = propsSpreader({ ...defaultStyles,
    ...flattenProps
  }, defaultSpecificity); // // STEP 5: linear Grad and contrastText

  let ignore = [];

  if ((_flattenProps$bg = flattenProps.bg) !== null && _flattenProps$bg !== void 0 && _flattenProps$bg.linearGradient || (_flattenProps$backgro = flattenProps.background) !== null && _flattenProps$backgro !== void 0 && _flattenProps$backgro.linearGradient || (_flattenProps$bgColor = flattenProps.bgColor) !== null && _flattenProps$bgColor !== void 0 && _flattenProps$bgColor.linearGradient || (_flattenProps$backgro2 = flattenProps.backgroundColor) !== null && _flattenProps$backgro2 !== void 0 && _flattenProps$backgro2.linearGradient) {
    var _flattenProps$backgro3, _flattenProps$bgColor2, _flattenProps$backgro4;

    let bgProp = 'bg';

    if ((_flattenProps$backgro3 = flattenProps.background) !== null && _flattenProps$backgro3 !== void 0 && _flattenProps$backgro3.linearGradient) {
      bgProp = 'background';
    } else if ((_flattenProps$bgColor2 = flattenProps.bgColor) !== null && _flattenProps$bgColor2 !== void 0 && _flattenProps$bgColor2.linearGradient) {
      bgProp = 'bgColor';
    } else if ((_flattenProps$backgro4 = flattenProps.backgroundColor) !== null && _flattenProps$backgro4 !== void 0 && _flattenProps$backgro4.linearGradient) {
      bgProp = 'backgroundColor';
    }

    flattenProps[bgProp].linearGradient.colors = flattenProps[bgProp].linearGradient.colors.map(color => {
      return (0, _lodash.default)(theme.colors, color, color);
    });
    ignore = ['bg', 'background', 'backgroundColor', 'bgColor'];
  } // // NOTE: seprating bg props when linearGardiant is available


  const [gradientProps] = (0, _tools.extractInObject)(flattenProps, ignore);
  const bgColor = (_ref = (_flattenProps$bg2 = flattenProps.bg) !== null && _flattenProps$bg2 !== void 0 ? _flattenProps$bg2 : flattenProps.backgroundColor) !== null && _ref !== void 0 ? _ref : flattenProps.bgColor;
  const contrastTextColor = (0, _useContrastText.useContrastText)(bgColor, (_flattenProps = flattenProps) === null || _flattenProps === void 0 ? void 0 : (_flattenProps$_text = _flattenProps._text) === null || _flattenProps$_text === void 0 ? void 0 : _flattenProps$_text.color);
  flattenProps._text = contrastTextColor && ((_flattenProps2 = flattenProps) === null || _flattenProps2 === void 0 ? void 0 : (_flattenProps2$_text = _flattenProps2._text) === null || _flattenProps2$_text === void 0 ? void 0 : _flattenProps2$_text.color) === undefined ? {
    color: contrastTextColor,
    ...flattenProps._text
  } : flattenProps._text;
  const resolvedProps = (0, _tools.omitUndefined)({ ...flattenProps,
    ...ignoredProps,
    ...gradientProps
  }); // STEP 6: Return
  // flattenProps = {};
  // propertyDepth = {};

  return resolvedProps;
}
//# sourceMappingURL=usePropsResolutionTest.js.map