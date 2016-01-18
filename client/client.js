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
			    	Session.setPersistent('tipeUser', 'user');
			      	Session.setPersistent('user', user);
			      	Session.setPersistent('sudahLogin', true);
			      	Session.setPersistent('angkatan', user[0]);
			      	Meteor.call('addLoginLog', user);
			    	FlowRouter.go('vote');}
			    else{
			    	event.target.user.value = "";
			    	Session.setPersistent('erorLogin', 'invalid');
			    	Materialize.toast('<div class="white-text" style="font-style: bold;font-weight: 900;"> Password Tidak Dapat Digunakan </div>', 4000, 'red darken-3');}
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
				if (err) {
					console.log(err);
				}
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
			$( ".btn-large" ).removeClass( "red" );
			$( ".btn-large" ).addClass( "green" );
			$( "#icons" ).removeClass( "mdi-content-block" );
			$( "#icons" ).addClass( "mdi-action-done-all" );
			//$( "#icons" ).addClass( "green" );
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


Template.result.helpers({
  hasilSema : function(){
       return Session.get('VoteRes').hasilSema;
  },
  hasilAngkatan : function(){
       return Session.get('VoteRes').hasilAngkatan;
  }
});


Template.result.helpers({
	jumlahSuara : function(arr,a,b){
  		var ans = 0;
  		for (var i = a; i <= b; i++) {
  			ans += arr[i];
  		};
  		return ans;
  	},
	hasilPemiraSemaChart : function() {
	    return {
		chart: {
		    plotBackgroundColor: null,
		    plotBorderWidth: null,
		    plotShadow: false
		},
		title: {
		    text: "Hasil Pemilihan Ketua dan Wakil Ketua SEMA periode 2016-2017"
		},
		tooltip: {
		    pointFormat: '<b>Suara : {point.y}</b>'
		},
		plotOptions: {
		    pie: {
		        allowPointSelect: true,
		        cursor: 'pointer',
		        dataLabels: {
		            enabled: true,
		            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		            style: {
		                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
		                fontSize: '18px'
		            },
		            connectorColor: 'silver'
		        }
		    }
		},
		series: [{
		    type: 'pie',
		    name: 'hasil pemira sema',
		    data: [
		        ['Calon nomor 1',   Session.get('VoteRes').hasilSema[0]],
		        ['Calon nomor 2',   Session.get('VoteRes').hasilSema[1]]
		    ]
		}]
	    };
	},
	hasilPemiraTingkat1Chart : function() {
	    return {
		chart: {
		    plotBackgroundColor: null,
		    plotBorderWidth: null,
		    plotShadow: false
		},
		title: {
		    text: "Hasil Pemilihan Ketua Tingkat 1 periode 2016-2017"
		},
		tooltip: {
		    pointFormat: '<b>Suara : {point.y}</b>'
		},
		plotOptions: {
		    pie: {
		        allowPointSelect: true,
		        cursor: 'pointer',
		        dataLabels: {
		            enabled: true,
		            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		            style: {
		                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
		                fontSize: '18px'
		            },
		            connectorColor: 'silver'
		        }
		    }
		},
		series: [{
		    type: 'pie',
		    name: 'hasil pemira tingkat 1',
		    data: [
		        ['Calon nomor 1',   Session.get('VoteRes').hasilAngkatan[0]],
		        ['Calon nomor 2',   Session.get('VoteRes').hasilAngkatan[1]],
		        ['Calon nomor 3',   Session.get('VoteRes').hasilAngkatan[2]]
		    ]
		}]
	    };
	},
	hasilPemiraTingkat2Chart : function() {
	    return {
		chart: {
		    plotBackgroundColor: null,
		    plotBorderWidth: null,
		    plotShadow: false
		},
		title: {
		    text: "Hasil Pemilihan Ketua Tingkat 2 periode 2016-2017"
		},
		tooltip: {
		    pointFormat: '<b>Suara : {point.y}</b>'
		},
		plotOptions: {
		    pie: {
		        allowPointSelect: true,
		        cursor: 'pointer',
		        dataLabels: {
		            enabled: true,
		            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		            style: {
		                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
		                fontSize: '18px'
		            },
		            connectorColor: 'silver'
		        }
		    }
		},
		series: [{
		    type: 'pie',
		    name: 'hasil pemira tingkat 2',
		    data: [
		        ['Calon nomor 1',   Session.get('VoteRes').hasilAngkatan[3]],
		        ['Calon nomor 2',   Session.get('VoteRes').hasilAngkatan[4]]
		    ]
		}]
	    };
	},
	hasilPemiraTingkat3Chart : function() {
	    return {
		chart: {
		    plotBackgroundColor: null,
		    plotBorderWidth: null,
		    plotShadow: false
		},
		title: {
		    text: "Hasil Pemilihan Ketua Tingkat 3 periode 2016-2017"
		},
		tooltip: {
		    pointFormat: '<b>Suara : {point.y}</b>'
		},
		plotOptions: {
		    pie: {
		        allowPointSelect: true,
		        cursor: 'pointer',
		        dataLabels: {
		            enabled: true,
		            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		            style: {
		                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
		                fontSize: '18px'
		            },
		            connectorColor: 'silver'
		        }
		    }
		},
		series: [{
		    type: 'pie',
		    name: 'hasil pemira tingkat 3',
		    data: [
		        ['Calon nomor 1',   Session.get('VoteRes').hasilAngkatan[5]],
		        ['Calon nomor 2',   Session.get('VoteRes').hasilAngkatan[6]]
		    ]
		}]
	    };
	},
	hasilPemiraTingkat4Chart : function() {
	    return {
		chart: {
		    plotBackgroundColor: null,
		    plotBorderWidth: null,
		    plotShadow: false
		},
		title: {
		    text: "Hasil Pemilihan Ketua Tingkat 4 periode 2016-2017"
		},
		tooltip: {
		    pointFormat: '<b>Suara : {point.y}</b>'
		},
		plotOptions: {
		    pie: {
		        allowPointSelect: true,
		        cursor: 'pointer',
		        dataLabels: {
		            enabled: true,
		            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		            style: {
		                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
		                fontSize: '18px'
		            },
		            connectorColor: 'silver'
		        }
		    }
		},
		series: [{
		    type: 'pie',
		    name: 'hasil pemira tingkat 4',
		    data: [
		        ['Calon nomor 1',   Session.get('VoteRes').hasilAngkatan[7]],
		        ['Calon nomor 2',   Session.get('VoteRes').hasilAngkatan[8]],
		        ['Calon nomor 3',   Session.get('VoteRes').hasilAngkatan[9]]
		    ]
		}]
	    };
	},

});


