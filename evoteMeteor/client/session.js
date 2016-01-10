Session.setDefault('sudahVoting', false);
Session.setDefault('sudahLogin', false);
Session.setDefault('erorLogin', 'validate');
Session.setDefault('angkatan', 1);

Template.registerHelper('erorLogin',function(input){
  return Session.get("erorLogin");
});
