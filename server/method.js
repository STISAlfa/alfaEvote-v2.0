Meteor.methods({
	addLoginLog: function(user){
		if (LoginLog.find({user : user})){
			LoginLog.update({user : user}, {loginAt: new Date()});
		}
		else{
			LoginLog.insert({
		        user: user,
		        loginAt: new Date() // current time
		    });
		}
	},
	addVotingResult: function(user,kodeSema,kodeAngkatan){
		VotingResult.insert({
	        user: user,
	        kodeSema : kodeSema,
	        kodeAngkatan : kodeAngkatan,
	        waktuMilih: new Date() // current time
	    });
	}
});	