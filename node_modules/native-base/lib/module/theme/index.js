import base from './base';
import components from './components';
import * as tools from './tools';
const config = {
  useSystemColorMode: false,
  // TODO: implement this
  initialColorMode: 'light',
  accessibleColors: false
};
const theme = { ...base,
  components,
  config
};
export { theme, tools as themeTools };
export { getColor } from './styled-system';
export * from './v33x-theme';
//# sourceMappingURL=index.js.map