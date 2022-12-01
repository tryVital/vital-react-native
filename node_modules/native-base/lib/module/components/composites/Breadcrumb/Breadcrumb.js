function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { Platform } from 'react-native';
import { HStack } from '../../primitives/Stack';
import { useControllableState } from '../../../hooks';
import { Pressable } from '../../primitives/Pressable';
import { usePropsResolution } from '../../../hooks/useThemeProps/usePropsResolution';
import Text from '../../primitives/Text';
import { ThreeDotsIcon } from '../../primitives/Icon/Icons';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

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

  const [collapsed, setCollapsed] = useControllableState({
    value: isCollapsed,
    defaultValue: false,
    onChange: value => {
      onCollapseChange && onCollapseChange(value);
    }
  });
  const {
    spacing,
    ...newProps
  } = usePropsResolution('Breadcrumb', props);
  const separatorProps = {
    accessibilityRole: Platform.OS === 'web' ? 'presentation' : undefined
  };
  const separatorElement = separator ? typeof separator === 'string' ? /*#__PURE__*/React.createElement(Text, _extends({}, separatorProps, {
    mx: spacing
  }), separator) : /*#__PURE__*/React.cloneElement(separator, {
    mx: spacing,
    ...separatorProps
  }) : /*#__PURE__*/React.createElement(Text, _extends({
    mx: spacing
  }, separatorProps), '/'); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  return /*#__PURE__*/React.createElement(HStack, _extends({
    display: "flex",
    flexWrap: "wrap"
  }, newProps, {
    ref: ref,
    style: style // Custom Separator
    ,
    divider: separatorElement,
    space: spacing // @ts-ignore - Web only prop
    ,
    accessibilityRole: Platform.OS === 'web' ? 'navigation' : undefined,
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
                result.push( /*#__PURE__*/React.createElement(CollapseButton, _extends({}, _button, {
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
                result.push( /*#__PURE__*/React.createElement(CollapseButton, _extends({}, _button, {
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
      return /*#__PURE__*/React.cloneElement(child, {
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
  return /*#__PURE__*/React.createElement(Pressable, _extends({}, remainingProps, {
    onPress: () => {
      props.setCollapsed(false);
    }
  }), /*#__PURE__*/React.createElement(ThreeDotsIcon, {
    size: 4
  }));
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(Breadcrumb));
//# sourceMappingURL=Breadcrumb.js.map