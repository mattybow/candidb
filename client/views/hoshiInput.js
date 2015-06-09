Template.hoshiInput.created=function(){
	this.isFilled = new ReactiveVar(false);
}

Template.hoshiInput.onRendered(function(){
})

Template.hoshiInput.events({
	'keyup input, change input':function(e){
		var hasVal = e.target.value ? true : false;
		if(Template.instance().isFilled.get() !== hasVal){
			Template.instance().isFilled.set(hasVal);
		}
	}
});

Template.hoshiInput.helpers({
	isFilled:function(){
		return Template.instance().isFilled.get() ? 'input-filled' : '';
	}
})