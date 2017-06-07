/**
 * Created by rybeusz on 17.05.17.
 */
import './add_event.html';

Template.add_event.events({
  'submit .new-event'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const name = target.name.value;
    const category = target.category.value;
    const description = target.description.value;
    const time = target.time.value;
    // console.log(name, category, description, time);

    // Insert a task into the collection
    Meteor.call('events.insert', name, category, description, time);

    //Clear form
    target.name.value = '';
    target.category.value = '';
    target.description.value = '';
    target.time.value = '';
    $('#dupa').modal('hide');
  },
});