"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterShadowProps = void 0;

var _tools = require("./../theme/tools/");

var _lodash = _interopRequireDefault(require("lodash.isempty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const filterShadowProps = (props, ignoredProps, OS) => {
  var _ignoredProps$style;

  if (OS !== 'web') {
    return { ...ignoredProps,
      ...props
    };
  }

  let style = (_ignoredProps$style = ignoredProps.style) !== null && _ignoredProps$style !== void 0 ? _ignoredProps$style : {};
  let [shadowProps, remainingProps] = (0, _tools.extractInObject)(props, ['shadowColor', 'shadowOffset', 'shadowOpacity', 'shadowRadius']);

  if (!(0, _lodash.default)(shadowProps)) {
    style = { ...style,
      ...shadowProps
    };
  }

  return { ...remainingProps,
    ...ignoredProps,
    style
  };
};

exports.filterShadowProps = filterShadowProps;
//# sourceMappingURL=filterShadowProps.js.map