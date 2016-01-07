Meteor.startup(function (){
Session.setDefault('sudahVoting', false);
Session.setDefault('sudahLogin', false);

Template.body.events({
  "submit .form-horizontal": function (event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value from form element
    pw = event.target.pw.value;
    alert(pw);
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
    Route.go('/voting');}
});
});