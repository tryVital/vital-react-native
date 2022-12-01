import AvatarDefault from './Avatar';
import AvatarBadge from './Badge';
import AvatarGroup from './Group';
let AvatarTemp = AvatarDefault;
AvatarTemp.Badge = AvatarBadge;
AvatarTemp.Group = AvatarGroup; // To add typings

const Avatar = AvatarTemp;
export { Avatar };
//# sourceMappingURL=index.js.map