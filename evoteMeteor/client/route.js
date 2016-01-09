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