'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pointer = exports.PointerRefSpec = exports.PointerRef = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonpointer = require('jsonpointer');

var _jsonpointer2 = _interopRequireDefault(_jsonpointer);

var _abstract = require('./abstract');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PointerRef = exports.PointerRef = function (_AbstractRef) {
  _inherits(PointerRef, _AbstractRef);

  function PointerRef(path, value) {
    _classCallCheck(this, PointerRef);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PointerRef).call(this, { path: path, value: value, spec: new PointerRefSpec() }));
  }

  return PointerRef;
}(_abstract.AbstractRef);

var PointerRefSpec = exports.PointerRefSpec = function (_AbstractRefSpec) {
  _inherits(PointerRefSpec, _AbstractRefSpec);

  function PointerRefSpec() {
    _classCallCheck(this, PointerRefSpec);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PointerRefSpec).call(this, 'json-pointer', 'http://tools.ietf.org/html/draft-ietf-appsawg-json-pointer-08'));
  }

  _createClass(PointerRefSpec, [{
    key: 'matches',
    value: function matches(rel) {
      if (rel && !rel.constructor === String) {
        return false;
      }

      try {
        return _jsonpointer2.default.compile([rel]) instanceof Object;
      } catch (e) {
        return false;
      }
    }
  }, {
    key: 'follow',
    value: function follow(rel, data) {
      if (this.matches(rel)) {
        return _jsonpointer2.default.get(data, rel);
      }

      return [];
    }
  }, {
    key: 'update',
    value: function update(rel, obj, data) {
      return _jsonpointer2.default.set(obj, rel, data);
    }
  }]);

  return PointerRefSpec;
}(_abstract.AbstractRefSpec);

delete new PointerRefSpec(); // register spec with global pool by immediately invoking it

var pointer = exports.pointer = function pointer(path, value) {
  return new PointerRef(path, value);
};

exports.default = { PointerRef: PointerRef, PointerRefSpec: PointerRefSpec, pointer: pointer };