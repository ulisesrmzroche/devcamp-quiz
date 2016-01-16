import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  hasFavorites: computed(function(){
    let hasSongs = this.get('user.songs.length') > 0 ? true : false;
    let hasArtists = this.get('user.artists.length') > 0 ? true : false;
    let hasAlbums = this.get('user.albums.length') > 0 ? true : false;
    if (hasSongs || hasAlbums || hasArtists ) {
      return true;
    } else {
      return false;
    }
  }),
  navItems: computed(function(){
    return ['songs', 'albums', 'artists'];
  })
});