Template.result.rendered = function(){
	this.$('.scrollspy').scrollSpy();
};

Template.adminLogin.events({
	"submit .login-form": function (event) {
	    event.preventDefault();
	    user = event.target.user.value;
	    
	    Meteor.subscribe('Admin',user,{
	    	onReady: function () { 
	    		ada = Admin.findOne({});
	    		
			    if (typeof(ada) == "object") {
			    	Session.setPersistent('tipeUser', 'admin');
			      	Session.setPersistent('user', user);
			      	Session.setPersistent('sudahLogin', true);
			      	Session.setPersistent('angkatan', '5');
			      	Meteor.call('addLoginLog', user);
			    	FlowRouter.go('result');}
			    else{
			    	event.target.user.value = "";
			    	Session.setPersistent('erorLogin', 'invalid');
			    	Materialize.toast('<div class="red-text" style="font-style: bold;font-weight: 900;"> Password Salah </div>', 4000, 'blue-grey darken-1');}
	    	}
	    });
	}
});

Template.adminHome.rendered = function(){
	var self = this;
	self.$('.button-collapse').sideNav();
	self.$('.collapsible').collapsible({
    	accordion: false
  	});
  	self.$('.collapsible').collapsible();
};

Template.header.rendered = function(){
	var self = this;
	self.$('.button-collapse').sideNav();
  	self.$('.collapsible').collapsible();
  	self.$('.scrollspy').scrollSpy();
};

Template.header.events({
	'click .data': function (event) {
		FlowRouter.go('adminHome');
	},
	'click .result': function (event) {
		FlowRouter.go('result');
	},
	'click .logout': function (event) {
		event.preventDefault();
		Session.setPersistent('sudahLogin',false);
		Session.setPersistent('tipeUser','');
		Session.setPersistent('user','');
		Session.setPersistent('angkatan',null);
		FlowRouter.go('admin');
	}
});


Template.registerHelper('cekTipeUser', function (tipeUser){
	var regUser = Session.get('tipeUser');
	//console.log(tipeUser);
	if( regUser === tipeUser ){
		return true;
	}
	return false;
});
