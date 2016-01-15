import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model(){
    return Ember.RSVP.hash({
      albums: this.get('store').findAll('album')
    });
  }
});
