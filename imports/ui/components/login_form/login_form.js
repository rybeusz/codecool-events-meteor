/**
 * Created by rybeusz on 30.05.17.
 */
import './login_form.html';

// Template.login_form.events({
//   'click .at-link': function( event ) {
//     $('#signInModal').modal('hide');
//   },
// });
const modalHideHook = function(error, state){
  if (!error) {
    if (state === "signIn") {
      $('#signInModal').modal('hide');
    }
    if (state === "signUp") {
      $('#signInModal').modal('hide');
    }
  }
};

AccountsTemplates.configure({
  onSubmitHook: modalHideHook
});