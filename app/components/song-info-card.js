import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  session: Ember.inject.service(),
  isFavorite: computed('session.currentUser.songs', 'song', function(){
    let currentUser = this.get('session.currentUser');
    let song = this.get('song');
    return currentUser.get('songs').contains(song);
  }),
  actions: {
    toggleFavorite(){
      let currentUser = this.get('session.currentUser');
      let song = this.get('song');

      if (this.get('isFavorite')) {
        currentUser.get('songs').removeObject(song);
      } else {
        currentUser.get('songs').pushObject(song);
      }

      return currentUser.save();
    }
  }
});
