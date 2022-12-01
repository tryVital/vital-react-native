"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SliderContext", {
  enumerable: true,
  get: function () {
    return _Context.SliderContext;
  }
});
exports.Slider = void 0;

var _Slider = _interopRequireDefault(require("./Slider"));

var _SliderThumb = _interopRequireDefault(require("./SliderThumb"));

var _SliderTrack = _interopRequireDefault(require("./SliderTrack"));

var _SliderFilledTrack = _interopRequireDefault(require("./SliderFilledTrack"));

var _Context = require("./Context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SliderTemp = _Slider.default;
SliderTemp.Thumb = _SliderThumb.default;
SliderTemp.Track = _SliderTrack.default;
SliderTemp.FilledTrack = _SliderFilledTrack.default; // To add typings

const Slider = SliderTemp;
exports.Slider = Slider;
//# sourceMappingURL=index.js.map