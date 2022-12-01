import { default as MenuMain } from './Menu';
import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';
import MenuItemOption from './MenuItemOption';
import MenuOptionGroup from './MenuOptionGroup';
let MenuTemp = MenuMain;
MenuTemp.Item = MenuItem;
MenuTemp.Group = MenuGroup;
MenuTemp.ItemOption = MenuItemOption;
MenuTemp.OptionGroup = MenuOptionGroup; // To add typings

const Menu = MenuTemp;
export { Menu };
//# sourceMappingURL=index.js.map