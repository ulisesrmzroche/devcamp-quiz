import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  session: Ember.inject.service(),
  isFavorite: computed('session.currentUser.albums', 'album', function(){
    let currentUser = this.get('session.currentUser');
    let song = this.get('album');
    return currentUser.get('albums').contains(song);
  }),
  actions: {
    toggleFavorite(){
      let currentUser = this.get('session.currentUser');
      let album = this.get('album');

      if (this.get('isFavorite')) {
        currentUser.get('albums').removeObject(album);
      } else {
        currentUser.get('albums').pushObject(album);
      }

      return currentUser.save();
    }
  }
});
