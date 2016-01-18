import Ember from 'ember';
import InputSelect from "./input-select";
import ValidationsMixin from './../mixins/validations';

export default InputSelect.extend(ValidationsMixin, {
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
      let isUnique = this.validateUniquenessOf('name', this.get('inputVal'), artists);
      let isPresent = this.validatePresenceOf('name', this.get('inputVal'));
      return isUnique && isPresent ? true : new Error("Invalid/Duplicate Artist");
    });
  },
  store: Ember.inject.service(),
  _createArtist(){
    return this._validate()
    .catch(()=>{
      return false;
    })
    .then(()=>{
      let artist = this.get('store').createRecord('artist');
      artist.set('name', this.get('inputVal'));
      return artist.save();
    })
    .then((artist)=>{
      this.sendAction('onSuccess', artist);
      this.set('validations.resource.created', true);
      this.set('validations.didCreate', true);
      this.set('visibility', 'hidden');
    });
  }
});
