WHITE_LIST = ['mattybow','bmagnantb'];
isValidUser = function(username){
	return WHITE_LIST.indexOf(username) >= 0;
};
Accounts.validateLoginAttempt(function(user){
	console.log(user);
	if(user.user){
		var username = user.user.services.github.username;
		return isValidUser(username);
	}
	return false;
});

console.log(Meteor.absoluteUrl());