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
			    	Materialize.toast('<div class="white-text" style="font-style: bold;font-weight: 900;"> Password Salah </div>', 4000, 'red darken-3');}
	    	}
	    });
  	}
});

Template.voting.events({
	'submit .VoteForm': function (event) {
		event.preventDefault();

		user 			= Session.get('user');	
		kodeSema 		= $("input[name='sema']:checked").val(); 		//getVoteSema still not implemented
		kodeAngkatan 	= $("input[name='ketuatingkat']:checked").val(); 	//getVoteAngkatan still not implemented
		
		if ((typeof kodeSema == 'undefined') || (typeof kodeAngkatan == 'undefined'))
		{
			Materialize.toast('<div class="white-text" style="font-style: bold;font-weight: 600;"> Harap Memilih Kandidat SEMA dan Kandidat Tingkat</div>', 4000, 'red darken-3');
		}
		else {
			Session.setPersistent('sudahVote', true);
			Meteor.call('addVotingResult', user,kodeSema,kodeAngkatan, function(err, data) {
				if (err) console.log(err);
			 	else {
			 		//console.log('Sukses COK',kodeSema,kodeAngkatan);
			 		FlowRouter.go('thankyou'); 
			 	}
			});
		}
	},
	'click #sema,#ketuatingkat':function(event){
		kodeSema 		= $("input[name='sema']:checked").val(); 		//getVoteSema still not implemented
		kodeAngkatan 	= $("input[name='ketuatingkat']:checked").val(); 	//getVoteAngkatan still not implemented
		
		if ((typeof kodeSema != 'undefined') && (typeof kodeAngkatan != 'undefined'))
		{
			$( ".btn-large" ).removeClass( "disabled" )
		}
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