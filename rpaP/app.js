"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _path = _interopRequireDefault(require("path"));
var _url = require("url");
var _multer = _interopRequireDefault(require("multer"));
var _sharp = _interopRequireDefault(require("sharp"));
var _config = _interopRequireDefault(require("./config"));
var _index = require("./database/index");
var _index2 = _interopRequireDefault(require("./routes/index.routes"));
var _equipment = _interopRequireDefault(require("./routes/equipment.routes"));
var _device = _interopRequireDefault(require("./routes/device.routes"));
var _notices = _interopRequireDefault(require("./routes/notices.routes"));
//import ejs from 'ejs'//views como express tiene integracioj por defecto se puede obviar la importacion

var app = (0, _express["default"])();

//const __filename = fileURLToPath()//(import.meta.url);
//const __dirname = path.dirname(__filename);

//settings
var port;
app.set('views', _path["default"].join(__dirname, 'views')); //views
app.set('view engine', 'ejs'); //views
app.set('port', _config["default"].port);

//MIDDLEWARE
app.use(_express["default"].json()); //recibir datos formato json
app.use(_express["default"].urlencoded({
  extended: false
})); //recibir datos que vengan desde formularios html PODER ENTENDER LO QUE EL CLIENTE ENVIA

app.use(_index2["default"]);
app.use(_equipment["default"]);
app.use(_device["default"]);
app.use(_notices["default"]);

//STATICS
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.use('/uploads', _express["default"]["static"](_path["default"].join(__dirname, 'uploads')));

//conectar la base de datos
(0, _index.connectPoolPC)();
console.log(_path["default"].join(__dirname, 'views'));
console.log(__dirname);
console.log(__filename);
var _default = app;
exports["default"] = _default;