import BreadcrumbMain from './Breadcrumb';
import BreadcrumbLink from './BreadcrumbLink';
import BreadcrumbItem from './BreadcrumbItem';
import BreadcrumbText from './BreadcrumbText';
import BreadcrumbIcon from './BreadcrumbIcon';
let BreadcrumbTemp = BreadcrumbMain;
BreadcrumbTemp.Item = BreadcrumbItem;
BreadcrumbTemp.Link = BreadcrumbLink;
BreadcrumbTemp.Text = BreadcrumbText;
BreadcrumbTemp.Icon = BreadcrumbIcon; // To add typings

const Breadcrumb = BreadcrumbTemp;
export { Breadcrumb };
//# sourceMappingURL=index.js.map