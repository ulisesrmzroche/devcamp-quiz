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
    validateTitle(){
      return this._validate('title');
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
  songs: computed(function(){
    return this.get('store').findAll('song');
  }),

  _validateTitle(){
    return this.get('songs').then((songs)=>{
      let songList = songs.mapBy('title').compact();
      songList.pop();
      let newSongName = this.get('newSong.title');
      let songListContainsSong = songList.contains(newSongName);
      return songListContainsSong;
    }).then((songListContainsSong) => {
      let isValid = songListContainsSong ? false : true;
      this.set('validations.title.isValid', isValid);
      if (!isValid) {
        this.set('validations.title.warnDanger', true);
      } else {
        this.set('validations.title.warnDanger', false);
      }
      this._handleValidationState('display', 'title', isValid);
    });

  },

  _clearValidationState(strategy, attribute){
    if (strategy === 'display') {
      let $target = Ember.$(`#new-song-${attribute}-fieldset`);
      $target.removeClass('has-success');
      $target.removeClass('has-danger');
      $target.removeClass('has-warning');
    }
  },
  _handleValidationState(strategy, attribute, state){
    this._clearValidationState(strategy, attribute);
    if (strategy === 'display') {
      let $validationState = state ? 'has-success' : 'has-danger';
      alert($validationState);
      return Ember.$(`#new-song-${attribute}-fieldset`).addClass($validationState);
    }
  },

  validations: {
    title: {
      isValid: null,
      warnDanger: false,
    }
  },

  _validate(attribute){
    if (attribute === 'title') {
      return this._validateTitle();
    } else {
      let model = this.get('newSong');
      let isValid = model.get('title') && model.get('album') && model.get('artist');
      return isValid;
    }
  },
  willDestroyElement(){
    this.get('newSong').rollback();
  }
});
