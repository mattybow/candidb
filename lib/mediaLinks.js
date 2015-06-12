MediaLinks = new Mongo.Collection('mediaLinks');
MediaSources = new Mongo.Collection('mediaSources');

var sources = [
	{domain:'nytimes.com',logoFile:'nytimes-logo.png'},
	{domain:'fivethirtyeight.com',logoFile:'fivethirtyeight-logo.png'},
	{domain:'twitter.com',logoFile:'twitter-logo.png'},
	{domain:'vox.com',logoFile:'vox-logo.png'}
];

MediaLinks.getLinks=function(){
	return MediaLinks.find({});
}

MediaSources.allSources = function(){
	return MediaSources.find({});
}

if(Meteor.isServer && MediaSources.find().count()===0){
	Meteor.startup(function(){
		_.each(sources,function(source){
			MediaSources.insert(source);
		});
	});
}