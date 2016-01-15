
import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  newSong: computed(function(){
    return this.get('store').createRecord('song');
  }),
  artists: computed(function(){
    return this.get('store').findAll('artist');
  }),
  isEditingArtist: true,
  isEditingAlbum: true,
  albums: computed(function(){
    return this.get('store').findAll('album');
  }),
  actions: {
    willInput(){
      this.set('willInput', true);
    },
    cancel(){
      this.set('willInput', false);
    },
    save(){
      let isValid = this._validate();
      let currentUser = this.get('session.currentUser');
      if (isValid) {
        return this.get('newSong').save().then((song)=>{
          currentUser.get('songs').pushObject(song);
          return currentUser.save();
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
