"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
console.log('NoticesDetail');

//const container1 = document.getElementById('uploadContainer')
//const datosCont = container1.dataset.id-notice

document.addEventListener('DOMContentLoaded', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
  var container, id_notice, response, noticeImage, carouselInner, response1, noticesUser_User, card, userEntrance, cardcontainer;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        container = document.getElementById('uploadContainer');
        id_notice = container.getAttribute('data-id-notice');
        console.log(id_notice);
        _context.prev = 3;
        _context.next = 6;
        return axios.get("/getImages/".concat(id_notice));
      case 6:
        response = _context.sent;
        noticeImage = response.data;
        console.log(noticeImage);
        carouselInner = document.getElementById('carousel-inner');
        noticeImage.forEach(function (image, index) {
          var div = document.createElement('div');
          div.className = "carousel-item".concat(index === 0 ? ' active' : '');
          var img = document.createElement('img');
          img.src = "/uploads/resized_".concat(image.imagename);
          img.className = 'd-block w-100';
          img.alt = "Image ".concat(index + 1);
          div.appendChild(img);
          carouselInner.appendChild(div);
        });
        _context.next = 16;
        break;
      case 13:
        _context.prev = 13;
        _context.t0 = _context["catch"](3);
        console.error('Error al obtener las imágenes:', _context.t0);
      case 16:
        _context.prev = 16;
        _context.next = 19;
        return axios.get("/noticesUser_User/".concat(id_notice));
      case 19:
        response1 = _context.sent;
        noticesUser_User = response1.data;
        console.log(noticesUser_User);
        noticesUser_User.map(function (item, index) {
          console.log(index, new Date(item.endtime) - new Date(item.starttime));
        });
        card = "\n        <div class=\"card\" style=\"width: 18rem;\">\n            <div class=\"card-header\">\n                Entradas\n            </div>\n            ".concat(noticesUser_User.map(function (item) {
          return "\n                ".concat(item.endtime ? "\n            <ul class=\"list-group list-group-flush\">\n                <li class=\"list-group-item\">".concat(item.name, "</li>\n                <li class=\"list-group-item\">").concat(item.comment ? item.comment : '', "</li>\n                <li class=\"list-group-item\">").concat(item.starttime ? item.starttime : '', "</li>\n                <li class=\"list-group-item\">").concat(item.endtime ? item.endtime : '', "</li>\n                <li class=\"list-group-item\">").concat(item.endtime, "</li>\n            </ul>\n                ") : '', "\n            ");
        }).join(''), "\n        </div>\n        ");
        userEntrance = "\n        <div class=\"accordion\" id=\"accordionExample\">\n            ".concat(noticesUser_User.map(function (item, index) {
          return "\n                ".concat(item.endtime ? "\n                <div class=\"accordion-item\">\n                    <h2 class=\"accordion-header\">\n                    <button class=\"accordion-button collapsed\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapse".concat(index, "\" aria-expanded=\"false\" aria-controls=\"collapse").concat(index, "\">\n                        ").concat(item.name, "\n                    </button>\n                    </h2>\n                    <div id=\"collapse").concat(index, "\" class=\"accordion-collapse collapse\" data-bs-parent=\"#accordionExample\">\n                    <div class=\"accordion-body\">\n                        <ul class=\"list-group list-group-flush\">\n                            <li class=\"list-group-item\">").concat(item.comment ? item.comment : '', "</li>\n                            <li class=\"list-group-item\">").concat(item.starttime ? item.starttime.toLocaleString() : '', "</li>\n                            <li class=\"list-group-item\">").concat(item.endtime ? item.endtime.toLocaleString() : '', "</li>\n                            <li class=\"list-group-item\">").concat(((new Date(item.endtime) - new Date(item.starttime)) / (1000 * 60)).toFixed(0) + ' Min', "</li>\n                        </ul>\n                    </div>\n                    </div>\n                </div>\n                ") : '', "\n            ");
        }).join(''), "\n        </div>\n                ");
        cardcontainer = document.getElementById('cardcontainer');
        cardcontainer.innerHTML = userEntrance;
        _context.next = 32;
        break;
      case 29:
        _context.prev = 29;
        _context.t1 = _context["catch"](16);
        console.error('Error al obtener noticesUser_User:', _context.t1);
      case 32:
      case "end":
        return _context.stop();
    }
  }, _callee, null, [[3, 13], [16, 29]]);
})));