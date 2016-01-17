import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get("session").fetch()
    .then(()=>{
      // noop
    })
    .catch(function() {});
  },
  actions: {
    visitHome(){
      return this.transitionTo('home');
    }
  }
});
