WHITE_LIST = ['mattybow','bmagnantb'];
isValidUser = function(username){
	return WHITE_LIST.indexOf(username) >= 0;
};
Accounts.validateLoginAttempt(function(user){
	var username = user.user.services.github.username;
	return isValidUser(username);
});