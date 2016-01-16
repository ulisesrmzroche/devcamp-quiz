import Ember from 'ember';
import InputSelect from "./input-select";

export default InputSelect.extend({
  actions: {
    noMatchesFound(){
      this._createArtist();
    },
  },
  store: Ember.inject.service(),
  _createArtist(){
    this.get('store').createRecord('artist', {
      name: this.get('inputVal')
    }).save().then((artist)=>{
      this.sendAction('onSuccess', artist);
      this.set('visibility', 'hidden');
    });
  }
});
