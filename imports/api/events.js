import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Events = new Mongo.Collection('events');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('events', function eventsPublication() {
    return Events.find();
  });
}

Meteor.methods({
  'events.insert'(name, category, description, time) {
    check(name, String);
    check(category, String);
    check(description, String);
    check(time, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.insert({
      name,
      description,
      category,
      time,
      createdAt: new Date(),
    });
  },
  'events.remove'(eventId) {
    check(eventId, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.remove(eventId);
  },
  'events.update'(eventId, name, category, description, time) {
    check(name, String);
    check(category, String);
    check(description, String);
    check(time, String);

    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.update(eventId, {
      $set: { name: name, category: category, description: description, time: time },
    });
  }
});
