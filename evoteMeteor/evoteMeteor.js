LoginLog = new Mongo.Collection('LoginLog');
User = new Mongo.Collection('Users');
VotingResult = new Mongo.Collection('VotingResult');

if (Meteor.isClient) {
  Template.body.events({
    "submit .form-horizontal": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var nim = event.target.nim.value;
      var ada = User.findOne(nim);
      
      // Insert a task into the collection
      if (!ada) {
        LoginLog.insert({
          user: nim,
          loginAt: new Date() // current time
        });
        Session.set('nim', nim);
      };
 
      // Clear form
      event.target.nim.value = "";
      alert(nim);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
