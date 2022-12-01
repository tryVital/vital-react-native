"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mode = mode;
exports.randomColor = randomColor;
exports.isLight = exports.isDark = exports.tone = exports.getColor = exports.transparentize = void 0;

var _lodash = _interopRequireDefault(require("lodash.get"));

var _lodash2 = _interopRequireDefault(require("lodash.isempty"));

var _tinycolor = _interopRequireDefault(require("tinycolor2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mode(light, dark) {
  return props => props.colorMode === 'dark' ? dark : light;
}

const transparentize = (color, opacity) => theme => {
  const raw = getColor(theme, color);
  return (0, _tinycolor.default)(raw).setAlpha(opacity).toRgbString();
};

exports.transparentize = transparentize;

const getColor = (theme, color, fallback) => {
  const hex = (0, _lodash.default)(theme, "colors.".concat(color), color);
  const isValid = (0, _tinycolor.default)(hex).isValid();
  return isValid ? hex : fallback;
};

exports.getColor = getColor;

const tone = color => theme => {
  const hex = getColor(theme, color);
  const isDark = (0, _tinycolor.default)(hex).isDark();
  return isDark ? 'dark' : 'light';
};

exports.tone = tone;

const isDark = color => theme => tone(color)(theme) === 'dark';

exports.isDark = isDark;

const isLight = color => theme => tone(color)(theme) === 'light';

exports.isLight = isLight;

function randomColor(opts) {
  const fallback = _tinycolor.default.random().toHexString();

  if (!opts || (0, _lodash2.default)(opts)) {
    return fallback;
  }

  if (opts.string && opts.colors) {
    return randomColorFromList(opts.string, opts.colors);
  }

  if (opts.string && !opts.colors) {
    return randomColorFromString(opts.string);
  }

  if (opts.colors && !opts.string) {
    return randomFromList(opts.colors);
  }

  return fallback;
}

function randomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomColorFromList(str, list) {
  let index = 0;
  if (str.length === 0) return list[0];

  for (let i = 0; i < str.length; i++) {
    index = str.charCodeAt(i) + ((index << 5) - index);
    index = index & index;
  }

  index = (index % list.length + list.length) % list.length;
  return list[index];
}

function randomColorFromString(str) {
  let hash = 0;
  if (str.length === 0) return hash.toString();

  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  let color = '#';

  for (let j = 0; j < 3; j++) {
    const value = hash >> j * 8 & 255;
    color += ('00' + value.toString(16)).substr(-2);
  }

  return color;
}
//# sourceMappingURL=colors.js.map