import Ember from 'ember';
import InputSelect from "./input-select";

export default InputSelect.extend({
  resourceName: "Artist",
  actions: {
    noMatchesFound(){
      this._createArtist();
    },
  },
  getArtists(){
    return this.get('store').findAll('artist');
  },
  validations: Ember.inject.service(),
  _validate(){
    return this.getArtists().then((artists)=>{
      let artistNameList = artists.mapBy('name');
      window.artistNameList = artistNameList
      console.log(artistNameList)
    })
  },
  store: Ember.inject.service(),
  _createArtist(){
    return this._validate()
    .then(()=>{
      let artist = this.get('store').createRecord('artist');
      artist.set('name', this.get('inputVal'));
      return artist.save();
    })
    .then((artist)=>{
      this.sendAction('onSuccess', artist);
      this.set('validations.resource.created', true);
      this.set('validations.didCreate', true)
      this.set('visibility', 'hidden');
    });
  }
});
