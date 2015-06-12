Template.layout.onRendered(function(){
  this.find("#content-holder")._uihooks = {
    insertElement: function(node, next) {
      var start = '100%';
      $.Velocity.hook(node, 'translateX', start);
      $(node)
      .insertBefore(next)
      .velocity({translateX: [0, start]}, {
        duration: 300,
        easing: 'ease-in-out',
        queue: false
      });
    },
    removeElement: function(node) {
      var end = '-100%';
      $(node)
      .velocity({translateX: end}, {
        duration: 300,
        easing: 'ease-in-out',
        queue: false,
        complete: function() {
          $(node).remove();
        }
      });
    }
  };
});


