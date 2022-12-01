import merge from 'lodash.merge';
import { useColorMode } from '../core/color-mode';
export const useColorModeProps = props => {
  const {
    _light,
    _dark,
    ...remainingProps
  } = props;
  const {
    colorMode
  } = useColorMode();

  const colorModeProps = () => {
    switch (colorMode) {
      case 'light':
        return _light;

      case 'dark':
        return _dark;

      default:
        return {};
    }
  };

  return merge(remainingProps, colorModeProps());
};
//# sourceMappingURL=useColorModeProps.js.map