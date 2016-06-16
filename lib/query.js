'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = exports.QueryRefSpec = exports.QueryRef = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonQuery = require('json-query');

var _jsonQuery2 = _interopRequireDefault(_jsonQuery);

var _abstract = require('./abstract');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QueryRef = exports.QueryRef = function (_AbstractRef) {
  _inherits(QueryRef, _AbstractRef);

  function QueryRef(path, value) {
    _classCallCheck(this, QueryRef);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(QueryRef).call(this, { path: path, value: value, spec: new QueryRefSpec() }));
  }

  return QueryRef;
}(_abstract.AbstractRef);

var QueryRefSpec = exports.QueryRefSpec = function (_AbstractRefSpec) {
  _inherits(QueryRefSpec, _AbstractRefSpec);

  function QueryRefSpec() {
    _classCallCheck(this, QueryRefSpec);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(QueryRefSpec).call(this, 'json-query', 'https://www.npmjs.com/package/json-query'));
  }

  _createClass(QueryRefSpec, [{
    key: 'matches',
    value: function matches(rel) {
      if (!rel || !rel.constructor === String && !rel instanceof Array) {
        return false;
      }

      return (0, _jsonQuery2.default)(rel).key !== undefined; // FIXME - use a RegEx instead, not sufficient
    }
  }, {
    key: 'follow',
    value: function follow(rel, data, locals) {
      if (this.matches(rel)) {
        return (0, _jsonQuery2.default)(rel, { data: data, locals: locals }).value || [];
      }
    }
  }, {
    key: 'update',
    value: function update(rel, obj, data) {
      // TODO - no core support
      console.warn('json-query does not support updating values!');
    }
  }]);

  return QueryRefSpec;
}(_abstract.AbstractRefSpec);

delete new QueryRefSpec(); // register spec with global pool by immediately invoking it

var query = exports.query = function query(path, value) {
  return new QueryRef(path, value);
};

exports.default = { QueryRef: QueryRef, QueryRefSpec: QueryRefSpec, query: query };