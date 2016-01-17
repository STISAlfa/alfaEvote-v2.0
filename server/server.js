Meteor.publish('Users',function(user){
	return Users.find( { "user": user, "sudahVote": false} );
});
Meteor.publish('CalonSema',function(){
	return CalonSema.find( {} );
});
Meteor.publish('CalonAngkatan',function(angkatan){
	return CalonAngkatan.find( {"angkatan" : angkatan} );
});