import AppBarMain from './AppBar';
import AppBarLeft from './AppBarLeft';
import AppBarRight from './AppBarRight';
import AppBarContent from './AppBarContent';
const AppBarTemp = AppBarMain;
AppBarTemp.Left = AppBarLeft;
AppBarTemp.Right = AppBarRight;
AppBarTemp.Content = AppBarContent;
const AppBar = AppBarTemp;
export { AppBar };
//# sourceMappingURL=index.js.map