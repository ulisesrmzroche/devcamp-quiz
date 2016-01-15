import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  hasFavorites: computed(function(){
    return this.get('user.songs.length') > 0 ? true : false;
  })
});
