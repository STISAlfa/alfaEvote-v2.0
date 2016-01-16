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
			    	Materialize.toast('<div class="red-text" style="font-style: bold;font-weight: 900;"> Password Salah </div>', 4000, 'blue-grey darken-1');}
	    	}
	    });
  	}
});

Template.loginM.helpers('erorLogin',function(input){
  return Session.get("erorLogin");
});

Template.voting.events({
	'submit .VoteForm': function () {
		event.preventDefault();

		user 			= Session.get('user');
		//kodeSema 		= event.target.sema.value; 		//getVoteSema still not implemented
		//kodeAngkatan 	= event.target.angkatan.value; 	//getVoteAngkatan still not implemented
		//Meteor.call('addVotingResult', user,kodeSema,kodeAngkatan);
		
		Session.setPersistent('sudahVote', true);
      	FlowRouter.go('thankyou'); 
	}
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
    },
    semaSize: function () {
    	return CalonSema.find().count();
    },
    angkatanSize: function () {
    	return CalonAngkatan.find().count();	
    },
    isEven: function (angka) {
    	if( angka % 2 == 0 ){
    		return true;
    	}
    	return false;
    }
});


Template.result.helpers({
  hasilSema : function(){
       return Session.get('VoteRes').hasilSema;
  },
  hasilAngkatan : function(){
       return Session.get('VoteRes').hasilAngkatan;
  }
});
