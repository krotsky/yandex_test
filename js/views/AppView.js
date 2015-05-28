// global
var app = app || {};
app.template = function (id) {
  return _.template($('#' + id).html());
};

(function ($) {
  'use strict';

  // main app view
  app.AppView = Backbone.View.extend({

    /* delegating main events app like:
          create tasks and move between statuses */
    events: {
      'keypress #createTask':    'createTask'
    },

    template: app.template('appView'),

    initialize: function () {
      this.template = app.template('appView');
      this.$el.html(this.template());
      this.$input = this.$('#createTask');

      this.listenTo(app.tasks, 'add', this.add);
      this.listenTo(app.tasks, 'all', this.render);

      app.tasks.fetch();
    },

    // render task colection
    render: function () {
      $('#waiting, #during, #completed').html('');
      this.appendSorted(app.tasks.sortByStatus(app.tasks));
    },

    // add new task
    add: function () {
      this.render;
    },

    // record attributes in the new task
    newAttributes: function () {
      return {
        title: this.$input.val().trim(),
        status: 'waiting'
      };
    },

    // creat task after pushing Return key
    createTask: function (e) {
      if (e.which !== app.ENTER_KEY || !this.$input.val().trim()) {
        return;
      }

      app.tasks.create(this.newAttributes());
      this.$input.val('');
    },

    appendSorted: function(array) {
      _.each(array, function(obj){
        var model = obj.model;
        var view = new app.TaskView({model: model});
        if (obj.status === 'waiting') {
          $('#waiting').append(view.render().el);
        }
        if (obj.status === 'during') {
          $('#during').append(view.render().el);
        }
        if (obj.status === 'completed') {
          $('#completed').append(view.render().el);
        }
      });
    }

  });

})(jQuery);
