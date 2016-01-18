FlowRouter.route('/admin', {
  name:'admin',
  action() {
    if(Session.get('sudahLogin') && Session.get('tipeUser')==='admin'){
      FlowRouter.go('result');}
    else {
      BlazeLayout.render("Main", {content: "adminLogin"});}
  }
});

FlowRouter.route('/admin/home',{
  name: 'adminHome',
  action(){
    if(Session.get('sudahLogin') && Session.get('tipeUser')==='admin'){
      BlazeLayout.render("Main", {content: "adminHome"});
    }else{
      FlowRouter.go('admin');
    }
  }
});

FlowRouter.route('/admin/result',{
  name: 'result',
  action(){
    if(Session.get('sudahLogin') && Session.get('tipeUser') === 'admin'){
       Meteor.call('getVotingResult', function(err, data) {
	     if (err)
  	    console.log(err);
  	  console.log(data);
  	  Session.setPersistent('VoteRes', data);
  	});
       //BlazeLayout.render("result");
      BlazeLayout.render("Main", {
        content: "result",
        resultPage: true
      });
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
        Meteor.setTimeout(dos, 8000);
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
          Session.setPersistent('angkatan', null);
          Session.setPersistent('tipeUser', '');
          Session.setPersistent('user', '');
          
          FlowRouter.go('home');
  }
});
