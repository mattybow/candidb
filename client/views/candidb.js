if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.dash.helpers({
    getCandidates: function () {
      return Candidates.find({});
    }
  });

  Template.dash.events({
    'click #add-new-candidate':function(){
      Session.set('addIsOpen',true);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
