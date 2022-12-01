import { useScreenReaderEnabled } from '../../../hooks';
export function VisuallyHidden({
  children
}) {
  const screenReaderEnabled = useScreenReaderEnabled();
  return screenReaderEnabled ? children : null;
}
//# sourceMappingURL=index.js.map