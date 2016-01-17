

FlowRouter.route('/admin/result',{
  name: 'result',
  action(){
    if(Session.get('sudahLogin')){
       Meteor.call('getVotingResult', function(err, data) {
	  if (err)
	    console.log(err);
	  console.log(data);
	  Session.setPersistent('VoteRes', data);
	});
       BlazeLayout.render("result");
    }
    else{
      FlowRouter.go('/');
    }
  }
});


FlowRouter.route('/', {
  name:'home',
  action() {
    if (!Session.get('sudahLogin')) {
      BlazeLayout.render("Main", {content: "loginM"});}
    else{
      FlowRouter.go('vote');}
  }
});

FlowRouter.route('/vote', {
  name: 'vote',
  action() {
     if (Session.get('sudahLogin')) {
       var sema     = CalonSema.find();
       var angkatan = CalonAngkatan.find();
       BlazeLayout.render("Main", {content: "voting"});}
     else {
       FlowRouter.go('home');}
  }
});

FlowRouter.route('/thankyou', {
  name: 'thankyou',
  action() {
     if (Session.get('sudahVote')) {
        BlazeLayout.render("Main", {content: "thanks"});
        var dos = function(){
          Session.setPersistent('sudahVote', false);
          Session.setPersistent('sudahLogin', false);
          Session.setPersistent('erorLogin', 'validate');
          Session.setPersistent('angkatan', 1);
          Session.setPersistent('user', '');

          FlowRouter.go('home');
        }
        Meteor.setTimeout(dos, 10000);
        Users.remove({});
      }
     else {
        FlowRouter.go('vote');
     }
  }
});

FlowRouter.route('/destroy', {
  name: 'destroy',
  action() {
          Session.setPersistent('sudahVote', false);
          Session.setPersistent('sudahLogin', false);
          Session.setPersistent('erorLogin', 'validate');
          Session.setPersistent('angkatan', 1);
          Session.setPersistent('user', '');
          Users.remove({});

          FlowRouter.go('home');
  }
});
