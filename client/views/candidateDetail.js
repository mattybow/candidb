var domainRegex = /(http(s)?:\/\/)?([\w\-]+\.)?([\w\-]+\.(com|org|net|io|gov|ly|me|le))/i;

Template.candidateDetail.onRendered(function(){
});

Template.candidateDetail.events({
	'input input':function(e){
		var url = e.target.value;
		if(url){
			Session.set('previewUrl',url);
			Meteor.call('scrape',url,function(err,res){
				var previewProps={tags:[]};
				_.each(res,function(attr){
					if('property' in attr){
						console.log(attr);
						switch (attr.property){
							case 'og:title':
								previewProps.previewTitle=attr.content;
								break;
							case 'og:description':
								previewProps.previewDescription=attr.content;
								break;
							case 'og:url':
								var logoFile,mo;
								var domainParse = url.match(domainRegex);
								var domain = domainParse[domainParse.length-2];
								var mediaRecord = MediaSources.findOne({domain:domain});
								console.log(mediaRecord);
								logoFile = mediaRecord ? mediaRecord.logoFile : '';
								if(logoFile){
									previewProps.previewLogo=logoFile;
								} else {
									previewProps.previewInitial=domain[0].toUpperCase();
								}
							case 'article:published_time':
								mo=moment(new Date(attr.content));
								previewProps.previewJsDate=mo.format();
								previewProps.previewDate=mo.format('LL');
								break;
							case 'article:published':
								mo=moment(attr.content,'YYYY-MM-DD');
								previewProps.previewJsDate=mo.format();
								previewProps.previewDate=mo.format('LL');
								break;
							case 'article:tag':
								previewProps.tags.push(attr.content);
								break;
							case 'og:image':
								previewProps.image=attr.content;
						}
					}
				});
				Session.set(previewProps);
			});
		} else {
			clearSessionVals();
		}
	},
	'click #addUrl':function(e){
		e.preventDefault();
		if(Session.get('previewTitle')){
			MediaLinks.insert({
				fecid:UI.getData().fecid,
				url:Session.get('previewUrl'),
				title:Session.get('previewTitle'),
				description:Session.get('previewDescription'),
				date:Session.get('previewJsDate'),
				tags:Session.get('tags'),
				image:Session.get('image')
			});
		}
		clearSessionVals();
		$('input').val('');
	}
});

Template.candidateDetail.helpers({
	previewTitle:function(){
		return Session.get('previewTitle');
	},
	previewDescription:function(){
		return Session.get('previewDescription');
	},
	previewDate:function(){
		return Session.get('previewDate');
	},
	previewLogo:function(){
		return Session.get('previewLogo');
	},
	previewInitial:function(){
		return Session.get('previewInitial');
	},
	hasPreview:function(){
		return Session.get('previewTitle');
	},
	queryLinks:function(id){
		console.log(id);
		return MediaLinks.find({fecid:id},{sort:{date:-1}});
	}
});

function clearSessionVals(){
	Session.set({
		previewUrl:'',
		previewTitle:'',
		previewDescription:'',
		previewDate:'',
		previewJsDate:'',
		previewLogo:'',
		previewInitial:''
	});
}
