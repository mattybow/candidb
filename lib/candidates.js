Candidates = new Mongo.Collection('candidates');

var persons = [
	{lastName:'Clinton',firstName:'Hillary',fecid:'P00003392'},
	{lastName:'Bush',firstName:'Jeb',fecid:'tbd'},
	{lastName:'Rubio',firstName:'Marco',fecid:'P60006723'},
	{lastName:'Cruz',firstName:'Ted',fecid:'P60006111'},
	{lastName:'Paul',firstName:'Rand',fecid:'P40003576'},
	{lastName:'Walker',firstName:'Scott',fecid:'tbd'}
];

Candidates.getAll = function(){
	return Candidates.find({},{sort:{lastName:1}});
}

if(Meteor.isServer && Candidates.find().count()===0){
	Meteor.startup(function(){
		_.each(persons,function(person){
			Candidates.insert(person);
		});
	});
}