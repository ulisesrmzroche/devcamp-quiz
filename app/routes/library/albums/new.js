import Ember from 'ember';
const { RSVP } = Ember;

export default Ember.Route.extend({
  model(){
    return RSVP.hash({
      newAlbum: this.get('store').createRecord('album'),
      songs: this.get('store').findAll('song'),
      artists: this.get('store').findAll('artist')
    });
  },
  deactivate(){
    this.get('currentModel.newAlbum').rollback();
  }
});
