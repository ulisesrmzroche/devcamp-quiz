import Ember from 'ember';

export default Ember.Component.extend({
  session: Ember.inject.service(),
  classNames: ['song-info-card'],
});
