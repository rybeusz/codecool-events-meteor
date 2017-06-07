import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Events } from '../../../api/events.js';


import './events.html';

Template.event.helpers({
  events() {
    const category = Session.get("searchCategory");
    const name = Session.get("searchName");
    const searchName = new RegExp(name, 'i');
    let query = {};
    if (category != "All") {
      query = {name: {$regex: searchName},category: category};
    } else {
      query = {name: {$regex: searchName}};
    }
    return Events.find(query);
  },
  correctTime() {
    const timeToFormat = this.time;
    return timeToFormat.substr(0,10) + " " + timeToFormat.substr(10+1);
  },
});

Template.event.events({
  'click .delete'() {
    Meteor.call('events.remove', this._id);
  },
});
