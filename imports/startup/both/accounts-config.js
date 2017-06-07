import { Accounts } from 'meteor/accounts-base';

let pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
    _id: "username",
    type: "text",
    displayName: "username",
    required: true,
    minLength: 5,
  },
  pwd
]);
AccountsTemplates.configure({
  // Behavior
  confirmPassword: true,
  enablePasswordChange: false,
  forbidClientAccountCreation: true,
  sendVerificationEmail: false,
});
