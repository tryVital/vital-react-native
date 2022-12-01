"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Box = _interopRequireDefault(require("../Box"));

var _useThemeProps = require("../../../hooks/useThemeProps");

var _utils = require("../../../utils");

var _Pressable = require("../Pressable");

var _tools = require("../../../theme/tools");

var _Pressable2 = require("../../primitives/Pressable/Pressable");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ListItem = ({
  children,
  ...props
}, ref) => {
  const {
    hoverProps,
    isHovered
  } = (0, _Pressable2.useHover)();
  const {
    pressableProps,
    isPressed
  } = (0, _Pressable2.useIsPressed)();
  const {
    focusProps,
    isFocused
  } = (0, _Pressable2.useFocus)();
  const {
    index,
    start,
    unordered,
    ul,
    ordered,
    ol,
    _text,
    borderTopWidth,
    onPressIn,
    onPressOut,
    onHoverIn,
    onHoverOut,
    onFocus,
    onBlur,
    ...resolvedProps
  } = (0, _useThemeProps.usePropsResolution)('ListItem', props, {
    isHovered,
    isPressed,
    isFocused
  });

  const _ref = _react.default.useRef(null); // const { isHovered } = useHover({}, _ref);
  //TODO: refactor for responsive prop


  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  } // Extracting Pressable Props from resolvedProps


  const [pressableComponentProps, nonPressableProps] = (0, _tools.extractInObject)(resolvedProps, ['onPress', 'unstable_pressDelay', 'android_ripple', 'android_disableSound', 'delayLongPress', 'hitSlop', 'disabled', 'onLongPress', 'onPressIn', 'onPressOut', 'pressRetentionOffset', 'testOnly_pressed', 'onHoverIn', 'onHoverOut', 'onFocus', 'onBlur', '_pressed', '_focus']);
  return Object.keys(pressableComponentProps).length !== 0 ?
  /*#__PURE__*/
  // Checking if any Pressable Props present
  _react.default.createElement(_Pressable.Pressable, _extends({
    accessibilityRole: "button",
    accessibilityLabel: "List-Item-".concat(index + start),
    flexDirection: "row",
    alignItems: "center"
  }, resolvedProps, {
    onPressIn: (0, _utils.composeEventHandlers)(onPressIn, pressableProps.onPressIn),
    onPressOut: (0, _utils.composeEventHandlers)(onPressOut, pressableProps.onPressOut) // @ts-ignore - web only
    ,
    onHoverIn: (0, _utils.composeEventHandlers)(onHoverIn, hoverProps.onHoverIn) // @ts-ignore - web only
    ,
    onHoverOut: (0, _utils.composeEventHandlers)(onHoverOut, hoverProps.onHoverOut) // @ts-ignore - web only
    ,
    onFocus: (0, _utils.composeEventHandlers)((0, _utils.composeEventHandlers)(onFocus, focusProps.onFocus) // focusRingProps.onFocu
    ) // @ts-ignore - web only
    ,
    onBlur: (0, _utils.composeEventHandlers)((0, _utils.composeEventHandlers)(onBlur, focusProps.onBlur) // focusRingProps.onBlur
    ),
    borderTopWidth: index ? borderTopWidth : 0,
    ref: ref
  }), /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: "row",
    alignItems: "center",
    pl: 2
  }, ul || unordered ?
  /*#__PURE__*/
  //Adding disc in front of ListItem
  _react.default.createElement(_Box.default, {
    style: {
      transform: [{
        scale: 1.5
      }]
    },
    mr: 2 // _text={{
    //   fontWeight: 'bold',
    //   ..._text,
    //   ...hoverTextProps,
    //   ...focusTextProps,
    //   ...pressedTextProps,
    // }}

  }, "\u2022") : null, ol || ordered ?
  /*#__PURE__*/
  //Adding index number in front of ListItem
  _react.default.createElement(_Box.default, {
    mr: 2 // _text={{
    //   fontWeight: 'bold',
    //   ..._text,
    //   ...hoverTextProps,
    //   ...focusTextProps,
    //   ...pressedTextProps,
    // }}

  }, index + start + '.') : null), /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: "row",
    alignItems: "center" // _text={{
    //   ..._text,
    //   ...hoverTextProps,
    //   ...focusTextProps,
    //   ...pressedTextProps,
    // }}

  }, children))) :
  /*#__PURE__*/
  // If no Pressable Props passed by user render Box instead of Pressable
  _react.default.createElement(_Box.default, _extends({
    accessibilityRole: "text",
    accessibilityLabel: "List-Item-".concat(index + start),
    flexDirection: "row",
    alignItems: "center"
  }, nonPressableProps, {
    borderTopWidth: index ? borderTopWidth : 0,
    ref: (0, _utils.mergeRefs)([ref, _ref])
  }, isHovered && resolvedProps._hover, isPressed && resolvedProps._pressed, isFocused && resolvedProps._focus), /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: "row",
    alignItems: "center",
    pl: 2
  }, ul || unordered ?
  /*#__PURE__*/
  //Adding disc in front of ListItem
  _react.default.createElement(_Box.default, {
    style: {
      transform: [{
        scale: 1.5
      }]
    },
    mr: 2,
    _text: {
      fontWeight: 'bold',
      ..._text
    }
  }, "\u2022") : null, ol || ordered ?
  /*#__PURE__*/
  //Adding index number in front of ListItem
  _react.default.createElement(_Box.default, {
    mr: 2,
    _text: {
      fontWeight: 'bold',
      ..._text
    }
  }, index + start + '.') : null), /*#__PURE__*/_react.default.createElement(_Box.default, {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    _text: _text // ...(isHovered && _hover?._text && { ..._hover._text }),

  }, children));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(ListItem));

exports.default = _default;
//# sourceMappingURL=ListItem.js.map