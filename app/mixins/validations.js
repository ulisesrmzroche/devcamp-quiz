import Ember from 'ember';

export default Ember.Mixin.create({
  validateUniquenessOf(attribute, value, records){
    let attributeList = records.mapBy(attribute);
    let isUnique = !attributeList.contains(value);
    return isUnique ? true : false;
  },

  validatePresenceOf(attribute, value){
    let attr = song.get(attribute);
    return attr !== '' || null ? true : false;
  },
});
