import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Events } from '../api/events.js';

import './components/events/events.js';
import './components/add_event/add_event.js';
import './components/edit_event/edit_event.js';
import './components/login_form/login_form.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  // show events by categories
  Session.set( "searchCategory", "All" );
  Session.set( "searchName", "" );
  Meteor.subscribe('events');
});

Template.body.helpers({
  eventsCount() {
      return Events.find().count();
  },
  categories() {
    // damn distinct
    return _.uniq(Events.find({}, {
      sort: {category: 1}, fields: {category: true}
    }).fetch().map(function(x) {
      return x.category;
    }), true);
  },
  searchCategory() {
    return Session.get("searchCategory");
  }
});

Template.body.events({
  'click .select-category': function( event ) {
    event.preventDefault();
    const category = event.target.innerHTML;
    Session.set( "searchCategory", category );
  },
  'keyup .select-name': function( event ) {
    // event.preventDefault();
    const name = event.target.value;
    Session.set( "searchName", name );
  }
});
