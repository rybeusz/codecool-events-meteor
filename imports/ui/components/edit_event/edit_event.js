/**
 * Created by rybeusz on 20.05.17.
 */
import './edit_event.html';

Template.edit_event.events({
  'submit .edit-event'(event) {
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const name = target.name.value;
    const category = target.category.value;
    const description = target.description.value;
    const time = target.time.value;

    // Insert a task into the collection
    Meteor.call('events.update', this._id, name, category, description, time);

    $('#edit' + this._id).modal('hide');
  },
});