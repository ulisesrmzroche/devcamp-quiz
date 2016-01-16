import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  beforeModel(){
    if (!this.get('session.isAuthenticated')) {
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
