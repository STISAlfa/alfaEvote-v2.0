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
	}
});	