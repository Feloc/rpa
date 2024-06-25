"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _device = require("../controllers/device.controller");
var router = (0, _express.Router)();
router.get('/deviceTemp', _device.getTemperature);
router.get('/deviceTempChart', _device.getTemperatureChart);
router.get('/deviceTemperature', _device.temperatureChart);
router.get('/deviceTempInsert', _device.insertTemperature);
router.get('/deviceAcc', _device.deviceAccGetChart);
router.get('/deviceAccelerometer', _device.accelerometerChart);
router.get('/deviceAccChart', _device.getAccelerometerChart);
var _default = router;
exports["default"] = _default;