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
    alertError(model, error){
      let modelName = model.toLowerCase();
      let isEmpty = error === "isEmpty";
      let isInvalid = error === 'isInvalid';
      if (isEmpty) {
        this.set(`validations.${modelName}.isEmpty`, isEmpty);
      }
      if (isInvalid) {
        this.set(`validations.${modelName}.isInvalid`, true);
        this.set(`validations.${modelName}.warnDanger`, true);
      }
      this._handleValidationState('display', modelName, false);
    },
    edit(resource){
      this.set(`validations.${resource}.isEditing`, true);
    },
    cancel(){
      this.set('willInput', false);
      return this.sendAction('didCancel');
    },
    save(){
      let isValid = this._validate();
      if (!isValid) {
        return this.set('validations.isNotValid', true);
      }

      return this.get('newSong').save().then((song)=>{
        this.connectAlbumAndBand(song);
        return song;
      }).then((song)=>{
        return this.sendAction('onSuccess', song);
      });
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
      this.set('validations.artist.created', true);
      this.set('validations.artist.isEditing', false);
      this._handleValidationState('display', 'artist', true);
    },
    assignAlbum(album){
      this.set('newSong.album', album);
      this.set('isEditingAlbum', false);
      this.set('validations.album.created', true);
      this._handleValidationState('display', 'album', true);
    },
    resetTitle(){
      this.set('validations.title.warnDanger', false);
      this.set('validations.title.errorMessage', null);
      this._clearValidationState('display', 'title');
    }
  },
  songs: computed(function(){
    return this.get('store').findAll('song');
  }),

  _validateUniquenessOf(attribute, song, songs){
    let songAttrList = songs.mapBy('title');
    let attr = song.get(`${attribute}`);
    songAttrList.pop();
    return !songAttrList.contains(attr) ? true : false;
  },

  _validatePresenceOf(attribute, song){
    let attr = song.get(`${attribute}`);
    return attr !== '' || null ? true : false;
  },

  _validateTitle(){
    return this.get('songs').then((songs)=>{
      let isUnique = this._validateUniquenessOf('title', this.get('newSong'), songs);
      let isPresent = this._validatePresenceOf('title', this.get('newSong'));
      return { unique: isUnique, presence: isPresent } ;
    }).then((validations) => {
      let isValid = validations.unique && validations.presence;
      if (isValid) {
        this.set('validations.title.warnDanger', false);
        this.set('validations.title.hasSuccess', true);
      } else {
        this.set('validations.title.warnDanger', true);
        this.set('validations.title.hasSuccess', false);
        let errorMsg;
        if (!validations.unique) {
          errorMsg = 'Duplicate song title';
        }
        if (!validations.presence) {
          errorMsg = 'Title is required';
        }
        this.set('validations.title.errorMessage', errorMsg);
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
      if (attribute === 'artist' && $validationState === 'has-danger') {
        Ember.$('#new-song-artist-fieldset input').css({border: '1px solid red'});
      }
      if (attribute === 'album' && $validationState === 'has-danger') {
        Ember.$('#new-song-album-fieldset input').css({border: '1px solid red'});
      }
      Ember.$(`#new-song-${attribute}-fieldset`).addClass($validationState);
    }
  },

  validations: {
    title: {
      isValid: null,
      warnDanger: false,
    },
    artist: {
      created: false,
      isEditing: false,
      warnDanger: false,
    },
    album: {
      created: false
    }
  },

  _validate(attribute){
    if (attribute === 'title') {
      return this._validateTitle();
    } else {
      let model = this.get('newSong');
      let isValid = model.get('title') && model.get('album') && model.get('artist');
      return isValid ? true : false;
    }
  },
  willDestroyElement(){
    this.get('newSong').rollback();
  }
});
