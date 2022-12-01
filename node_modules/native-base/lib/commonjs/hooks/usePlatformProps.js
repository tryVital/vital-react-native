"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePlatformProps = void 0;

var _lodash = _interopRequireDefault(require("lodash.merge"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usePlatformProps = props => {
  const {
    _web,
    _ios,
    _android,
    ...remainingProps
  } = props;

  const platformProps = () => {
    switch (_reactNative.Platform.OS) {
      case 'web':
        return _web;

      case 'ios':
        return _ios;

      case 'android':
        return _android;

      default:
        return {};
    }
  };

  return (0, _lodash.default)(remainingProps, platformProps());
};

exports.usePlatformProps = usePlatformProps;
//# sourceMappingURL=usePlatformProps.js.map