import get from 'lodash.get';
import omit from 'lodash.omit';
import { useWindowDimensions, Platform } from 'react-native';
import { useNativeBase } from './../useNativeBase';
import { omitUndefined, extractInObject } from './../../theme/tools/';
import { filterShadowProps } from './../../utils/filterShadowProps';
import { calculateProps } from './utils';

const filterAndCalculateProps = (theme, colorModeProps, componentTheme, propsReceived, windowWidth) => {
  // Extracting out children and style, as they do not contribute in props calculation
  // This is done as these props are passed as it is later in the development
  // Required as some of these will trigger cyclic computation which may lead to error
  let [ignoredProps, props] = extractInObject(propsReceived, ['children', 'style', 'onPress', 'icon', 'onOpen', 'onClose']);
  let newProps = calculateProps(theme, colorModeProps, componentTheme, props, windowWidth);
  let mergedProps = filterShadowProps(newProps, ignoredProps, Platform.OS);
  return omitUndefined(mergedProps);
};

export function useThemeProps(component, propsReceived) {
  var _useWindowDimensions;

  const {
    theme,
    ...colorModeProps
  } = useNativeBase(); // console.log('THEME = ', theme);

  const componentTheme = get(theme, "components.".concat(component)); // console.log('COMPONENT THEME = ', componentTheme);

  const windowWidth = (_useWindowDimensions = useWindowDimensions()) === null || _useWindowDimensions === void 0 ? void 0 : _useWindowDimensions.width; // To pass the component theme props and component props seperately

  return filterAndCalculateProps(omit(theme, ['components']), colorModeProps, componentTheme, propsReceived, windowWidth);
}
//# sourceMappingURL=useProps.js.map