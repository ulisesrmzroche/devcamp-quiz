import Ember from 'ember';

export default Ember.Route.extend({
  store: Ember.inject.service(),
  model(){
    return this.modelFor('library').songs;
  }
});
