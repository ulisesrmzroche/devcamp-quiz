import Ember from 'ember';
import InputSelect from "./input-select";
import ValidationsMixin from './../mixins/validations';

export default InputSelect.extend(ValidationsMixin, {
  resourceName: 'Album',
  actions: {
    noMatchesFound(){
      this._createAlbum();
    },
  },
  _validate(){
    return this.get('store').findAll('album')
    .then((albums)=>{
      let val = this.get('inputVal');
      let isUnique = this.validateUniquenessOf('name', val, albums);
      let isPresent = val !== '';
      let isValid = isUnique && isPresent;
      if (isValid) {
        return true;
      } else {
        throw new Error("Invalid/Duplicate Album");
      }
    });
  },
  store: Ember.inject.service(),
  _createAlbum(){
    return this._validate()
    .then(()=>{
      let newAlbum = this.get('store').createRecord('album', {
        name: this.get('inputVal')
      });
      return newAlbum.save();
    })
    .then((album)=>{
      this.sendAction('onSuccess', album);
    })
    .catch(()=>{
      this.set('isInvalid', true);
      this.sendAction('didError', 'album', 'isInvalid');
    })
    .finally(()=>{
      this._reset();
    });
  }
});
