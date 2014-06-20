var app = app || {};

(function () {
  'use strict';

  var Tasks = Backbone.Collection.extend({

    // collection model
    model: app.Task,

    // create app local storage
    localStorage: new Backbone.LocalStorage('taskStorage'),

    // sort tasks by status
    sortView: function (tasks) {
      _.each(tasks.models, function (view) {
        var view = new app.TaskView({ model: view });
        if (view.model.get('status') === 'waiting') {
          $('#waiting').append(view.render().el);
        }
        if (view.model.get('status') === 'during') {
          $('#during').append(view.render().el);
        }
        if (view.model.get('status') === 'completed') {
          $('#completed').append(view.render().el);
        }
      });
    }

  });

  app.tasks = new Tasks();
})();