import Ember from 'ember';
import InputSelect from "./input-select";

export default InputSelect.extend({
  actions: {
    noMatchesFound(){
      this._createAlbum();
    },
  },
  store: Ember.inject.service(),
  _createAlbum(){
    this.get('store').createRecord('album', {
      name: this.get('inputVal')
    }).save().then((album)=>{
      this.sendAction('onSuccess', album);
      this.set('visibility', 'hidden');
    }).catch(()=>{
      this.set('isInvalid', true)
    })
  }
});
