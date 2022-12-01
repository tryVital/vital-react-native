function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { forwardRef, memo } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { default as Box } from '../../primitives/Box';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { usePropsResolution } from '../../../hooks';
const AspectView = /*#__PURE__*/forwardRef((props, ref) => {
  const [layout, setLayout] = React.useState();
  const aspectViewStyle = [StyleSheet.flatten(props.style) || {}];

  if (layout) {
    // @ts-ignore
    let {
      width = 0,
      height = 0
    } = layout;

    if (width === 0) {
      aspectViewStyle.push({
        width: height * props.aspectRatio,
        height
      });
    } else {
      aspectViewStyle.push({
        width,
        height: width / props.aspectRatio
      });
    }
  }

  return /*#__PURE__*/React.createElement(Box, _extends({
    ref: ref
  }, props, {
    style: aspectViewStyle,
    onLayout: ({
      nativeEvent: {
        layout: inLayout
      }
    }) => setLayout(inLayout)
  }));
});

const AspectRatio = (props, ref) => {
  var _children$props;

  const {
    ratio,
    children = /*#__PURE__*/React.createElement(React.Fragment, null),
    ...resolvedProps
  } = usePropsResolution('AspectRatio', props, {}, {
    resolveResponsively: ['ratio']
  });
  let computedStyle = resolvedProps.style;
  const newChildWithProps = /*#__PURE__*/React.cloneElement(children, { ...(children === null || children === void 0 ? void 0 : children.props),
    style: StyleSheet.absoluteFillObject
  }, children === null || children === void 0 ? void 0 : (_children$props = children.props) === null || _children$props === void 0 ? void 0 : _children$props.children); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(resolvedProps)) {
    return null;
  } // DOC:  It uses a aspectRatio property of React Native and manually calculate on Web


  if (Platform.OS === 'web') {
    return /*#__PURE__*/React.createElement(AspectView, _extends({
      aspectRatio: ratio
    }, resolvedProps, {
      ref: ref
    }), newChildWithProps);
  } else {
    computedStyle = StyleSheet.flatten([{
      style: resolvedProps.style
    }, {
      aspectRatio: ratio
    }]);
    return /*#__PURE__*/React.createElement(Box, _extends({}, resolvedProps, {
      style: computedStyle,
      ref: ref
    }), newChildWithProps);
  }
};

export default /*#__PURE__*/memo( /*#__PURE__*/forwardRef(AspectRatio));
//# sourceMappingURL=index.js.map