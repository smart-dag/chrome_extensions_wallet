"use strict";

exports.__esModule = true;
exports.ClickOutsideMixin = void 0;

var _event = require("../utils/event");

var ClickOutsideMixin = function ClickOutsideMixin(config) {
  return {
    mounted: function mounted() {
      var _this = this;

      config.handler = function (event) {
        if (!_this.$el.contains(event.target)) {
          _this[config.method]();
        }
      };

      (0, _event.on)(document, config.event, config.handler);
    },
    beforeDestroy: function beforeDestroy() {
      (0, _event.off)(document, config.event, config.handler);
    }
  };
};

exports.ClickOutsideMixin = ClickOutsideMixin;