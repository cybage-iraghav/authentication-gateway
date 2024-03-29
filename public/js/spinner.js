/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************************!*\
  !*** ./resources/js/spinner.js ***!
  \*********************************/
var spinnerWrapperElement = $(".spinner-wrapper");
$(".nav-link, .page-link, a.btn, .btn-secondary, .btn-link, .btn-modal-action").not(".timezone .nav-link, #navbarDropdown, .btn-link[data-bs-toggle='modal'], .btn-secondary[data-bs-dismiss='modal']").click(function () {
  spinnerWrapperElement.css('opacity', '1');
  spinnerWrapperElement.css('display', 'flex');
});
$("button[type='submit']").click(function () {
  $("form").submit(function () {
    spinnerWrapperElement.css('opacity', '1');
    spinnerWrapperElement.css('display', 'flex');
  });
}); // turn off spinner when page is loaded

$(document).ready(function () {
  spinnerWrapperElement.css('opacity', '0');
  spinnerWrapperElement.css('display', 'none');
}); // turn off spinner if back button is clicked

$(window).on('pageshow', function () {
  spinnerWrapperElement.css('opacity', '0');
  spinnerWrapperElement.css('display', 'none');
});
/******/ })()
;