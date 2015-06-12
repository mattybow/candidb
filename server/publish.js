Meteor.publish('allCandidates',function(){
	return Candidates.getAll();
});

Meteor.publish('allLinks',function(){
	return MediaLinks.getLinks();
});

Meteor.publish('allSources',function(){
	return MediaSources.allSources();
});
