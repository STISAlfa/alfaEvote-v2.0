Template.loginM.events({
  	"submit .login-form": function (event) {

	    // Prevent default browser form submit
	    event.preventDefault();
	    // Get value from form element
	    user = event.target.user.value;
	    Meteor.subscribe('Users',user,{
	    	onReady: function () { 
	    		ada = Users.findOne({});
	    		// Insert a task into the collection
			    if (typeof(ada) == "object") {
			      	Meteor.call('addLoginLog', user);
			      	Session.setPersistent('sudahLogin', true);
			      	Session.setPersistent('angkatan', user[0]);
			    	FlowRouter.go('vote');}
			    else{
			    	event.target.user.value = "";
			    	Session.setPersistent('erorLogin', 'invalid');
			    	Materialize.toast('<h4>Password Salah</h4>', 4000, 'blue-grey darken-1');}
	    	}
	    });
  	}
});

Template.voting.onCreated(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe("CalonSema");
		self.subscribe("CalonAngkatan",Session.get('angkatan'));
	});
});

Template.registerHelper('erorLogin',function(input){
  return Session.get("erorLogin");
});