import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  actions: {
    signOut: function() {
      this.get("session").close();
      this.sendAction('didLogOut');
    }
  }
});
