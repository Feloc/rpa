"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _equipmentControllers = require("../controllers/equipment.controllers.js");
var router = (0, _express.Router)();
router.get('/equipment', _equipmentControllers.getEquipment);
router.get('/equipment/:id', _equipmentControllers.getEquipmentById);
router.get('/equipment/count', _equipmentControllers.getTotalEquipment);
router.post('/equipment', _equipmentControllers.createEquipment);
router.put('/equipment/:id', _equipmentControllers.updateEquipmentById);
router["delete"]('/equipment/:id', _equipmentControllers.deleteEquipmentById);
var _default = router;
exports["default"] = _default;