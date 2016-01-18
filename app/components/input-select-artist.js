import Ember from 'ember';
import InputSelect from "./input-select";
import ValidationsMixin from './../mixins/validations';

export default InputSelect.extend(ValidationsMixin, {
  init(){
    this._super();
    this.set('validations', this._setupValidations());
  },
  resourceName: "Artist",
  actions: {
    noMatchesFound(){
      this._createArtist();
    },
  },
  _validate(){
    return this.get('store').findAll('artist')
    .then((artists)=>{
      let isUnique = this.validateUniquenessOf('name', this.get('inputVal'), artists);
      let isPresent = this.get('inputVal') !== '';
      if (isUnique && isPresent) {
        return true;
      } else {
        this.set('validations.isNotValid', true);
        throw new Error("Invalid/Duplicate Artist");
      }
    });
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
      this.set('validations.didCreate', true);
      this._clearDisplayState();
    })
    .catch(()=>{
      this.sendAction('didError', 'artist', 'isInvalid');
      this.set('validations.isNotValid', true);
    })
    .finally(()=>{
      this._reset();
    });
  }
});
