'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _specs = exports._specs = {};

var Rel = exports.Rel = function () {
  function Rel(_ref) {
    var path = _ref.path;
    var spec = _ref.spec;
    var value = _ref.value;

    _classCallCheck(this, Rel);

    this.path = path;
    this.spec = spec;
    this.value = value;
  }

  _createClass(Rel, [{
    key: 'follow',
    value: function follow() {
      return spec.follow(this.value);
    }
  }]);

  return Rel;
}();

var AbstractRelSpec = exports.AbstractRelSpec = function () {
  function AbstractRelSpec(label, draft) {
    var _this = this;

    _classCallCheck(this, AbstractRelSpec);

    var methods = ['matches', 'follow'];

    if (new.target === AbstractRelSpec) {
      throw new TypeError('Cannot construct AbstractRelSpec instances directly');
    }

    methods.forEach(function (method) {
      if (Object.is(_this[method], undefined)) {
        throw new TypeError('Must override ${method}');
      }
    });

    this.label = label;
    this.draft = draft;

    _specs[label] = this;
  }

  _createClass(AbstractRelSpec, null, [{
    key: 'identify',
    value: function identify(data) {
      return _specs.find(function (spec, label) {
        if (spec.matches(data)) {
          return label;
        }
      });
    }
  }]);

  return AbstractRelSpec;
}();