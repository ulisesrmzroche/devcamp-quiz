
import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  newSong: computed(function(){
    return this.get('store').createRecord('song', {
      artist: null
    });
  }),

  artists: computed(function(){
    return this.get('store').findAll('artist');
  }),

  isEditingArtist: true,
  isEditingAlbum: true,
  albums: computed(function(){
    return this.get('store').findAll('album');
  }),

  connectAlbumAndBand(song){
    let artist = song.get('artist');
    let album = song.get('album');

    album.get('artists').pushObject(artist);
    album.save();
    artist.get('albums').pushObject(album);
    artist.save();
  },

  actions: {
    willInput(){
      this.set('willInput', true);
    },
    cancel(){
      this.set('willInput', false);
    },
    save(){
      let isValid = this._validate();

      if (isValid) {
        return this.get('newSong').save().then((song)=>{
          return this.connectAlbumAndBand(song);
        }).then(()=>{
          return this.sendAction('onSuccess');
        });
      }
    },
    editAlbum(){
      this.set('isEditingAlbum', true);
    },
    createNewArtist(){
      this.set('willCreateNewArtist', true);
    },
    createNewAlbum(){
      this.set('willCreateNewAlbum', true);
    },
    assignArtist(artist){
      this.set('newSong.artist', artist);
      this.set('isEditingArtist', false);
    },
    assignAlbum(album){
      this.set('newSong.album', album);
      this.set('isEditingAlbum', false);
    }
  },
  _validate(){
    let model = this.get('newSong');
    let isValid = model.get('title') && model.get('album') && model.get('artist');
    return isValid;
  },
  willDestroyElement(){
    this.get('newSong').rollback();
  }
});
