import { useWindowDimensions } from 'react-native';
import isNil from 'lodash.isnil';
export function useMediaQuery(query) {
  const dims = useWindowDimensions();
  const height = dims === null || dims === void 0 ? void 0 : dims.height;
  const width = dims === null || dims === void 0 ? void 0 : dims.width;
  return iterateQuery(query, height, width);
}

function queryResolver(query, width, height) {
  for (const queryKey in query) {
    if (!calculateQuery(queryKey, query[queryKey], height, width)) {
      return false;
    }
  }

  return true;
}

function iterateQuery(query, height, width) {
  const queryResults = [];

  if (Array.isArray(query)) {
    query.forEach(subQuery => {
      queryResults.push(queryResolver(subQuery, width, height));
    });
  } else {
    queryResults.push(queryResolver(query, width, height));
  }

  return queryResults;
}

function calculateQuery(key, val, height, width) {
  let retval;

  if (isNil(width) || isNil(height) || isNil(val)) {
    return;
  }

  switch (key) {
    case 'maxWidth':
      retval = !isNil(val) ? width <= val : undefined;
      break;

    case 'minWidth':
      retval = !isNil(val) ? width >= val : undefined;
      break;

    case 'maxHeight':
      retval = !isNil(val) ? height <= val : undefined;
      break;

    case 'minHeight':
      retval = !isNil(val) ? height >= val : undefined;
      break;

    case 'orientation':
      if (!isNil(val)) {
        if (width > height) {
          retval = val === 'landscape';
        } else {
          retval = val === 'portrait';
        }
      }

      break;

    default:
      break;
  }

  return retval;
}
//# sourceMappingURL=useMediaQuery.js.map