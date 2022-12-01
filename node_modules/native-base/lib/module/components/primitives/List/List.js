function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { memo, forwardRef } from 'react';
import { VStack } from '../Stack';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';

const List = ({
  children,
  divider,
  ...props
}, ref) => {
  const {
    _text,
    _hover,
    _focus,
    _pressed,
    ...resolvedProps
  } = usePropsResolution('List', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  } // add props to children


  children = React.Children.map(children, (child, ind) => {
    var _child$props, _child$props2, _child$props3, _child$props4;

    return /*#__PURE__*/React.cloneElement(child, {
      index: ind,
      _text: { ..._text,
        ...((_child$props = child.props) === null || _child$props === void 0 ? void 0 : _child$props._text)
      },
      _hover: { ..._hover,
        ...((_child$props2 = child.props) === null || _child$props2 === void 0 ? void 0 : _child$props2._hover)
      },
      _focus: { ..._focus,
        ...((_child$props3 = child.props) === null || _child$props3 === void 0 ? void 0 : _child$props3._focus)
      },
      _pressed: { ..._pressed,
        ...((_child$props4 = child.props) === null || _child$props4 === void 0 ? void 0 : _child$props4._pressed)
      }
    });
  });
  return /*#__PURE__*/React.createElement(VStack, _extends({
    divider: divider,
    ref: ref
  }, resolvedProps), children);
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(List));
//# sourceMappingURL=List.js.map