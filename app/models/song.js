import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({
  title: DS.attr('string'),
  artist: DS.belongsTo('artist'),
  album: DS.belongsTo('album'),
  ytSource: attr('string')
});
