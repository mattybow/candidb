WHITE_LIST = ['DmtHigh','mattybow','bmagnantb'];
isValidUser = function(username){
	return WHITE_LIST.indexOf(username) >= 0;
};
Accounts.validateLoginAttempt(function(user){
	if(user.user){
		var username;
		AppErrors.insert({data:JSON.stringify(user)});
		if(Meteor.settings && Meteor.settings.public.environment === 'dev'){
			username = user.user.services.github.username;
		} else {
			username = user.user.services.twitter.username;
		}
		return isValidUser(username);
	}
	return false;
});