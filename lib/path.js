'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.path = exports.PathRefSpec = exports.PathRef = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonpath = require('jsonpath');

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _abstract = require('./abstract');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PathRef = exports.PathRef = function (_AbstractRef) {
  _inherits(PathRef, _AbstractRef);

  function PathRef(path, value) {
    _classCallCheck(this, PathRef);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PathRef).call(this, { path: path, value: value, spec: new PathRefSpec() }));
  }

  return PathRef;
}(_abstract.AbstractRef);

var PathRefSpec = exports.PathRefSpec = function (_AbstractRefSpec) {
  _inherits(PathRefSpec, _AbstractRefSpec);

  function PathRefSpec() {
    _classCallCheck(this, PathRefSpec);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PathRefSpec).call(this, 'json-path', 'http://goessner.net/articles/JsonPath/'));
  }

  _createClass(PathRefSpec, [{
    key: 'matches',
    value: function matches(rel) {
      if (rel && !rel.constructor === String) {
        return false;
      }

      try {
        var parsed = _jsonpath2.default.parse(rel);

        return !!parsed.length;
      } catch (e) {
        return false;
      }
    }
  }, {
    key: 'follow',
    value: function follow(rel, data) {
      if (this.matches(rel)) {
        return _jsonpath2.default.query(data, rel);
      }

      return [];
    }
  }, {
    key: 'update',
    value: function update(rel, obj, data) {
      // TODO! - no core support
      console.warn('json-path does not support updating values!');
    }
  }]);

  return PathRefSpec;
}(_abstract.AbstractRefSpec);

delete new PathRefSpec(); // register spec with global pool by immediately invoking it

var path = exports.path = function path(_path, value) {
  return new PathRef(_path, value);
};

exports.default = { PathRef: PathRef, PathRefSpec: PathRefSpec, path: path };