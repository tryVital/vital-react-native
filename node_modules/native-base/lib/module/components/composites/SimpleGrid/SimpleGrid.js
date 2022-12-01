function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { Box, HStack, VStack } from '../../primitives';
// const isDebug = process.env.NODE_ENV !== 'production';
import { useThemeProps } from '../../../hooks/useThemeProps';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
const DEBUG_STYLES = false ? {
  rows: {
    borderWidth: '1px'
  },
  cols: {
    borderWidth: '1px'
  }
} : {
  rows: {},
  cols: {}
};

const SimpleGrid = (props, ref) => {
  const {
    columns,
    space,
    spacingX,
    spacingY,
    minChildWidth,
    children,
    ...remainingProps
  } = useThemeProps('SimpleGrid', props); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }

  let cellSpacing = space !== null && space !== void 0 ? space : 0;
  let cellSpacingX = spacingX !== null && spacingX !== void 0 ? spacingX : cellSpacing;
  let cellSpacingY = spacingY !== null && spacingY !== void 0 ? spacingY : cellSpacing;
  const childrenArray = React.Children.toArray(children);

  if (columns) {
    let rowSlices = [];

    for (let i = 0; i < childrenArray.length; i = i + columns) {
      rowSlices.push(childrenArray.slice(i, i + columns));
    }

    return /*#__PURE__*/React.createElement(VStack, _extends({}, DEBUG_STYLES.rows, {
      space: cellSpacingY
    }, remainingProps, {
      ref: ref
    }), rowSlices.map((row, rowIndex) => {
      return /*#__PURE__*/React.createElement(HStack, {
        space: cellSpacingX,
        key: rowIndex
      }, row.map(col => {
        return /*#__PURE__*/React.createElement(Box, _extends({}, DEBUG_STYLES.cols, {
          key: col.key
        }), col);
      }));
    }));
  } // Needs more work for empty spacing i.e. auto-fit. Current workaround is to use wrap and let the columns be created dynamically
  // https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/
  else if (minChildWidth) {
      return /*#__PURE__*/React.createElement(Box, _extends({
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
      }, remainingProps, {
        ref: ref
      }), childrenArray.map(col => {
        return /*#__PURE__*/React.createElement(Box, _extends({}, DEBUG_STYLES.cols, {
          mx: cellSpacingX,
          my: cellSpacingY,
          key: col.key,
          minWidth: minChildWidth
        }), col);
      }));
    }

  return /*#__PURE__*/React.createElement(React.Fragment, null);
};

export default /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(SimpleGrid));
//# sourceMappingURL=SimpleGrid.js.map