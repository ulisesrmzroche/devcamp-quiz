import DS from 'ember-data';

export default DS.Model.extend({
  displayName: DS.attr('string'),
  username: DS.attr('string'),
  profileImageURL: DS.attr('string'),
  songs: DS.hasMany('song', {async: true}),
  artists: DS.hasMany('artist', {async: true}),
  albums: DS.hasMany('album', {async: true}),
});
