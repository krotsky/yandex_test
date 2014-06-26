var app = app || {};

(function () {
  'use strict';

  var Tasks = Backbone.Collection.extend({

    // collection model
    model: app.Task,

    // create app local storage
    localStorage: new Backbone.LocalStorage('taskStorage'),

  });

  app.tasks = new Tasks();
})();