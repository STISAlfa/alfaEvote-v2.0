LoginLog = new Mongo.Collection('LoginLog');
User = new Mongo.Collection('Users');
VotingResult = new Mongo.Collection('VotingResult');
pw = '';

if (Meteor.isClient) {
  Session.setDefault('sudahVoting', false);
  Session.setDefault('sudahLogin', false);

  Template.body.events({
    "submit .form-horizontal": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      pw = event.target.pw.value;
      var ada = User.findOne(pw);
      
      // Insert a task into the collection
      if (ada) {
        LoginLog.insert({
          user: pw,
          loginAt: new Date() // current time
        });
        Session.set('user', pw);}
      else{
        User.insert({
          user: pw,
          createAt: new Date() // current time
        });};
      event.target.pw.value = "";
      Meteor.go('voting');}
  });
}

if (Meteor.isServer){
  Meteor.startup(function (){

  });

  Router.route('/voting', function () {
     if (Session.get('user')) {
       var user = User.find({pw: Session.get('user')});
       this.render('voting', {data: user});
     }
     else {
       Meteor.go('/');
     }});

  Router.route('/', function () {
     Session.setDefault('sudahVoting', false);
     Session.setDefault('sudahLogin', false);
     this.render('login');});
}
