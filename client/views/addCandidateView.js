var defaultFields = "headImg firstName middleName lastName party fecid dateOfBirth gender campaignUrl".split(' ');

Template.addCandidate.onCreated(function(){
	this.spinnerClass = new ReactiveVar('');
	this.saveStatus = new ReactiveVar('save');
});

Template.addCandidate.onRendered(function(){
	console.log(this);
});


Template.addCandidate.helpers({
	fields:function(){
		return defaultFields.slice().splice(1);  //copy and remove headImg, it is covered by the dropzone
	},
	showView:function(){
		return Session.get('addIsOpen') ? 'open' : 'closed';
	},
	dropZoneContext:function(){
		return {
			autoProcessQueue:false,
			dictDefaultMessage:"upload an image",
			url:'/upload',
			name:"dropzone",
			id:'addCandidatePhotoDropzone',
			addedfile:function(file){
				console.log(file);
			}
		};
	},
	reactiveSpinnerClass:function(){
		return Template.instance().spinnerClass;	//pass reference to child
	},
	saveStatus:function(){
		return Template.instance().saveStatus.get();
	}
});

Template.addCandidate.events({
	'click #close-add-candidate':function(){
		Session.set('addIsOpen',false);
	},
	'click #save-add-candidate':function(e){
		var data = {}
		var _self = Template.instance();
		_self.spinnerClass.set('saving');
		_self.saveStatus.set('saving');
		var inputs = _self.findAll('input[type="text"]');
		_.each(inputs,function(input,i){
			var value = input.value ? input.value : null;
			data[defaultFields[i]]=value;
		});
		if(Meteor.user()){
			Meteor.call('addNewCandidate',data,function(err,res){
				if(res.ok){
					_self.$('input').val('').change();
					_self.saveStatus.set('saved');		//update success save button state
				} else {
					_self.saveStatus.set('error!');		//update fail save button state
				}
				_self.spinnerClass.set('');				//removes spinner overlay
				Meteor.setTimeout(function(){			//reset save button state
					_self.saveStatus.set('save');
				},1000);
			});
		} else {
			toastr.error('please login to perform this action','TRANSACTION FAILED');
		}
		
	}
});
