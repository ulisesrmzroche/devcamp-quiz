import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  beforeModel(){
    let isAuthenticated = this.get('session.isAuthenticated');
    if (!isAuthenticated) {
      return this.transitionTo('home');
    }
  }
});
