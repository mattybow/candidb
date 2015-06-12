var viewMap = {
  candidate:'candidates'
}

Template.nav.onRendered(function(){
  Accounts.onLoginFailure(function(){
    toastr.error("sorry we don't recognize you", 'login denied');
  });
})

Template.nav.helpers({
  previousView:function(){
    var curView = Session.get('curView');
    if (!curView){
      return 'candidb'
    } else {
      return viewMap[curView];
    }
  },
  isMobile:function(){
    if('ontouchstart' in window){
      return true;
    }
    return false;
  }
});

Template.nav.events({
  'click [data-logout]':function(e,el){
    e.preventDefault();
    Meteor.logout();
  },
  'click [data-login]':function(e,el){
    e.preventDefault();
    Meteor.loginWithGithub({},function (err) {
      if (err) alert(JSON.stringify(err));
    });
  }
});

