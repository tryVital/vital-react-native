"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("@testing-library/react-native");

var _Text = _interopRequireDefault(require("../../Text"));

var _NativeBaseProvider = require("../../../../core/NativeBaseProvider");

var _theme = require("../../../../theme");

var _reactNative2 = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

jest.useFakeTimers();
const theme = { ..._theme.theme,
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
  fonts: { ..._theme.theme.fonts,
    heading: 'Roboto',
    body: 'Roboto'
  }
};

const Provider = props => {
  return /*#__PURE__*/_react.default.createElement(_NativeBaseProvider.NativeBaseProvider, _extends({
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
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_Text.default, {
      testID: "my-text"
    }, "hello world")));
    const text = getByTestId('my-text');
    expect(text.props.style.fontFamily).toBe('Roboto-Regular');
  });
  it('resolves custom font variants', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_Text.default, {
      testID: "my-text",
      fontStyle: "italic"
    }, "hello world")));
    const text = getByTestId('my-text');
    expect(text.props.style.fontFamily).toBe('Roboto-Italic');
  });
  it('resolves to bold italic font', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_Text.default, {
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
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_Text.default, {
      testID: "my-text",
      fontWeight: 500
    }, "hello world")));
    const text = getByTestId('my-text');
    expect(text.props.style.fontFamily).toBe('Roboto-Medium');
  });
  it('resolves to medium font when fontWeight is medium', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_Text.default, {
      testID: "my-text",
      fontWeight: 'medium'
    }, "hello world")));
    const text = getByTestId('my-text');
    expect(text.props.style.fontFamily).toBe('Roboto-Medium');
  });
  it('respects fontFamily property', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_Text.default, {
      testID: "my-text",
      fontFamily: "Merriweather-Italic"
    }, "hello world")));
    const text = getByTestId('my-text');
    expect(text.props.style.fontFamily).toBe('Merriweather-Italic');
  });
  it("doesn't break if custom font is not specified", () => {
    const newTheme = JSON.parse(JSON.stringify(_theme.theme));
    delete newTheme.fontConfig;
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_Text.default, {
      testID: "my-text",
      fontWeight: 400
    }, "hello world")));
    const text = getByTestId('my-text');
    expect(text.props.style.fontFamily).toBe(undefined);
  });
  it("doesn't pass fontWeight and fontStyle if a custom fontFamily is resolved", () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_Text.default, {
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
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_Text.default, {
      lineHeight: "md",
      testID: "test"
    }, "This is a text")));
    const text = getByTestId('test');
    expect(text.props.style.lineHeight).toBe(_theme.theme.fontSizes.sm * parseFloat(_theme.theme.lineHeights.md));
  });
  it('tests absolute lineHeight in text ', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_Text.default, {
      lineHeight: 5,
      testID: "test"
    }, "This is a text")));
    const text = getByTestId('test');
    expect(text.props.style.lineHeight).toBe(5);
  });
  it('tests em non token lineHeight in text ', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_Text.default, {
      lineHeight: "13em",
      testID: "test"
    }, "This is a text")));
    const text = getByTestId('test');
    expect(text.props.style.lineHeight).toBe(_theme.theme.fontSizes.sm * 13);
  });
  it('tests letterSpacing from token in text ', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_Text.default, {
      letterSpacing: "2xl",
      testID: "test"
    }, "This is a text")));
    const text = getByTestId('test');
    expect(text.props.style.letterSpacing).toBe(_theme.theme.fontSizes.sm * parseFloat(_theme.theme.letterSpacings['2xl']));
  });
  it('tests letterSpacing in em from token in text ', () => {
    _reactNative2.Platform.OS = 'web';

    try {
      (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_Text.default, {
        letterSpacing: "2xl",
        testID: "test"
      }, "This is a text")));
    } catch (e) {
      expect(e.message).toContain("\"letterSpacing\": \"0.1em\"");
    } finally {
      _reactNative2.Platform.OS = 'ios';
    }
  });
  it('tests lineHeight and letterSpacing in px', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_Text.default, {
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