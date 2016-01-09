Meteor.methods({
	addLoginLog: function(user){
		LoginLog.insert({
	        user: user,
	        loginAt: new Date() // current time
	    });
	}
});