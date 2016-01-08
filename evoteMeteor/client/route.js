FlowRouter.route('/', {
  name:'home',
  action() {
    Session.setDefault('sudahVoting', false);
    Session.setDefault('sudahLogin', false);
    BlazeLayout.render("Main", {content: "loginM"});
  }
});

FlowRouter.route('/vote', {
  name: 'vote',
  action() {
     if (Session.get('user')) {
       var sema     = CalonSema.find();
       var angkatan = CalonAngkatan.find({angkatan: Session.get('user')[0]});
       BlazeLayout.render("Main", {content: "voting"});
     }
     else {
       FlowRouter.go('home');
     };
  }
});