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
			      	Session.set('sudahLogin', true);
			      	Session.set('angkatan', user[0]);
			    	FlowRouter.go('vote');}
			    else{
			    	event.target.user.value = "";
			    	Session.set('erorLogin', 'invalid');
			    	Materialize.toast('<h4>Password Salah</h4>', 4000, 'red');}
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