Template.candidateCard.helpers({
	getImgUrl:function(){
		var regex = /^(http)/;
		var file = Template.instance().data.headImg;
		if(file.match(regex)){
			return file;
		}
		return 'images/' + file;
	}
});