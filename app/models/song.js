import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({
  title: DS.attr('string'),
  artist: DS.belongsTo('artist', {async: false}),
  album: DS.belongsTo('album', {async: false}),
  ytSource: attr('string')
});
