import Ember from 'ember';
const { computed, $ } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  didRender(){
    this._setup();
  },
  _setup(){
    this._activateFirstTab();
  },
  sections: computed(function(){
    return ['songs', 'artists', 'albums'];
  }),
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
  }),
  _activateFirstTab(){
    let $this = this.$(this.get('element'));
    $this.find('.nav-tabs li.nav-item:first-child a').addClass('active');
  }
});
