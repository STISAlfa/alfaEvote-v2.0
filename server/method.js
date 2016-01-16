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
	},
	getVotingResult: function(){
		var VotingResultAll = {};
		var iniKodeSema = ["1","2"];
		var VotingResultSema = [];
		for(i=0;i<iniKodeSema.length;i++){
			VotingResultSema.push(VotingResult.find({kodeSema: iniKodeSema[i]}).count());
		}
		//console.log(VotingResultSema);

		var iniKodeCalonAngkatan = ["11","12","13","21","22","31","32","41","42","43"];
		var VotingResultAngkatan = [];
 		for(j=0;j<iniKodeCalonAngkatan.length;j++){
			VotingResultAngkatan.push(VotingResult.find({kodeAngkatan: iniKodeCalonAngkatan[j]}).count());		
		}		
		VotingResultAll = {
			hasilSema : VotingResultSema,	
			hasilAngkatan : VotingResultAngkatan	
		};
		//console.log(VotingResultAll);
		return VotingResultAll;        
	}
});	
