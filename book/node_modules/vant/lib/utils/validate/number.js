"use strict";

exports.__esModule = true;
exports.isNumber = isNumber;

function isNumber(value) {
  return /^\d+$/.test(value);
}