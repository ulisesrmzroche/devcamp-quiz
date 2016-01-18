import Ember from 'ember';
import InputAutoComplete from './input-autocomplete';
const { on } = Ember;

export default InputAutoComplete.extend({
  actions: {
    viewRecord(record){
      alert(record);
    }
  },
  isLoaded: false,
  store: Ember.inject.service() ,
  setup: on('focusIn', function(){
    if (!this.get('isLoaded')) {
      return Ember.RSVP.hash({
        artists: this.get('store').findAll('artist'),
        songs: this.get('store').findAll('song'),
        albums: this.get('store').findAll('album'),
      }).then((hash)=>{
        let all = [];
        all.pushObjects(hash.songs);
        all.pushObjects(hash.artists);
        all.pushObjects(hash.albums);
        this.set('options', all);
        this.set('isLoaded', true);
      });
    }
  })
});
