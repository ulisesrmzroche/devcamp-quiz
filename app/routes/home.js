import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  beforeModel(){
    if (this.get('session.isAuthenticated')) {
      return this.transitionTo('myFavorites');
    }
  },
  actions: {
    viewFavorites(){
      this.transitionTo('myFavorites');
    }
  }
});
