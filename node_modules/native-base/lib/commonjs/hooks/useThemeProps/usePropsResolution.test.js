"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("@testing-library/react-native");

var _theme = require("../../theme");

var _NativeBaseProvider = require("../../core/NativeBaseProvider");

var _primitives = require("../../components/primitives");

var _composites = require("../../components/composites");

var _reactNative2 = require("react-native");

var _extendTheme = require("../../core/extendTheme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// import { InfoIcon } from '../../components/primitives/Icon/Icons';
const inset = {
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
};

const Provider = ({
  children,
  theme = _theme.theme
}) => {
  return /*#__PURE__*/_react.default.createElement(_NativeBaseProvider.NativeBaseProvider, {
    initialWindowMetrics: inset,
    theme: theme
  }, children);
};

function CheckBoxGroup() {
  const [groupValue, setGroupValue] = _react.default.useState(['Item 1 ', 'Item 3 ']);

  return /*#__PURE__*/_react.default.createElement(_primitives.Checkbox.Group, {
    colorScheme: "green",
    defaultValue: groupValue,
    onChange: values => {
      setGroupValue(values || []);
    }
  }, /*#__PURE__*/_react.default.createElement(_primitives.Checkbox, {
    value: "Item 1 "
  }, /*#__PURE__*/_react.default.createElement(_primitives.Text, {
    mx: 2
  }, "Item 1")), /*#__PURE__*/_react.default.createElement(_primitives.Checkbox, {
    value: "Item 2 "
  }, /*#__PURE__*/_react.default.createElement(_primitives.Text, {
    mx: 2
  }, "Item 2")), /*#__PURE__*/_react.default.createElement(_primitives.Checkbox, {
    value: "Item 3 "
  }, /*#__PURE__*/_react.default.createElement(_primitives.Text, {
    mx: 2
  }, "Item 3")), /*#__PURE__*/_react.default.createElement(_primitives.Checkbox, {
    colorScheme: "orange",
    value: "Indeterminate Item "
  }, /*#__PURE__*/_react.default.createElement(_primitives.Text, {
    mx: 2
  }, "Indeterminate Item")));
}

describe('props resolution', () => {
  it('tests simple resolution', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.Box, {
      p: 2,
      testID: "test"
    }, "hello world")));
    const box = getByTestId('test');
    expect(box.props.style.paddingLeft).toBe(_theme.theme.space['2']);
    expect(box.props.style.paddingRight).toBe(_theme.theme.space['2']);
    expect(box.props.style.paddingTop).toBe(_theme.theme.space['2']);
    expect(box.props.style.paddingBottom).toBe(_theme.theme.space['2']);
  });
  it('tests simple resolution with responsive props', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.Box, {
      p: [2, 4, 5],
      testID: "test"
    }, "hello world"), /*#__PURE__*/_react.default.createElement(_primitives.Box, {
      p: {
        base: 1,
        sm: 5,
        lg: 10
      },
      testID: "test2"
    }, "hello world")));
    const box = getByTestId('test');
    expect(box.props.style.paddingLeft).toBe(_theme.theme.space['4']);
    expect(box.props.style.paddingRight).toBe(_theme.theme.space['4']);
    expect(box.props.style.paddingTop).toBe(_theme.theme.space['4']);
    expect(box.props.style.paddingBottom).toBe(_theme.theme.space['4']);
    const box2 = getByTestId('test2');
    expect(box2.props.style.paddingLeft).toBe(_theme.theme.space['5']);
    expect(box2.props.style.paddingRight).toBe(_theme.theme.space['5']);
    expect(box2.props.style.paddingTop).toBe(_theme.theme.space['5']);
    expect(box2.props.style.paddingBottom).toBe(_theme.theme.space['5']);
  });
  it('resolves platform props', () => {
    _reactNative2.Platform.OS = 'android';
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.Box, {
      p: 5,
      _android: {
        p: 10
      },
      testID: "test"
    }, "hello world")));
    const box = getByTestId('test');
    expect(box.props.style.paddingLeft).toBe(_theme.theme.space['10']);
    expect(box.props.style.paddingRight).toBe(_theme.theme.space['10']);
    expect(box.props.style.paddingTop).toBe(_theme.theme.space['10']);
    expect(box.props.style.paddingBottom).toBe(_theme.theme.space['10']);
  });
  it('resolves base style with props', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      components: {
        Box: {
          baseStyle: {
            py: 10,
            bg: 'cyan.500'
          }
        }
      }
    });
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Box, {
      p: 5,
      testID: "test"
    }, "hello world")));
    const box = getByTestId('test');
    expect(box.props.style).toEqual({
      paddingTop: newTheme.space['5'],
      paddingBottom: newTheme.space['5'],
      paddingLeft: newTheme.space['5'],
      paddingRight: newTheme.space['5'],
      backgroundColor: newTheme.colors.cyan['500']
    });
  });
  it('resolves base style and variants with props', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      components: {
        Box: {
          baseStyle: {
            py: 10,
            bg: 'cyan.500'
          },
          variants: {
            myBox: () => ({
              mt: 10
            })
          }
        }
      }
    });
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Box, {
      p: 5,
      testID: "test" //@ts-ignore
      ,
      variant: "myBox"
    }, "hello world")));
    const box = getByTestId('test');
    expect(box.props.style).toEqual({
      marginTop: newTheme.space['10'],
      paddingTop: newTheme.space['5'],
      paddingBottom: newTheme.space['5'],
      paddingLeft: newTheme.space['5'],
      paddingRight: newTheme.space['5'],
      backgroundColor: newTheme.colors.cyan['500']
    });
  });
  it('resolves base style, variants and sizes with props', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      components: {
        Box: {
          baseStyle: {
            py: 10,
            bg: 'cyan.500'
          },
          variants: {
            myBox: () => ({
              mt: 10
            })
          },
          sizes: {
            xs: {
              height: 10
            }
          }
        }
      }
    });
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Box, {
      p: 5,
      testID: "test" //@ts-ignore
      ,
      variant: "myBox" //@ts-ignore
      // size="xs"

    }, "hello world")));
    const box = getByTestId('test');
    expect(box.props.style).toEqual({
      marginTop: newTheme.space['10'],
      paddingTop: newTheme.space['5'],
      paddingBottom: newTheme.space['5'],
      paddingLeft: newTheme.space['5'],
      paddingRight: newTheme.space['5'],
      height: newTheme.sizes['10'],
      backgroundColor: newTheme.colors.cyan['500']
    });
  });
  it('tests component sizes resolution', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.Image, {
      source: {
        uri: 'https://nativebase.io/img/nativebase-logo.svg'
      },
      alt: "test-image",
      size: "md",
      testID: "image"
    }), /*#__PURE__*/_react.default.createElement(_primitives.Spinner, {
      size: "sm",
      testID: "spinner"
    })));
    const image = getByTestId('image');
    const spinner = getByTestId('spinner');
    expect(image.props.style).toEqual({
      height: _theme.theme.space['20'],
      maxWidth: '100%',
      width: _theme.theme.space['20']
    });
    expect(spinner.props.style).toEqual([[{}, {
      dataSet: {}
    }], undefined]);
  });
  it('resolves base style and variants, sizes and default props with props', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      components: {
        Box: {
          baseStyle: {
            py: 10,
            bg: 'cyan.500'
          },
          variants: {
            myBox: () => ({
              mt: 10
            })
          },
          sizes: {
            xs: {
              height: 10
            }
          },
          defaultProps: {
            size: 'xs'
          }
        }
      }
    });
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Box, {
      p: 5,
      testID: "test" //@ts-ignore
      ,
      variant: "myBox"
    }, "hello world")));
    const box = getByTestId('test');
    expect(box.props.style).toEqual({
      marginTop: newTheme.space['10'],
      paddingTop: newTheme.space['5'],
      paddingBottom: newTheme.space['5'],
      paddingLeft: newTheme.space['5'],
      paddingRight: newTheme.space['5'],
      height: newTheme.sizes['10'],
      backgroundColor: newTheme.colors.cyan['500']
    });
  });
  it('tests alpha opacity resolution', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.Box, {
      p: 2,
      bg: "primary.400:alpha.50",
      testID: "test"
    }, "hello world")));
    const box = getByTestId('test');
    expect(box.props.style.backgroundColor).toBe('rgba(34, 211, 238, ' + _theme.theme.opacity['50'] + ')');
  });
  it('resolves negative margins', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.Box, {
      m: -5,
      mt: '-10',
      testID: "test"
    }, "hello world")));
    const box = getByTestId('test');
    expect(box.props.style).toEqual({
      marginTop: -_theme.theme.space['10'],
      marginRight: -_theme.theme.space['5'],
      marginBottom: -_theme.theme.space['5'],
      marginLeft: -_theme.theme.space['5']
    });
  });
  it('resolves shadow from theme', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.Box, {
      shadow: 9,
      testID: "test"
    }, "hello world")));
    const box = getByTestId('test');
    expect(box.props.style).toEqual(_theme.theme.shadows[9]);
  });
  it('FormControl: pseudo props test ', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_composites.FormControl, {
      isDisabled: true
    }, /*#__PURE__*/_react.default.createElement(_composites.FormControl.HelperText, {
      testID: "test",
      _disabled: {
        borderLeftWidth: 1,
        mt: 1,
        px: 1,
        pl: 2,
        borderColor: 'gray.400'
      }
    }))));
    const formControl = getByTestId('test');
    expect(formControl.props.style).toEqual({
      borderLeftWidth: 1,
      marginTop: _theme.theme.space['1'],
      paddingLeft: _theme.theme.space['2'],
      paddingRight: _theme.theme.space['1'],
      borderColor: _theme.theme.colors.gray['400']
    });
  });
  it('Menu: style props test', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_composites.Menu, {
      trigger: triggerProps => {
        return /*#__PURE__*/_react.default.createElement(_primitives.Pressable, _extends({
          testID: "pressableTest",
          accessibilityLabel: "More options menu"
        }, triggerProps), "Open menu");
      }
    }, /*#__PURE__*/_react.default.createElement(_composites.Menu.Item, null, "Arial"), /*#__PURE__*/_react.default.createElement(_composites.Menu.Item, {
      bg: "blue.300",
      testID: "test"
    }, "Nunito Sans"), /*#__PURE__*/_react.default.createElement(_composites.Menu.Item, {
      testID: "test1",
      isDisabled: true,
      _disabled: {
        bg: 'pink.300'
      }
    }, "Tahoma"))));
    const triggerElement = getByTestId('pressableTest');

    _reactNative.fireEvent.press(triggerElement);

    const menuItem = getByTestId('test');
    const disabledMenuItem = getByTestId('test1');
    expect(menuItem.props.style.backgroundColor).toBe(_theme.theme.colors.blue['300']);
    expect(disabledMenuItem.props.style.backgroundColor).toBe(_theme.theme.colors.pink['300']);
  });
  it('Button: style props test', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.Button, {
      testID: "test",
      bg: "pink.900",
      _text: {
        color: 'cyan.100',
        testID: 'test1'
      }
    }, "PRIMARY")));
    const buttonElement = getByTestId('test');
    const buttonText = getByTestId('test1');
    expect(buttonText.props.style.color).toBe(_theme.theme.colors.cyan['100']);
    expect(buttonElement.props.style.backgroundColor).toBe(_theme.theme.colors.pink['900']);
  });
  it('Button: style props test on ios with dark mode', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      config: {
        initialColorMode: 'dark'
      }
    });
    _reactNative2.Platform.OS = 'ios';
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Button, {
      testID: "test",
      _ios: {
        _dark: {
          bg: 'pink.900'
        }
      },
      _text: {
        color: 'cyan.100',
        testID: 'test1'
      }
    }, "PRIMARY")));
    const buttonElement = getByTestId('test');
    const buttonText = getByTestId('test1');
    expect(buttonText.props.style.color).toBe(_theme.theme.colors.cyan['100']);
    expect(buttonElement.props.style.backgroundColor).toBe(_theme.theme.colors.pink['900']);
  });
  it('Button: style responsive props test on ios with dark mode', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      config: {
        initialColorMode: 'dark'
      }
    });
    _reactNative2.Platform.OS = 'ios';
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Button, {
      testID: "test",
      _ios: {
        _dark: {
          bg: ['pink.900', 'blue.900', 'cyan.900']
        }
      },
      _text: {
        color: 'cyan.100',
        testID: 'test1'
      }
    }, "PRIMARY")));
    const buttonElement = getByTestId('test');
    const buttonText = getByTestId('test1');
    expect(buttonText.props.style.color).toBe(_theme.theme.colors.cyan['100']);
    expect(buttonElement.props.style.backgroundColor).toBe(_theme.theme.colors.blue['900']);
  });
  it('Image: style responsive props test on ios with dark mode', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      config: {
        initialColorMode: 'dark'
      }
    });
    _reactNative2.Platform.OS = 'ios';
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Image, {
      testID: "test",
      source: {
        uri: 'https://wallpaperaccess.com/full/317501jpg'
      },
      alt: "Alternate Text",
      _ios: {
        _dark: {
          source: {
            uri: 'https://www.w3schools.com/css/img_lightsjpg'
          },
          size: ['sm', 'md', 'xl']
        }
      }
    })));
    const imageElement = getByTestId('test');
    expect(imageElement.props.style).toEqual({
      height: _theme.theme.space['20'],
      maxWidth: '100%',
      width: _theme.theme.space['20']
    });
  });
  it('Input: Basic check', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.Input, {
      _stack: {
        testID: 'StackTest'
      },
      _input: {
        testID: 'test'
      },
      w: "100%",
      mx: 3,
      placeholder: "Default Input",
      placeholderTextColor: "blueGray.400"
    })));
    const inputElement = getByTestId('test');
    const inputElementStack = getByTestId('StackTest');
    expect(inputElement.props.style.width).toBe('100%');
    expect(inputElement.props.placeholderTextColor).toBe(_theme.theme.colors.blueGray['400']);
    expect(inputElementStack.props.style.marginLeft).toBe(_theme.theme.space['3']);
    expect(inputElementStack.props.style.marginRight).toBe(_theme.theme.space['3']);
  });
  it('Input: color mode', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      config: {
        initialColorMode: 'dark'
      }
    });
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Input, {
      _input: {
        testID: 'test'
      },
      _light: {
        placeholderTextColor: 'blueGray.400'
      },
      _dark: {
        placeholderTextColor: 'blueGray.50'
      }
    })));
    const inputElement = getByTestId('test');
    expect(inputElement.props.placeholderTextColor).toBe(_theme.theme.colors.blueGray['50']);
  });
  it('Input: size', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      config: {
        initialColorMode: 'dark'
      }
    });
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Input, {
      _input: {
        testID: 'test'
      },
      size: "sm",
      variant: "outline",
      _dark: {
        size: 'md'
      }
    })));
    const inputElement = getByTestId('test');
    expect(inputElement.props.style.fontSize).toBe(_theme.theme.fontSizes.sm);
  });
  it('Input: variant', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.Input, {
      _stack: {
        testID: 'test'
      },
      variant: "underlined"
    })));
    const inputElement = getByTestId('test');
    expect(inputElement.props.style.borderBottomWidth).toBe(1);
  }); // it('Input: inputElements', () => {
  //   const { getByTestId } = render(
  //     <Provider>
  //       <Input
  //         testID="test1"
  //         InputLeftElement={<Button testID="test2">leftIcon</Button>}
  //         placeholder="Input"
  //       />
  //     </Provider>
  //   );
  //   const inputElement = getByTestId('test1');
  //   const iconElement = getByTestId('test2');
  //   console.log(inputElement, '!!!!!');
  //   console.log('===========');
  //   console.log(inputElement.props, '!!!!!');
  //   expect(inputElement.props.InputLeftElement).toBe(iconElement);
  // });

  it('Input: style props test on ios with dark mode', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      config: {
        initialColorMode: 'dark'
      }
    });
    _reactNative2.Platform.OS = 'ios';
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Input, {
      _stack: {
        testID: 'stackTest'
      },
      _input: {
        testID: 'test'
      },
      _ios: {
        _dark: {
          variant: 'underlined',
          size: 'sm'
        }
      },
      variant: "outline",
      size: "lg"
    })));
    const inputElement = getByTestId('test');
    const inputElementStack = getByTestId('stackTest');
    expect(inputElementStack.props.style.borderBottomWidth).toBe(1); // as input of 'sm' size is mapped to 'xs' fontsize

    expect(inputElement.props.style.fontSize).toBe(_theme.theme.fontSizes.xs);
  }); // it('Input: inputElemets', () => {
  //   const { getByTestId } = render(
  //     <Provider>
  //       <Input
  //         testID="test1"
  //         InputLeftElement={<Button testID="test2">leftIcon</Button>}
  //         placeholder="Input"
  //       />
  //     </Provider>
  //   );
  //   const inputElement = getByTestId('test1');
  //   const iconElement = getByTestId('test2');
  //   console.log(inputElement, '!!!!!');
  //   console.log('===========');
  //   console.log(inputElement.props, '!!!!!');
  //   expect(inputElement.props.InputLeftElement).toBe(iconElement);
  // });

  it('Input: disabled', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.Input, {
      _input: {
        testID: 'test'
      },
      type: "password",
      isDisabled: true,
      isRequired: true
    })));
    const inputElement = getByTestId('test');
    expect(inputElement.props.disabled).toBe(true);
    expect(inputElement.props.required).toBe(true);
  }); // ==========================================

  it('handles defaults and onChange on checkBoxGroup', () => {
    const {
      getAllByRole
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
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
    }, /*#__PURE__*/_react.default.createElement(CheckBoxGroup, null)));
    const checkbox = getAllByRole('checkbox');
    expect(checkbox.length).toBe(4);
    expect(checkbox[0].props.accessibilityState.checked).toBe(true);
    expect(checkbox[1].props.accessibilityState.checked).toBe(false);
    expect(checkbox[2].props.accessibilityState.checked).toBe(true);
    expect(checkbox[3].props.accessibilityState.checked).toBe(false);

    _reactNative.fireEvent.press(checkbox[1]);

    expect(checkbox[1].props.accessibilityState.checked).toBe(true);
  });
  it('checkBox: disabled, checked', () => {
    const {
      getAllByRole
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
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
    }, /*#__PURE__*/_react.default.createElement(_primitives.Checkbox, {
      value: "Item 1 "
    }, /*#__PURE__*/_react.default.createElement(_primitives.Text, {
      mx: 2
    }, "Item 1")), /*#__PURE__*/_react.default.createElement(_primitives.Checkbox, {
      value: "Item 2 ",
      isDisabled: true
    }, /*#__PURE__*/_react.default.createElement(_primitives.Text, {
      mx: 2
    }, "Item 2")), /*#__PURE__*/_react.default.createElement(_primitives.Checkbox, {
      value: "Item 3",
      isChecked: true
    }, /*#__PURE__*/_react.default.createElement(_primitives.Text, {
      mx: 2
    }, "Item 3")), /*#__PURE__*/_react.default.createElement(_primitives.Checkbox, {
      colorScheme: "orange",
      value: "Indeterminate Item",
      isInvalid: true
    }, /*#__PURE__*/_react.default.createElement(_primitives.Text, {
      mx: 2
    }, "Indeterminate Item"))));
    const checkbox = getAllByRole('checkbox');
    expect(checkbox.length).toBe(4);
    expect(checkbox[1].props.accessibilityState.disabled).toBe(true);
    expect(checkbox[2].props.accessibilityState.checked).toBe(true); // expect(checkbox[3].props.accessibilityState.invalid).toBe(true);
  }); // it('Checkbox: style props test with dark mode', () => {
  //   const newTheme = extendTheme({
  //     config: { initialColorMode: 'dark' },
  //   });
  //   const { getAllByRole } = render(
  //     <Provider theme={newTheme}>
  //       <Checkbox
  //         value="Item 1"
  //         isChecked={true}
  //         isDisabled={false}
  //         _dark={{
  //           isChecked: false,
  //           isDisabled: true,
  //         }}
  //       >
  //         <Text mx={2}>Item 1</Text>
  //       </Checkbox>
  //     </Provider>
  //   );
  //   let checkbox = getAllByRole('checkbox');
  //   console.log(checkbox[0].props.accessibilityState, '@@@@');
  //   expect(checkbox[0].props.accessibilityState.checked).toBe(false);
  //   expect(checkbox[0].props.accessibilityState.disabled).toBe(true);
  // });
  // it('Checkbox: style props test on ios with dark mode', () => {
  //   const newTheme = extendTheme({
  //     config: { initialColorMode: 'dark' },
  //   });
  //   Platform.OS = 'ios';
  //   const { getAllByRole } = render(
  //     <Provider theme={newTheme}>
  //       <Checkbox
  //         value="Item 1"
  //         isChecked={true}
  //         isDisabled={false}
  //         _ios={{
  //           _dark: {
  //             isChecked: false,
  //             isDisabled: true,
  //           },
  //         }}
  //       >
  //         <Text mx={2}>Item 1</Text>
  //       </Checkbox>
  //     </Provider>
  //   );
  //   let checkbox = getAllByRole('checkbox');
  //   console.log(checkbox[0].props.accessibilityState, '@@@@');
  //   expect(checkbox[0].props.accessibilityState.checked).toBe(false);
  //   expect(checkbox[0].props.accessibilityState.disabled).toBe(true);
  // });

  it('onChange on checkBox', () => {
    const {
      getAllByRole
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
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
    }, /*#__PURE__*/_react.default.createElement(_primitives.Checkbox, {
      value: "item 1"
    })));
    const checkbox = getAllByRole('checkbox');
    expect(checkbox.length).toBe(1);

    _reactNative.fireEvent.press(checkbox[0]);

    expect(checkbox[0].props.accessibilityState.checked).toBe(true);
  }); // it('CustomIcon checkBox', () => {
  //   let { getAllByRole, getByTestId } = render(
  //     <Provider>
  //       <Checkbox
  //         value="orange"
  //         colorScheme="orange"
  //         size="md"
  //         icon={<Icon testID="icon" as={<InfoIcon />} />}
  //         defaultIsChecked
  //       >
  //         Info
  //       </Checkbox>
  //     </Provider>
  //   );
  //   let checkbox = getAllByRole('checkbox');
  //   let nestedIcon = getByTestId('icon');
  //   expect(checkbox[0].props.icon).toBe(nestedIcon);
  // });
  //  ==========================================

  it('Slider: basic', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.Slider, {
      testID: "slider" // Need to test
      // defaultValue={70}
      ,
      minValue: 0,
      maxValue: 100,
      accessibilityLabel: "hello world",
      step: 10,
      colorScheme: "red",
      size: "sm"
    }, /*#__PURE__*/_react.default.createElement(_primitives.Slider.Track, null, /*#__PURE__*/_react.default.createElement(_primitives.Slider.FilledTrack, null)), /*#__PURE__*/_react.default.createElement(_primitives.Slider.Thumb, null))));
    const sliderElement = getByTestId('slider');
    expect(sliderElement.props.minValue).toBe(0);
    expect(sliderElement.props.maxValue).toBe(100);
    expect(sliderElement.props.step).toBe(10);
    expect(sliderElement.props.thumbSize).toBe(4);
    expect(sliderElement.props.sliderSize).toBe(4);
    expect(sliderElement.props.colorScheme).toBe('red');
  }); //  ==========================================
  // it('Modal: size', () => {
  //   const { getByTestId } = render(
  //     <Provider>
  //       <Modal isOpen={true} size="sm">
  //         <Modal.Content testID="size">
  //           <Modal.Header>Modal Title</Modal.Header>
  //           <Modal.Body>
  //             Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
  //             ullamco deserunt aute id consequat veniam incididunt duis in sint
  //             irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
  //             officia tempor esse quis. Sunt ad dolore quis aute consequat.
  //             Magna exercitation reprehenderit magna aute tempor cupidatat
  //             consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
  //             incididunt cillum quis. Velit duis sit officia eiusmod Lorem
  //             aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
  //             consectetur esse laborum eiusmod pariatur
  //           </Modal.Body>
  //         </Modal.Content>
  //       </Modal>
  //     </Provider>
  //   );
  //   const modalElement = getByTestId('size');
  //   // console.log(modalElement, 'jdj');
  //   expect(modalElement.props.style.width).toBe('60%');
  // });

  it('Slider: style props test with dark mode', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      config: {
        initialColorMode: 'dark'
      }
    });
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Slider, {
      testID: "test",
      _dark: {
        minValue: 20,
        maxValue: 120,
        step: 25,
        colorScheme: 'blue',
        size: 'md'
      },
      minValue: 0,
      maxValue: 100,
      accessibilityLabel: "hello world",
      step: 10,
      colorScheme: "red",
      size: "sm"
    }, /*#__PURE__*/_react.default.createElement(_primitives.Slider.Track, null, /*#__PURE__*/_react.default.createElement(_primitives.Slider.FilledTrack, null)), /*#__PURE__*/_react.default.createElement(_primitives.Slider.Thumb, null))));
    const sliderElement = getByTestId('test');
    expect(sliderElement.props.minValue).toBe(20);
    expect(sliderElement.props.maxValue).toBe(120);
    expect(sliderElement.props.step).toBe(25);
    expect(sliderElement.props.thumbSize).toBe(5);
    expect(sliderElement.props.sliderSize).toBe(5);
    expect(sliderElement.props.colorScheme).toBe('blue');
  });
  it('tests lineHeight & letterspacing in text ', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.Text
    /* @ts-ignore */
    , {
      fontSize: "20px",
      lineHeight: "5xl",
      letterSpacing: "xl",
      testID: "test"
    }, "This is a text")));
    const text = getByTestId('test');
    expect(text.props.style.lineHeight).toBe(80);
    expect(text.props.style.letterSpacing).toBe(1);
  });
  it('Slider: style props test on ios with dark mode', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      config: {
        initialColorMode: 'dark'
      }
    });
    _reactNative2.Platform.OS = 'ios';
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Slider, {
      testID: "test",
      _ios: {
        _dark: {
          minValue: 10,
          maxValue: 110,
          step: 15,
          colorScheme: 'green',
          size: 'md'
        }
      },
      minValue: 0,
      maxValue: 100,
      accessibilityLabel: "hello world",
      step: 10,
      colorScheme: "red",
      size: "sm"
    }, /*#__PURE__*/_react.default.createElement(_primitives.Slider.Track, null, /*#__PURE__*/_react.default.createElement(_primitives.Slider.FilledTrack, null)), /*#__PURE__*/_react.default.createElement(_primitives.Slider.Thumb, null))));
    const sliderElement = getByTestId('test');
    expect(sliderElement.props.minValue).toBe(10);
    expect(sliderElement.props.maxValue).toBe(110);
    expect(sliderElement.props.step).toBe(15);
    expect(sliderElement.props.thumbSize).toBe(5);
    expect(sliderElement.props.sliderSize).toBe(5);
    expect(sliderElement.props.colorScheme).toBe('green');
  });
  it('HStack: basic', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.HStack, {
      testID: "hstack"
    }, /*#__PURE__*/_react.default.createElement(_primitives.Box, null, "1"), /*#__PURE__*/_react.default.createElement(_primitives.Box, null, "2"), /*#__PURE__*/_react.default.createElement(_primitives.Box, null, "3"))));
    const hstackElement = getByTestId('hstack');
    expect(hstackElement.props.style.flexDirection).toBe('row');
  });
  it('HStack: direction', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.HStack, {
      testID: "test",
      direction: "column"
    }, /*#__PURE__*/_react.default.createElement(_primitives.Box, null, "1"), /*#__PURE__*/_react.default.createElement(_primitives.Box, null, "2"), /*#__PURE__*/_react.default.createElement(_primitives.Box, null, "3"))));
    const hstackElement = getByTestId('test');
    expect(hstackElement.props.style.flexDirection).toBe('column');
  }); // it('Icon: basic', () => {
  //   const { getByTestId } = render(
  //     <Provider>
  //       <Icon as={<Ionicons name="md-checkmark-circle" />} />
  //     </Provider>
  //   );
  //   const iconElement = getByTestId('test123');
  //   expect(iconElement.props.style.backgroundColor).toBe(
  //     defaultTheme.colors.red['200']
  //   );
  // });
  // it('Icon: Nativebase icons', () => {
  //   const { getByTestId } = render(
  //     <Provider>
  //       <MoonIcon testId="test" />
  //     </Provider>
  //   );
  //   const iconElement = getByTestId('test');
  //   expect(pressableElement.props.style.backgroundColor).toBe(
  //     defaultTheme.colors.red['200']
  //   );
  // });

  it('Pressable: style props test', () => {
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, null, /*#__PURE__*/_react.default.createElement(_primitives.Pressable, {
      testID: "test",
      bg: "red.200",
      _hover: {
        bg: 'teal.300'
      }
    }, /*#__PURE__*/_react.default.createElement(_primitives.Text, null, "hello world"))));
    const pressableElement = getByTestId('test');
    expect(pressableElement.props.style.backgroundColor).toBe(_theme.theme.colors.red['200']);
  }); // it('Pressable: style props test on ios with dark mode', () => {
  //   const newTheme = extendTheme({
  //     config: { initialColorMode: 'dark' },
  //   });
  //   Platform.OS = 'ios';
  //   const { getByTestId } = render(
  //     <Provider theme={newTheme}>
  //       <Pressable testID="test" _ios={{ _dark: { bg: 'pink.900' } }}>
  //         PRIMARY
  //       </Pressable>
  //     </Provider>
  //   );
  //   const buttonElement = getByTestId('test');
  //   expect(buttonElement.props.style.backgroundColor).toBe(
  //     defaultTheme.colors.pink['900']
  //   );
  // });
  // it('Pressable: style responsive props test on ios with dark mode', () => {
  //   const newTheme = extendTheme({
  //     config: { initialColorMode: 'dark' },
  //   });
  //   Platform.OS = 'ios';
  //   const { getByTestId } = render(
  //     <Provider theme={newTheme}>
  //       <Pressable
  //         testID="test"
  //         _ios={{ _dark: { bg: ['pink.900', 'blue.900', 'cyan.900'] } }}
  //       >
  //         PRIMARY
  //       </Pressable>
  //     </Provider>
  //   );
  //   const buttonElement = getByTestId('test');
  //   expect(buttonElement.props.style.backgroundColor).toBe(
  //     defaultTheme.colors.blue['900']
  //   );
  // });
  // });

  it('HStack: style props test with dark mode', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      config: {
        initialColorMode: 'dark'
      }
    });
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.HStack, {
      testID: "test",
      direction: "column",
      _dark: {
        direction: 'row'
      }
    }, /*#__PURE__*/_react.default.createElement(_primitives.Box, null, "1"), /*#__PURE__*/_react.default.createElement(_primitives.Box, null, "2"), /*#__PURE__*/_react.default.createElement(_primitives.Box, null, "3"))));
    const hstackElement = getByTestId('test');
    expect(hstackElement.props.style.flexDirection).toBe('row');
  });
  it('HStack: style props test on ios & dark mode', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      config: {
        initialColorMode: 'dark'
      }
    });
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Box, null, /*#__PURE__*/_react.default.createElement(_primitives.Text // @ts-ignore
    , {
      fontSize: "12px",
      testID: "test",
      lineHeight: "4xl",
      letterSpacing: "xl",
      _ios: {
        _dark: {
          fontSize: '15px',
          letterSpacing: 'lg',
          lineHeight: '3xl'
        }
      }
    }, "This is a text"), /*#__PURE__*/_react.default.createElement(_primitives.Text, {
      testID: "responsiveLineHeight",
      lineHeight: "3xl",
      fontSize: ['12px', '13px']
    }, "hello world"))));
    const text = getByTestId('test');
    const responsiveLineHeight = getByTestId('responsiveLineHeight');
    expect(text.props.style.lineHeight).toBe(37.5);
    expect(text.props.style.letterSpacing).toBe(0.375);
    expect(responsiveLineHeight.props.style.lineHeight).toBe(32.5);
  });
  it('Heading: style props test on ios with dark mode', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      config: {
        initialColorMode: 'dark'
      }
    });
    _reactNative2.Platform.OS = 'ios';
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Box, null, /*#__PURE__*/_react.default.createElement(_primitives.Heading // @ts-ignore
    , {
      fontSize: "12px",
      testID: "test",
      lineHeight: "4xl",
      letterSpacing: "xl",
      _ios: {
        _dark: {
          fontSize: '15px',
          letterSpacing: 'lg',
          lineHeight: '3xl'
        }
      }
    }, "This is a Heading"))));
    const heading = getByTestId('test');
    expect(heading.props.style.lineHeight).toBe(37.5);
    expect(heading.props.style.letterSpacing).toBe(0.375);
  });
  it('Pseudo props test: importatnt on Button', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      config: {
        initialColorMode: 'dark'
      },
      components: {
        Button: {
          baseStyle: {
            _important: {
              bg: 'green.400'
            }
          }
        }
      }
    });
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Button, {
      bg: "amber.500",
      testID: "test"
    }, "Button")));
    const button = getByTestId('test');
    expect(button.props.style.backgroundColor).toBe(_theme.theme.colors.green['400']);
  });
  it('Pseudo props test: normal prop on light and dark', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      config: {
        initialColorMode: 'dark'
      },
      components: {
        Button: {
          baseStyle: {
            _light: {
              bg: 'green.700'
            },
            _dark: {
              bg: 'green.100'
            }
          }
        }
      }
    });
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Button, {
      bg: "amber.500",
      testID: "test"
    }, "Button")));
    const button = getByTestId('test');
    expect(button.props.style.backgroundColor).toBe(_theme.theme.colors.amber['500']);
  });
  it('Pseudo props test: _important overrided', () => {
    const newTheme = (0, _extendTheme.extendTheme)({
      config: {
        initialColorMode: 'dark'
      },
      components: {
        Button: {
          baseStyle: {
            _important: {
              bg: 'green.400'
            }
          },
          variants: {
            solid: {
              _important: {
                bg: 'emerald.800',
                _text: {
                  color: 'white'
                }
              }
            }
          }
        }
      }
    });
    const {
      getByTestId
    } = (0, _reactNative.render)( /*#__PURE__*/_react.default.createElement(Provider, {
      theme: newTheme
    }, /*#__PURE__*/_react.default.createElement(_primitives.Button, {
      bg: "amber.500",
      testID: "test"
    }, "Button")));
    const button = getByTestId('test');
    expect(button.props.style.backgroundColor).toBe(_theme.theme.colors.emerald['800']);
  });
}); // =========================================================
// it('Modal: size', () => {
//   const { getByTestId } = render(
//     <Provider>
//       <Modal isOpen={true} size="sm">
//         <Modal.Content testID="size">
//           <Modal.Header>Modal Title</Modal.Header>
//           <Modal.Body>
//             Sit nulla est ex deserunt exercitation anim occaecat. Nostrud
//             ullamco deserunt aute id consequat veniam incididunt duis in sint
//             irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit
//             officia tempor esse quis. Sunt ad dolore quis aute consequat.
//             Magna exercitation reprehenderit magna aute tempor cupidatat
//             consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
//             incididunt cillum quis. Velit duis sit officia eiusmod Lorem
//             aliqua enim laboris do dolor eiusmod. Et mollit incididunt nisi
//             consectetur esse laborum eiusmod pariatur
//           </Modal.Body>
//         </Modal.Content>
//       </Modal>
//     </Provider>
//   );
//   const modalElement = getByTestId('size');
//   expect(modalElement.props.style.width).toBe('60%');
// });
//# sourceMappingURL=usePropsResolution.test.js.map