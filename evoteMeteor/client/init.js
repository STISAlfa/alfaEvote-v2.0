Meteor.startup(function (){
	Session.setDefault('sudahVoting', false);
	Session.setDefault('sudahLogin', false);
	Session.setDefault('erorLogin', 'validate');
});