"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = require("dotenv");
//config lo que hara es que cuando se ajecuta va intentarl leer las varibles de entorno que esten definidas en nuestro pc
(0, _dotenv.config)();

//varible de entorno
var _default = {
  port: process.env.PORT || 5000,
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASS || '',
  dbServer: process.env.DB_SERVER || '',
  dbDatabase: process.env.DB_DATABASE || '',
  //telegram
  token: process.env.TOKEN || ''
};
exports["default"] = _default;