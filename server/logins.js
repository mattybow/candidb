WHITE_LIST = ['DmtHigh','mattybow','bmagnantb'];
isValidUser = function(username){
	return WHITE_LIST.indexOf(username) >= 0;
};
Accounts.validateLoginAttempt(function(user){
	AppErrors.insert({data:JSON.stringify(user));
	if(user.user){
		var username = user.user.services.twitter.username;
		return isValidUser(username);
	}
	return false;
});
