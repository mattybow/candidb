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
			var errMsg,id;
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
	}
})