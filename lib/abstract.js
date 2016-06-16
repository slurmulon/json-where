'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _specs = exports._specs = {};

var AbstractRef = exports.AbstractRef = function () {
  function AbstractRef(_ref) {
    var path = _ref.path;
    var spec = _ref.spec;
    var value = _ref.value;

    _classCallCheck(this, AbstractRef);

    if (new.target === AbstractRef && !spec) {
      throw new TypeError('Cannot construct AbstractRef instances without a defined `spec`');
    }

    this.path = path;
    this.spec = spec;
    this.value = value;
  }

  _createClass(AbstractRef, [{
    key: 'use',
    value: function use(obj) {
      this.value = obj;

      return this;
    }
  }, {
    key: 'get',
    value: function get() {
      var single = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
      var obj = arguments.length <= 1 || arguments[1] === undefined ? this.value : arguments[1];

      var value = this.spec.follow(this.path, obj);

      if (value instanceof Array) {
        return single && value.length ? value[0] : value;
      }

      return single ? value : [value];
    }
  }, {
    key: 'one',
    value: function one() {
      var obj = arguments.length <= 0 || arguments[0] === undefined ? this.value : arguments[0];

      return this.get(obj, true);
    }
  }, {
    key: 'all',
    value: function all() {
      var obj = arguments.length <= 0 || arguments[0] === undefined ? this.value : arguments[0];

      return this.get(obj, false);
    }
  }, {
    key: 'count',
    value: function count() {
      var obj = arguments.length <= 0 || arguments[0] === undefined ? this.value : arguments[0];

      var results = this.get(obj);

      if (results instanceof Array) {
        return results.length;
      }

      return results ? 1 : 0;
    }
  }, {
    key: 'any',
    value: function any() {
      var obj = arguments.length <= 0 || arguments[0] === undefined ? this.value : arguments[0];

      return !!this.count(obj);
    }
  }, {
    key: 'set',
    value: function set(data) {
      var obj = arguments.length <= 1 || arguments[1] === undefined ? this.value : arguments[1];

      return this.spec.update(this.path, obj, data);
    }
  }]);

  return AbstractRef;
}();

var AbstractRefSpec = exports.AbstractRefSpec = function () {
  function AbstractRefSpec(label, draft) {
    var _this = this;

    _classCallCheck(this, AbstractRefSpec);

    var methods = ['matches', 'follow', 'update'];

    if (new.target === AbstractRefSpec) {
      throw new TypeError('Cannot construct AbstractRefSpec instances directly');
    }

    methods.forEach(function (method) {
      if (Object.is(_this[method], undefined)) {
        throw new TypeError('Must override ' + method);
      }
    });

    this.label = label;
    this.draft = draft;

    _specs[label] = this;
  }

  _createClass(AbstractRefSpec, null, [{
    key: 'identify',
    value: function identify(data) {
      return Object.keys(_specs).find(function (label) {
        if (_specs[label].matches(data)) {
          return label;
        }
      });
    }
  }]);

  return AbstractRefSpec;
}();

var $ = exports.$ = function $(path, value) {
  var key = AbstractRefSpec.identify(path);
  var spec = _specs[key];

  if (spec instanceof AbstractRefSpec) {
    return new AbstractRef({ path: path, value: value, spec: spec });
  }

  throw new TypeError('Failed to identify path specification for ' + path);
};

var which = exports.which = AbstractRefSpec.identify;

exports.default = { AbstractRef: AbstractRef, AbstractRefSpec: AbstractRefSpec, which: which, $: $ };