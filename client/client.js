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


Template.result.helpers({
  hasilSema : function(){
       return Session.get('VoteRes').hasilSema;
  },
  hasilAngkatan : function(){
       return Session.get('VoteRes').hasilAngkatan;
  }
});


Template.result.helpers({
	hasilPemiraSemaChart : function() {
	    return {
		chart: {
		    plotBackgroundColor: null,
		    plotBorderWidth: null,
		    plotShadow: false
		},
		title: {
		    text: "Hasil Pemilihan Calon Ketua dan Wakil Ketua SEMA periode 2016-2017"
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
		                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		            },
		            connectorColor: 'silver'
		        }
		    }
		},
		series: [{
		    type: 'pie',
		    name: 'hasil pemira sema',
		    data: [
		        ['Calon nomor 1',   45.0],
		        ['Calon nomor 2',   55.0]
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
		                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		            },
		            connectorColor: 'silver'
		        }
		    }
		},
		series: [{
		    type: 'pie',
		    name: 'hasil pemira tingkat 1',
		    data: [
		        ['Calon nomor 1',   45.0],
		        ['Calon nomor 2',   55.0]
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
		                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		            },
		            connectorColor: 'silver'
		        }
		    }
		},
		series: [{
		    type: 'pie',
		    name: 'hasil pemira tingkat 2',
		    data: [
		        ['Calon nomor 1',   45.0],
		        ['Calon nomor 2',   55.0]
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
		                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		            },
		            connectorColor: 'silver'
		        }
		    }
		},
		series: [{
		    type: 'pie',
		    name: 'hasil pemira tingkat 3',
		    data: [
		        ['Calon nomor 1',   45.0],
		        ['Calon nomor 2',   55.0]
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
		                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		            },
		            connectorColor: 'silver'
		        }
		    }
		},
		series: [{
		    type: 'pie',
		    name: 'hasil pemira tingkat 4',
		    data: [
		        ['Calon nomor 1',   1.0],
		        ['Calon nomor 2',   2.0]
		    ]
		}]
	    };
	},

});


Template.result.rendered = function(){
	this.$('.scrollspy').scrollSpy();
};
