import SliderMain from './Slider';
import SliderThumb from './SliderThumb';
import SliderTrack from './SliderTrack';
import SliderFilledTrack from './SliderFilledTrack';
const SliderTemp = SliderMain;
SliderTemp.Thumb = SliderThumb;
SliderTemp.Track = SliderTrack;
SliderTemp.FilledTrack = SliderFilledTrack; // To add typings

const Slider = SliderTemp;
export { Slider };
export { SliderContext } from './Context';
//# sourceMappingURL=index.js.map