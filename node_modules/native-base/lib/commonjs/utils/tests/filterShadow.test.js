"use strict";

var _filterShadowProps = require("./../../utils/filterShadowProps");

describe('filterShadowProps', () => {
  test('empty', () => {
    expect((0, _filterShadowProps.filterShadowProps)({}, {}, 'web')).toEqual({
      style: {}
    });
  });
  test('basic', () => {
    expect((0, _filterShadowProps.filterShadowProps)({
      top: 10,
      shadowColor: '#FFF',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0
    }, {}, 'web')).toEqual({
      top: 10,
      style: {
        shadowColor: '#FFF',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0
      }
    });
  });
});
//# sourceMappingURL=filterShadow.test.js.map