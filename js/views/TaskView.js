// global
var app = app || {};
app.template = function (id) {
  return _.template($('#' + id).html());
};

(function ($) {
  'use strict';

  app.TaskView = Backbone.View.extend({

    // task is a list item
    tagName: 'li',

    // template for our task's view
    template: app.template('taskView'),

    // task view events
    events: {
      'click #destroy':    'clear',
      'dblclick label':    'edit',
      'keypress .edit':    'saveEditing',
      'blur .edit':        'close',
      'click [data-attr]': 'changeAttr'
    },

    // listen changes and destroy model
    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    // re-render the titles of the task item.
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.$input = this.$('.edit');
      app.view = this;
      return this;
    },

    // switch this view into 'editing' mode, displaying the input
    edit: function () {
      this.$el.addClass('editing');
      this.$input.focus();
    },

    // close and save
    close: function () {
      var trimmedValue = this.$input.val().trim();
      this.$input.val(trimmedValue);

      if (trimmedValue) {
        this.model.save({ title: trimmedValue });
      } else {
        this.clear();
      }

      this.$el.removeClass('editing');
    },

    // save edit
    saveEditing: function (e) {
      if (e.which === app.ENTER_KEY) {
        this.close();
      }
    },

    // remove this task from the view, destroy the model from localStorage and delete its view
    clear: function () {
      this.model.destroy();
    },

    // change status attribute
    changeAttr: function (key) {
      var buttonAttr = $(key.target).attr('data-attr');
      var modelAttr = this.model.get('status');
      if (modelAttr !== buttonAttr) {
        this.model.save({status: buttonAttr});
      }
      this.render();
    }

  });

})(jQuery);