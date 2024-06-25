"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _notices = require("../controllers/notices.controllers");
var _multer = _interopRequireDefault(require("multer"));
var _path = _interopRequireDefault(require("path"));
var _sharp = _interopRequireDefault(require("sharp"));
var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, _path["default"].join(__dirname, '../uploads/'));
  },
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + _path["default"].extname(file.originalname));
  }
});

//const upload = multer({storage:storage})
var upload = (0, _multer["default"])({
  storage: _multer["default"].memoryStorage()
});
var router = (0, _express.Router)();
router.get('/getUsers', _notices.getUsers);
router.post('/updateUsers', _notices.updateUsers);
router.get('/getNotices', _notices.getNotices);
router.get('/noticesDetail/:id_notice', _notices.noticesDetail);
router.get('/putNoticeUser', _notices.putNoticeUser);
router.get('/notices', _notices.notices);
router.post('/createNotice', _notices.createNotice);
router.post('/acceptNotice/:id_notice', _notices.acceptNotice);
router.post('/closeNotice/:id_notice', _notices.closeNotice);
router.post('/updateNotice/:id_notice', _notices.updateNotice);
router.post('/addUserNotice/:id_notice', _notices.addUserNotice);
router.post('/exitUserNotice', _notices.exitUserNotice); //parametos recibidos como req.query
router.get('/noticesHistory', _notices.noticesHistory);
router.get('/noticesUser_User/:id_notice', _notices.noticesUser_User);
router.post('/upload', upload.single('image'), _notices.uploadImages);
router.get('/getImages/:id_notice', _notices.getImages);

//enviar al archivo.js y luego enviar por axios
var _default = router;
exports["default"] = _default;