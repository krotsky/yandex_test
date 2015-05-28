var app = app || {};

(function () {
  'use strict';

  var Tasks = Backbone.Collection.extend({

    // collection model
    model: app.Task,

    // create app local storage
    localStorage: new Backbone.LocalStorage('taskStorage'),

    sortByStatus: function(tasks) {
      var array = [];
      var obj = {};
      _.each(tasks.models, function (model) {
        var status;
        if (model.get('status') === 'waiting') {
          status = 'waiting';
        }
        if (model.get('status') === 'during') {
          status = 'during';
        }
        if (model.get('status') === 'completed') {
          status = 'completed';
        }
        obj = {
          status: status,
          model: model
        };
        array.push(obj);
      });
      return array;
    }

  });

  app.tasks = new Tasks();
})();