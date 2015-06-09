var defaultFields = "firstName middleName lastName party fecid headImg dateOfBirth gender campaignUrl".split(' ');

Template.addCandidate.helpers({
	fields:function(){
		return defaultFields;
	},
	showView:function(){
		return Session.get('addIsOpen') ? 'open' : 'closed';
	}
});

Template.addCandidate.events({
	'click #close-add-candidate':function(){
		Session.set('addIsOpen',false);
	},
	'click #save-add-candidate':function(e){
		var data = {}
		this.$('input').each(function(i,input){
			var value = input.value ? input.value : null;
			data[defaultFields[i]]=value;
		});
		Meteor.call('addNewCandidate',data,function(err,res){
			if(res.ok){
				this.$('input').val('').change();
			}
		});
	}.bind(this)
});
