function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/** * @jest-environment jsdom */
//@ts-nocheck
import React from 'react';
import { render } from '@testing-library/react-native';
import Text from '../../Text';
import { NativeBaseProvider } from '../../../../core/NativeBaseProvider';
import { theme as defaultTheme } from '../../../../theme';
import { Platform } from 'react-native';
jest.useFakeTimers();
const theme = { ...defaultTheme,
  fontConfig: {
    Roboto: {
      100: 'Roboto-Light',
      200: 'Roboto-Light',
      300: 'Roboto-Light',
      400: {
        normal: 'Roboto-Regular',
        italic: 'Roboto-Italic'
      },
      500: 'Roboto-Medium',
      600: 'Roboto-Medium',
      700: {
        normal: 'Roboto-Bold',
        italic: 'Roboto-BoldItalic'
      },
      800: 'Roboto-Bold',
      900: 'Roboto-Black'
    }
  },
  fonts: { ...defaultTheme.fonts,
    heading: 'Roboto',
    body: 'Roboto'
  }
};

const Provider = props => {
  return /*#__PURE__*/React.createElement(NativeBaseProvider, _extends({
    theme: theme
  }, props, {
    initialWindowMetrics: {
      frame: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      },
      insets: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }
    }
  }));
};

describe('Text component', () => {
  it('resolves default custom fonts', () => {
    const {
      getByTestId
    } = render( /*#__PURE__*/React.createElement(Provider, null, /*#__PURE__*/React.createElement(Text, {
      testID: "my-text"
    }, "hello world")));
    const text = getByTestId('my-text');
    expect(text.props.style.fontFamily).toBe('Roboto-Regular');
  });
  it('resolves custom font variants', () => {
    const {
      getByTestId
    } = render( /*#__PURE__*/React.createElement(Provider, null, /*#__PURE__*/React.createElement(Text, {
      testID: "my-text",
      fontStyle: "italic"
    }, "hello world")));
    const text = getByTestId('my-text');
    expect(text.props.style.fontFamily).toBe('Roboto-Italic');
  });
  it('resolves to bold italic font', () => {
    const {
      getByTestId
    } = render( /*#__PURE__*/React.createElement(Provider, null, /*#__PURE__*/React.createElement(Text, {
      testID: "my-text",
      fontWeight: "bold",
      fontStyle: "italic"
    }, "hello world")));
    const text = getByTestId('my-text');
    expect(text.props.style.fontFamily).toBe('Roboto-BoldItalic');
  });
  it('resolves to medium font when fontWeight is 500', () => {
    const {
      getByTestId
    } = render( /*#__PURE__*/React.createElement(Provider, null, /*#__PURE__*/React.createElement(Text, {
      testID: "my-text",
      fontWeight: 500
    }, "hello world")));
    const text = getByTestId('my-text');
    expect(text.props.style.fontFamily).toBe('Roboto-Medium');
  });
  it('resolves to medium font when fontWeight is medium', () => {
    const {
      getByTestId
    } = render( /*#__PURE__*/React.createElement(Provider, null, /*#__PURE__*/React.createElement(Text, {
      testID: "my-text",
      fontWeight: 'medium'
    }, "hello world")));
    const text = getByTestId('my-text');
    expect(text.props.style.fontFamily).toBe('Roboto-Medium');
  });
  it('respects fontFamily property', () => {
    const {
      getByTestId
    } = render( /*#__PURE__*/React.createElement(Provider, null, /*#__PURE__*/React.createElement(Text, {
      testID: "my-text",
      fontFamily: "Merriweather-Italic"
    }, "hello world")));
    const text = getByTestId('my-text');
    expect(text.props.style.fontFamily).toBe('Merriweather-Italic');
  });
  it("doesn't break if custom font is not specified", () => {
    const newTheme = JSON.parse(JSON.stringify(defaultTheme));
    delete newTheme.fontConfig;
    const {
      getByTestId
    } = render( /*#__PURE__*/React.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/React.createElement(Text, {
      testID: "my-text",
      fontWeight: 400
    }, "hello world")));
    const text = getByTestId('my-text');
    expect(text.props.style.fontFamily).toBe(undefined);
  });
  it("doesn't pass fontWeight and fontStyle if a custom fontFamily is resolved", () => {
    const {
      getByTestId
    } = render( /*#__PURE__*/React.createElement(Provider, null, /*#__PURE__*/React.createElement(Text, {
      testID: "my-text",
      fontWeight: 400
    }, "hello world")));
    const text = getByTestId('my-text');
    expect(text.props.style.fontWeight).toBe(undefined);
    expect(text.props.style.fontStyle).toBe(undefined);
    expect(text.props.style.fontFamily).toBe('Roboto-Regular');
  });
  it('tests lineHeight from token in text ', () => {
    const {
      getByTestId
    } = render( /*#__PURE__*/React.createElement(Provider, null, /*#__PURE__*/React.createElement(Text, {
      lineHeight: "md",
      testID: "test"
    }, "This is a text")));
    const text = getByTestId('test');
    expect(text.props.style.lineHeight).toBe(defaultTheme.fontSizes.sm * parseFloat(defaultTheme.lineHeights.md));
  });
  it('tests absolute lineHeight in text ', () => {
    const {
      getByTestId
    } = render( /*#__PURE__*/React.createElement(Provider, null, /*#__PURE__*/React.createElement(Text, {
      lineHeight: 5,
      testID: "test"
    }, "This is a text")));
    const text = getByTestId('test');
    expect(text.props.style.lineHeight).toBe(5);
  });
  it('tests em non token lineHeight in text ', () => {
    const {
      getByTestId
    } = render( /*#__PURE__*/React.createElement(Provider, null, /*#__PURE__*/React.createElement(Text, {
      lineHeight: "13em",
      testID: "test"
    }, "This is a text")));
    const text = getByTestId('test');
    expect(text.props.style.lineHeight).toBe(defaultTheme.fontSizes.sm * 13);
  });
  it('tests letterSpacing from token in text ', () => {
    const {
      getByTestId
    } = render( /*#__PURE__*/React.createElement(Provider, null, /*#__PURE__*/React.createElement(Text, {
      letterSpacing: "2xl",
      testID: "test"
    }, "This is a text")));
    const text = getByTestId('test');
    expect(text.props.style.letterSpacing).toBe(defaultTheme.fontSizes.sm * parseFloat(defaultTheme.letterSpacings['2xl']));
  });
  it('tests letterSpacing in em from token in text ', () => {
    Platform.OS = 'web';

    try {
      render( /*#__PURE__*/React.createElement(Provider, null, /*#__PURE__*/React.createElement(Text, {
        letterSpacing: "2xl",
        testID: "test"
      }, "This is a text")));
    } catch (e) {
      expect(e.message).toContain("\"letterSpacing\": \"0.1em\"");
    } finally {
      Platform.OS = 'ios';
    }
  });
  it('tests lineHeight and letterSpacing in px', () => {
    const {
      getByTestId
    } = render( /*#__PURE__*/React.createElement(Provider, null, /*#__PURE__*/React.createElement(Text, {
      lineHeight: "24px",
      letterSpacing: "12px",
      testID: "test"
    }, "This is a text")));
    const text = getByTestId('test');
    expect(text.props.style.lineHeight).toBe(24);
    expect(text.props.style.letterSpacing).toBe(12);
  });
});
//# sourceMappingURL=Text.test.js.map