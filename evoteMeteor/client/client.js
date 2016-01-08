Template.registerHelper('erorLogin',function(input){
  return Session.get("erorLogin");
});

Template.loginM.events({
  "submit .login-form": function (event) {
    // Prevent default browser form submit
    event.preventDefault();
    // Get value from form element
    pw = event.target.pw.value;
    event.target.pw.value = "";

    var ada = User.findOne(pw);
    
    // Insert a task into the collection
    if (ada) {
      	Meteor.call("addLoginLog", pw);
      	Session.set('user', pw);
      	Session.set('sudahLogin', true);
    	FlowRouter.go('vote');}
    else{
    	Session.set('erorLogin', 'invalid');
    	Materialize.toast('<h4>Password Salah</h4>', 4000, 'red rounded');
    }
  }
});