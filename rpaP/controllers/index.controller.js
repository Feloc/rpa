"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inicio = exports.contact = exports.about = void 0;
var inicio = function inicio(req, res) {
  res.render('index', {
    title: 'PMP'
  });
};
exports.inicio = inicio;
var about = function about(req, res) {
  res.render('about');
};
exports.about = about;
var contact = function contact(req, res) {
  res.render('contact');
};
exports.contact = contact;