import Ember from 'ember';
import ToriiFirebaseAdapter from 'emberfire/torii-adapters/firebase';

export default ToriiFirebaseAdapter.extend({
  firebase: Ember.inject.service(),
  auth: Ember.inject.service(),
  open(authentication) {
    return this.get('auth').findOrCreateUser(authentication).then((user)=>{
      return Ember.RSVP.resolve({
        provider: authentication.provider,
        uid: authentication.uid,
        currentUser: user
      });
    });
  },

});
