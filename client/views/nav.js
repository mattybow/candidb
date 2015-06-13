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
  },
  loginService:function(){
    if(Meteor.settings && Meteor.settings.public.environment === 'dev'){
      return 'github-circled';
    } else {
      return 'twitter';
    }
  }
});

Template.nav.events({
  'click [data-logout]':function(e,el){
    e.preventDefault();
    Meteor.logout();
  },
  'click [data-login]':function(e,el){
    e.preventDefault();
    if(Meteor.settings && Meteor.settings.public.environment === 'dev'){
      Meteor.loginWithGithub();
    } else {
      Meteor.loginWithTwitter();
    }
  }
});

