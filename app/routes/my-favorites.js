import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  activate(){
    let isAuthenticated = this.get('session.isAuthenticated');
    if (!isAuthenticated) {
      return this.transitionTo('home');
    }
  },
  model(){
    return Ember.RSVP.hash({
      songs: this.get('store').findAll('song'),
      artists: this.get('store').findAll('artist'),
      albums: this.get('store').findAll('album')
    });
  }
});
