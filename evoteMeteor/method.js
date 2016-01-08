Meteor.methods({
	addLoginLog: function(pw){
		LoginLog.insert({
	        user: pw,
	        loginAt: new Date() // current time
	      });
	}
});