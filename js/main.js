'use strict';
var app = app || {};


app.template = function (id) {
  return _.template( $('#' + id).html() );
}


app.Person = Backbone.Model.extend({

  defaults: {
    name: 'roma',
    age: 25,
    job: 'javascript-developer'
  }

});

var person = new app.Person({sex: 'man'});

app.PersonView = Backbone.View.extend({

  tagName: 'li',

  template: app.template('person'),

  initialize: function () {
    this.render();
    $('#waiting').append(this.el);
  },

  render: function () {
    this.$el.html( this.template(this.model.toJSON()) );
  }

});

var personView = new app.PersonView({model: person});