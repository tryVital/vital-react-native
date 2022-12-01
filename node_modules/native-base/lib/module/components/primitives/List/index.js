import ListDefault from './List';
import ListItem from './ListItem';
import ListIcon from './ListIcon';
import ListOrdered from './Ordered';
import ListUnordered from './Unordered';
let ListTemp = ListDefault;
ListTemp.Item = ListItem;
ListTemp.Icon = ListIcon;
ListTemp.Ordered = ListOrdered;
ListTemp.Unordered = ListUnordered; // To add typings

const List = ListTemp;
export { List };
//# sourceMappingURL=index.js.map