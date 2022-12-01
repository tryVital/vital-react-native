function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, memo, forwardRef, useCallback, useRef } from 'react';
import { Image as RNImage } from 'react-native';
import Text from '../Text';
import { usePropsResolution } from '../../../hooks/useThemeProps';
import { useHasResponsiveProps } from '../../../hooks/useHasResponsiveProps';
import { makeStyledComponent } from '../../../utils/styled';
const StyledImage = makeStyledComponent(RNImage);
const Image = /*#__PURE__*/memo( /*#__PURE__*/forwardRef((props, ref) => {
  const {
    source,
    src,
    fallbackElement,
    alt,
    fallbackSource,
    ignoreFallback,
    _alt,
    ...resolvedProps
  } = usePropsResolution('Image', props);
  const finalSource = useRef(null);
  const getSource = useCallback(() => {
    if (source) {
      finalSource.current = source;
    } else if (src) {
      finalSource.current = {
        uri: src
      };
    }

    return finalSource.current; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source === null || source === void 0 ? void 0 : source.uri, src]);
  const [renderedSource, setSource] = useState(getSource());
  const [alternate, setAlternate] = useState(false);
  const [fallbackSourceFlag, setfallbackSourceFlag] = useState(true);
  React.useEffect(() => {
    setSource(getSource());
    return () => {
      finalSource.current = null;
    };
  }, [source === null || source === void 0 ? void 0 : source.uri, src, getSource]);
  const onImageLoadError = useCallback(event => {
    props.onError && props.onError(event);
    console.warn(event.nativeEvent.error);

    if (!ignoreFallback && fallbackSource && fallbackSource !== renderedSource && fallbackSourceFlag) {
      setfallbackSourceFlag(false);
      setSource(fallbackSource);
    } else {
      setAlternate(true);
    }
  }, [fallbackSource, fallbackSourceFlag, ignoreFallback, props, renderedSource]); //TODO: refactor for responsive prop

  if (useHasResponsiveProps(props)) {
    return null;
  }

  if (typeof alt !== 'string') {
    console.warn('Please pass alt prop to Image component');
  }

  if (alternate) {
    if (fallbackElement) {
      if ( /*#__PURE__*/React.isValidElement(fallbackElement)) {
        return fallbackElement;
      }
    } else return /*#__PURE__*/React.createElement(Text, _alt, alt);
  }

  return /*#__PURE__*/React.createElement(StyledImage, _extends({
    source: renderedSource,
    accessibilityLabel: alt,
    alt: alt
  }, resolvedProps, {
    onError: onImageLoadError,
    ref: ref
  }));
}));
const ImageWithStatics = { ...Image,
  //@ts-ignore
  getSize: RNImage.getSize,
  prefetch: RNImage.prefetch,
  queryCache: RNImage.queryCache
};
export default ImageWithStatics;
//# sourceMappingURL=index.js.map