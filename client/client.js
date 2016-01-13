Template.loginM.events({
  	"submit .login-form": function (event) {

	    // Prevent default browser form submit
	    event.preventDefault();
	    // Get value from form element
	    user = event.target.user.value;
	    // Subscribe karena gak bisa langsung find tanpa subscribe
	    Meteor.subscribe('Users',user,{
	    	onReady: function () { 
	    		ada = Users.findOne({});
	    		// Insert a task into the collection
			    if (typeof(ada) == "object") {
			      	Session.setPersistent('user', user);
			      	Session.setPersistent('sudahLogin', true);
			      	Session.setPersistent('angkatan', user[0]);
			      	Meteor.call('addLoginLog', user);
			    	FlowRouter.go('vote');}
			    else{
			    	event.target.user.value = "";
			    	Session.setPersistent('erorLogin', 'invalid');
			    	Materialize.toast('Password Salah', 4000, 'blue-grey darken-1');}
	    	}
	    });
  	}
});

Template.registerHelper('erorLogin',function(input){
  return Session.get("erorLogin");
});

Template.voting.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe("CalonSema");
		self.subscribe("CalonAngkatan",Session.get('angkatan'));
	});
});

Template.voting.helpers({
    calonSema: function () {
        return CalonSema.find({});
    },
    calonAngkatan: function () {
        return CalonAngkatan.find({});
    }
});