import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  model(){
    if (!this.get('session.isAuthenticated')) {
      return this.transitionTo('home');
    }
  }

});
