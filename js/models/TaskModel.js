// global
var app = app || {};

(function () {
  'use strict';

  // create task model
  app.Task = Backbone.Model.extend({

    // basic task has title and status attribute
    defaults: {
      title: '',
      status: 'waiting'
    }

  });

})();