import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    handleSuccess(song){
      this.transitionTo('library.songs.song', song);
    },
    cancelCreate(){
      this.transitionTo('library.songs');
    }
  }
});
