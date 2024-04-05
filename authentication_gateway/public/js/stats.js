/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./resources/js/stats.js ***!
  \*******************************/
$(document).ready(function () {
  $("#test").CreateMultiCheckBox({
    width: '230px',
    defaultText: 'Select Below',
    height: '250px'
  });
  $(document).on("click", ".MultiCheckBox", function () {
    var detail = $(this).next();
    detail.show();
  });
  $(document).on("click", ".MultiCheckBoxDetailHeader input", function (e) {
    e.stopPropagation();
    var hc = $(this).prop("checked");
    $(this).closest(".MultiCheckBoxDetail").find(".MultiCheckBoxDetailBody input").prop("checked", hc);
    $(this).closest(".MultiCheckBoxDetail").next().UpdateSelect();
  });
  $(document).on("click", ".MultiCheckBoxDetailHeader", function (e) {
    var inp = $(this).find("input");
    var chk = inp.prop("checked");
    inp.prop("checked", !chk);
    $(this).closest(".MultiCheckBoxDetail").find(".MultiCheckBoxDetailBody input").prop("checked", !chk);
    $(this).closest(".MultiCheckBoxDetail").next().UpdateSelect();
  });
  $(document).on("click", ".MultiCheckBoxDetail .cont input", function (e) {
    e.stopPropagation();
    $(this).closest(".MultiCheckBoxDetail").next().UpdateSelect();
    var val = $(".MultiCheckBoxDetailBody input:checked").length == $(".MultiCheckBoxDetailBody input").length;
    $(".MultiCheckBoxDetailHeader input").prop("checked", val);
  });
  $(document).on("click", ".MultiCheckBoxDetail .cont", function (e) {
    var inp = $(this).find("input");
    var chk = inp.prop("checked");
    inp.prop("checked", !chk);
    var multiCheckBoxDetail = $(this).closest(".MultiCheckBoxDetail");
    var multiCheckBoxDetailBody = $(this).closest(".MultiCheckBoxDetailBody");
    multiCheckBoxDetail.next().UpdateSelect();
    var val = $(".MultiCheckBoxDetailBody input:checked").length == $(".MultiCheckBoxDetailBody input").length;
    $(".MultiCheckBoxDetailHeader input").prop("checked", val);
  });
  $(document).mouseup(function (e) {
    var container = $(".MultiCheckBoxDetail");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.hide();
    }
  });
});
var defaultMultiCheckBoxOption = {
  width: '220px',
  defaultText: 'Select Below',
  height: '200px'
};
jQuery.fn.extend({
  CreateMultiCheckBox: function CreateMultiCheckBox(options) {
    var localOption = {};
    localOption.width = options != null && options.width != null && options.width != undefined ? options.width : defaultMultiCheckBoxOption.width;
    localOption.defaultText = options != null && options.defaultText != null && options.defaultText != undefined ? options.defaultText : defaultMultiCheckBoxOption.defaultText;
    localOption.height = options != null && options.height != null && options.height != undefined ? options.height : defaultMultiCheckBoxOption.height;
    this.hide();
    this.attr("multiple", "multiple");
    $('#test option').prop('selected', true);
    var divSel = $("<div class='MultiCheckBox form-control'>" + localOption.defaultText + "</div>").insertBefore(this);
    divSel.css({
      "width": localOption.width
    });
    var detail = $("<div class='MultiCheckBoxDetail'><div class='MultiCheckBoxDetailHeader'><div class='cont'><input type='checkbox' class='mulinput' value='-1982' /><div>Select All</div></div></div><div class='MultiCheckBoxDetailBody'></div></div>").insertAfter(divSel);
    detail.css({
      "width": parseInt(options.width),
      "max-height": localOption.height
    });
    var multiCheckBoxDetailBody = detail.find(".MultiCheckBoxDetailBody");
    this.find("option").each(function () {
      var val = $(this).attr("value");
      if (val == undefined) val = '';
      multiCheckBoxDetailBody.append("<div class='cont'><input type='checkbox' class='mulinput' value='" + val + "' /><div>" + $(this).text() + "</div></div>");
    });
    multiCheckBoxDetailBody.css("max-height", parseInt($(".MultiCheckBoxDetail").css("max-height")) - 42 + "px");
  },
  UpdateSelect: function UpdateSelect() {
    var arr = [];
    this.prev().find(".mulinput:checked").each(function () {
      arr.push($(this).val());
    });
    this.val(arr);
  }
});
/******/ })()
;