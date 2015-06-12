Meteor.methods({
	scrape:function(url){
		var json=[];
		var getReq = Meteor.wrapAsync(HTTP.get);
		var result = getReq(url,{npmRequestOptions:{jar:true}});
		if(result.content){
			var $ = cheerio.load(result.content);
			$('meta').each(function(i,el){
				json.push(el.attribs);
			});
			return json;
		}
		return false;
	},
	addNewCandidate:function(data){
		var exists = Candidates.find({lastName:data.lastName}).count();
		console.log(exists);
		if(exists){
			return {ok:false,msg:'candidate already exists'};
		} else {
			var insertSync = Meteor.wrapAsync(Candidates.insert,Candidates);
			try{
				var result = insertSync(data);
				console.log('inserted new candidate');
				return {ok:true};
			}
			catch(err){
				return {ok:false,err:err};
			}
			
		}
	},
	addMediaLink:function(data){
		var username = Meteor.user().services.github.username;
		if(isValidUser(username)){
			var insertSync = Meteor.wrapAsync(MediaLinks.insert,MediaLinks);
			try{
				var result = insertSync(data);
				console.log('inserted new article');
				return {ok:true};
			}
			catch(err){
				throw new Meteor.Error("DB ERROR", err);
				return {ok:false,err:err};
			}
		} else {
			throw new Meteor.Error("UNAUTHORIZED", "You are not authorized to perform this action");
			return {ok:false,err:'UNAUTHORIZED'};
		}
	}
})