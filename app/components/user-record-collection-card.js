import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  hasCollection: computed('user', function(){
    return this.get('user.songs.length') > 0 ? true : false;
  })
});
