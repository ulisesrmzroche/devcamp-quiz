import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  actions: {
    signIn: function(provider) {
      return this.get("session").open("firebase", { provider: provider});
    },
    signOut: function() {
      this.get("session").close();
    }
  }
});
