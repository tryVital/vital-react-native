"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIcon = void 0;

var _react = _interopRequireWildcard(require("react"));

var _SVGIcon = _interopRequireDefault(require("./SVGIcon"));

var _nbSvg = require("./nbSvg");

var _lodash = _interopRequireDefault(require("lodash.isempty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const createIcon = ({
  path,
  d,
  ...initialProps
}) => {
  const createdIcon = (props, ref) => {
    let children = path;

    if (d && (!path || (0, _lodash.default)(path))) {
      children = /*#__PURE__*/_react.default.createElement(_nbSvg.Path, {
        fill: "currentColor",
        d: d
      });
    }

    return /*#__PURE__*/_react.default.createElement(_SVGIcon.default, _extends({
      children: children
    }, initialProps, props, {
      ref: ref
    }));
  };

  return /*#__PURE__*/(0, _react.memo)( /*#__PURE__*/(0, _react.forwardRef)(createdIcon));
};

exports.createIcon = createIcon;
//# sourceMappingURL=createIcon.js.map