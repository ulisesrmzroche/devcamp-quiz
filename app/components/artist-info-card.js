import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  session: Ember.inject.service(),
  isFavorite: computed('session.currentUser.artists', 'artist', function(){
    let currentUser = this.get('session.currentUser');
    let artist = this.get('artist');
    return currentUser.get('artists').contains(artist);
  }),
  actions: {
    toggleFavorite(){
      let currentUser = this.get('session.currentUser');
      let artist = this.get('artist');

      if (this.get('isFavorite')) {
        currentUser.get('artists').removeObject(artist);
      } else {
        currentUser.get('artists').pushObject(artist);
      }
      return currentUser.save();
    }
  }
});
