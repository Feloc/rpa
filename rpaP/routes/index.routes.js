"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _indexController = require("../controllers/index.controller.js");
var router = (0, _express.Router)();
router.get('/', _indexController.inicio);
router.get('/about', _indexController.about);
router.get('/contact', _indexController.contact);
var _default = router;
exports["default"] = _default;