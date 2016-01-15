import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    handleSuccess(){
      this.transitionTo('library.songs');
    }
  }
});
