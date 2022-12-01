import { useMemo } from 'react'; //@ts-ignore

import hash from 'stable-hash';
export function useStableMemo(factory, deps) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(factory, [hash(deps)]);
}
//# sourceMappingURL=useStableMemo.js.map