"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _axios = _interopRequireDefault(require("https://cdn.skypack.dev/axios"));
console.log('noticess');
function fetchData() {
  return _fetchData.apply(this, arguments);
}
function _fetchData() {
  _fetchData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var badge, response, noticesData, acceptedNotices, badges, tableHTML, tableContainer;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          badge = /*#__PURE__*/function () {
            var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id_notice) {
              var response1, noticesUser_User, noticesUser_UserFilter, noticesUser_UserLength;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return _axios["default"].get("/noticesUser_User/".concat(id_notice));
                  case 3:
                    response1 = _context.sent;
                    noticesUser_User = response1.data;
                    noticesUser_UserFilter = noticesUser_User.filter(function (item) {
                      return item.status === 'active' && !item.endtime;
                    });
                    noticesUser_UserLength = noticesUser_UserFilter.length;
                    return _context.abrupt("return", noticesUser_UserLength);
                  case 10:
                    _context.prev = 10;
                    _context.t0 = _context["catch"](0);
                    console.error('Error al obtener noticesUser_User:', _context.t0);
                    return _context.abrupt("return", 0);
                  case 14:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[0, 10]]);
            }));
            return function badge(_x) {
              return _ref.apply(this, arguments);
            };
          }();
          _context2.next = 4;
          return _axios["default"].get('/getNotices');
        case 4:
          response = _context2.sent;
          noticesData = response.data;
          acceptedNotices = noticesData.filter(function (item) {
            return item.status == 2;
          });
          _context2.next = 9;
          return Promise.all(acceptedNotices.map(function (item) {
            return badge(item.id);
          }));
        case 9:
          badges = _context2.sent;
          tableHTML = "\n      <table class=\"table table-striped table-sm\">\n        <thead>\n          <tr>\n            <th>#</th>\n            <th>Equipo</th>\n            <th>Novedad</th>\n            <th>Hora registro</th>\n            <th>Hora inicio</th>\n            <th>T\xE9cnico</th>\n          </tr>\n        </thead>\n        <tbody>\n          ".concat(acceptedNotices.map(function (item, index) {
            return "\n            <tr>\n              <td>\n                <a href=\"/noticesDetail/".concat(item.id, "\" class=\"btn btn-secondary rounded-2\">").concat(item.id, "</a>                                                   \n              </td>\n              <td>").concat(item.machine, "</td>\n              <td>").concat(item.message, "</td>\n              <td>").concat(item.regtime, "</td>\n              <td>").concat(item.starttime, "</td>\n              <td>").concat(item.technician, "</td>\n              <td> <!-- Se abre una celda para el formulario -->\n                <form id=\"addUserNoticeForm").concat(item.id, "\" action=\"/addUserNotice/").concat(item.id, "\" method=\"post\">\n                  <label class=\"visually-hidden\">Novedad</label>\n                  <input type=\"password\" class=\"form-control\" placeholder=\"+\" required name=\"pass\" id=\"pass-").concat(item.id, "\">\n                  <button type=\"submit\" class=\"btn btn-secondary rounded-2\"> + <span class=\"badge text-bg-warning\">").concat(badges[index], "</span></button>  \n                </form>\n              </td>\n              <td> <!-- Se abre una celda para el formulario -->\n                <form id=\"closeForm").concat(item.id, "\" action=\"/closeNotice/").concat(item.id, "\" method=\"post\">\n                  <label class=\"visually-hidden\">Novedad</label>\n                  <input type=\"textarea\" class=\"form-control\" placeholder=\"Descripci\xF3n\" required name=\"description\" id=\"description-").concat(item.id, "\">\n                  <button type=\"submit\" class=\"btn btn-secondary rounded-2\">Cerrar</button>  \n                </form>\n              </td>\n            </tr>\n          ");
          }).join(''), "\n        </tbody>\n      </table>\n    "); // Inject table into HTML
          tableContainer = document.getElementById('table-container');
          tableContainer.innerHTML = tableHTML;
          _context2.next = 18;
          break;
        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 15]]);
  }));
  return _fetchData.apply(this, arguments);
}
fetchData();
{/* <form id="closeForm${item.id}" action="/closeNotice/${item.id}" method="post">
                <td>
                  <label  class="visually-hidden">Novedad</label>
                  <input type="textarea" class="form-control" placeholder="Descripción" required name="description" id="description-${item.id}">
                </td>
                <td class="col-2">
                  <button type="submit" class="btn btn-secondary rounded-2">Cerrar</button>                         
                </td>
              </form> */}

// Add event listeners to close forms (optional)
/* acceptedNotices.forEach(item => {
  const closeForm = document.getElementById(`closeForm${item.id}`);
  console.log(closeForm);
  if (closeForm) {
    closeForm.addEventListener('submit', handleCloseForm); // Assuming a function to handle submission
  }
}); */

function handleCloseForm(event) {
  event.preventDefault(); // Prevent default form submission
  console.log('ji');
  // Use Fetch API for modern approach (example)
  /* const formData = new FormData(event.target); // Extract form data
  fetch(event.target.action, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      // Update table or display success message
    } else {
      // Handle errors
    }
  })
  .catch(error => {
    console.error('Error closing notice:', error);
  }); */

  // Or use form.submit() for legacy approach (might reload page)
  // event.target.submit();
}

/* try {
  const response = await fetch('/getNotices')
  if (!response.ok) {
    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`)
  }
  noticesData = await response.json()
  console.log('Datos recibidos "noticesData": ', noticesData);
} catch (error) {
  console.error('Error al realizar la solicitud:', error.message)
  //window.location.reload()
} */

//console.log(acceptedNotices);

/* document.addEventListener('DOMContentLoaded', function() {
    const table = document.querySelector('table'); // Assuming table is the parent
  
    table.addEventListener('click', function(event) {
      if (event.target.matches('button')) { // Check if clicked element is a button
        console.log('boton');
        const form = event.target.closest('form'); // Find closest form element
        if (form) {
            console.log('si form');
            const passwordInput = form.querySelector('#pass-' + form.id.split('-')[1]); // Dynamically get input by ID
            passwordInput.addEventListener('keyup', function() {
              if (this.value.length < 4) {
                alert('La contraseña debe tener al menos 8 caracteres.');
                this.focus();
                return false; // Prevent form submission (valid here)
              }
            });
        }else{
            console.log('no form');
        }
      }
    });
  }); */

/* document.addEventListener('DOMContentLoaded', function() {//We use DOMContentLoaded to ensure the script runs after the HTML content is loaded. The DOMContentLoaded event ensures the script runs after the form elements are available in the DOM.
    const forms = document.querySelectorAll('form'); // Select all forms
    console.log('forms ' + forms.length);
    if (forms.length > 0) {
        forms.forEach(form => {
            const passwordInput = form.querySelector('#pass-' + form.id.split('-')[1]); // Dynamically get input by ID
            passwordInput.addEventListener('keyup', function() {
              if (this.value.length < 8) {
                alert('La contraseña debe tener al menos 8 caracteres.');
                this.focus();
                return false; // Prevent form submission (valid here)
              }
            });
          });
    } else {
        console.warn('No forms found in the document.')
    }
    
  }); */

/* const passwordInput = document.getElementById('pass1');
if (passwordInput.value.length < 8) {
  alert('La contraseña debe tener al menos 8 caracteres.');
  passwordInput.focus();
  return false; // Prevent form submission
} */