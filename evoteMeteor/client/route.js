FlowRouter.route('/', {
  action: function() {
    Session.setDefault('sudahVoting', false);
    Session.setDefault('sudahLogin', false);
    BlazeLayout.render("Main", {
      header: "header",
      content: "login",
      footer: "footer"});
  }
});

FlowRouter.route('/voting', {
  action:function () {
     if (Session.get('user')) {
       var sema     = CalonSema.find();
       var angkatan = CalonAngkatan.find({angkatan: Session.get('user')[0]});
       BlazeLayout.render("Main", {
          header: "header",
          content: "voting",
          footer: "footer"});
     }
     else {
       FlowRouter.go('/');
     };
  }
});