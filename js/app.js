// global
var app = app || {};
app.ENTER_KEY = 13;
app.template = function (id) {
  return _.template($('#' + id).html());
};

$(function () {
  'use strict';

  // create Task Manager
  new app.AppView({
    // app static element
    el: '#managerApp'
  });
  Backbone.history.start();
});