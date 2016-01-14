import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  findOrCreateUser(authentication){
    return this.get('store').query('user', {
      username: authentication.twitter.username
    }).then((response)=>{
      if (response.get('content.length') === 0) {
        return this.createUser(authentication).then((user)=>{
          return user;
        });
      } else {
        return response.get('content.firstObject.record');
      }
    });
  },
  createUser(authentication){
    let store = this.get('store');
    let user = store.createRecord('user', {
      displayName: authentication.twitter.displayName,
      profileImageURL: authentication.twitter.profileImageURL,
      username: authentication.twitter.username,
    });
    return user.save().then((user)=>{
      return user;
    });
  },
});
