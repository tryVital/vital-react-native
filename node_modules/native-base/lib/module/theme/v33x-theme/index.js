import base from './base';
import components from './components';
import * as tools from './tools'; //@ts-ignore

const config = {
  useSystemColorMode: false,
  // TODO: implement this
  initialColorMode: 'light',
  accessibleColors: false
};
const v33xTheme = { ...base,
  components,
  config
};
export { v33xTheme, tools as themeTools };
//# sourceMappingURL=index.js.map