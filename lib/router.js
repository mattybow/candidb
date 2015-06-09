Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound'
});

Router.route('/',function(){
	this.render('dash');
});

Router.route('/candidate/:_id', function () {
  var record = Candidates.findOne({fecid: this.params._id});
  this.render('candidateDetail', {data: record});
});