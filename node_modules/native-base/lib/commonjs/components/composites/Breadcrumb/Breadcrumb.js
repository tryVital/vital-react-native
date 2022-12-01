"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Stack = require("../../primitives/Stack");

var _hooks = require("../../../hooks");

var _Pressable = require("../../primitives/Pressable");

var _usePropsResolution = require("../../../hooks/useThemeProps/usePropsResolution");

var _Text = _interopRequireDefault(require("../../primitives/Text"));

var _Icons = require("../../primitives/Icon/Icons");

var _useHasResponsiveProps = require("../../../hooks/useHasResponsiveProps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Breadcrumb = ({
  style,
  children,
  separator,
  _text,
  maxItems,
  _button,
  isCollapsed,
  onCollapseChange,
  ...props
}, ref) => {
  const textProps = { ..._text
  }; // Maintaining state to show all children on press of collapse button

  const [collapsed, setCollapsed] = (0, _hooks.useControllableState)({
    value: isCollapsed,
    defaultValue: false,
    onChange: value => {
      onCollapseChange && onCollapseChange(value);
    }
  });
  const {
    spacing,
    ...newProps
  } = (0, _usePropsResolution.usePropsResolution)('Breadcrumb', props);
  const separatorProps = {
    accessibilityRole: _reactNative.Platform.OS === 'web' ? 'presentation' : undefined
  };
  const separatorElement = separator ? typeof separator === 'string' ? /*#__PURE__*/_react.default.createElement(_Text.default, _extends({}, separatorProps, {
    mx: spacing
  }), separator) : /*#__PURE__*/_react.default.cloneElement(separator, {
    mx: spacing,
    ...separatorProps
  }) : /*#__PURE__*/_react.default.createElement(_Text.default, _extends({
    mx: spacing
  }, separatorProps), '/'); //TODO: refactor for responsive prop

  if ((0, _useHasResponsiveProps.useHasResponsiveProps)(props)) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement(_Stack.HStack, _extends({
    display: "flex",
    flexWrap: "wrap"
  }, newProps, {
    ref: ref,
    style: style // Custom Separator
    ,
    divider: separatorElement,
    space: spacing // @ts-ignore - Web only prop
    ,
    accessibilityRole: _reactNative.Platform.OS === 'web' ? 'navigation' : undefined,
    accessibilityLabel: "Breadcrumb"
  }), children && !children.length ? children : getBreadcrumbSeparator(children, textProps, maxItems, _button, collapsed, setCollapsed));
}; // Returns children to be rendered


const getBreadcrumbSeparator = (children, props, maxItems, _button, collapsed, setCollapsed) => {
  if (Array.isArray(children)) {
    if (children.length === 1) {
      return children;
    }

    let result = [];

    if (maxItems) {
      let buttonAdded = false;

      if (typeof maxItems == 'number') {
        // When MaxItems is a number
        if (children.length > 2 * maxItems) {
          for (let i = 0; i < children.length; i++) {
            if (i < maxItems || i >= children.length - maxItems) {
              result.push(children[i]);
            } else {
              if (!buttonAdded) {
                result.push( /*#__PURE__*/_react.default.createElement(CollapseButton, _extends({}, _button, {
                  setCollapsed: setCollapsed
                })));
                buttonAdded = true;
              }
            }
          }

          buttonAdded = false;
        }
      } // Whem maxItems is an array
      else if (typeof maxItems == 'object') {
          if (children.length > maxItems[0] + maxItems[1]) for (let i = 0; i < children.length; i++) {
            if (i < maxItems[0] || i >= children.length - maxItems[1]) {
              result.push(children[i]);
            } else {
              if (!buttonAdded) {
                // pushing Collapsible button as a child
                result.push( /*#__PURE__*/_react.default.createElement(CollapseButton, _extends({}, _button, {
                  setCollapsed: setCollapsed
                })));
                buttonAdded = true;
              }
            }
          }
          buttonAdded = false;
        }
    } else {
      result = children;
    }

    if (!collapsed) {
      result = children;
    }

    return result.map((child, index) => {
      return /*#__PURE__*/_react.default.cloneElement(child, {
        _text: { ...props
        },
        ...props,
        key: "breadcrumb-separator-".concat(index)
      });
    });
  } else {
    return children;
  }
}; // Collapse button


const CollapseButton = props => {
  const { ...remainingProps
  } = props;
  return /*#__PURE__*/_react.default.createElement(_Pressable.Pressable, _extends({}, remainingProps, {
    onPress: () => {
      props.setCollapsed(false);
    }
  }), /*#__PURE__*/_react.default.createElement(_Icons.ThreeDotsIcon, {
    size: 4
  }));
};

var _default = /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(Breadcrumb));

exports.default = _default;
//# sourceMappingURL=Breadcrumb.js.map