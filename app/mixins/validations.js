import Ember from 'ember';

export default Ember.Mixin.create({
  init(){
    this._super(...arguments);
  },
  validateUniquenessOf(attribute, value, records){
    let attributeList = records.mapBy(attribute);
    let isUnique = !attributeList.contains(value);
    return isUnique ? true : false;
  },

  validatePresenceOf(value){
    let isEmpty = value === '' || value === null;
    return isEmpty ? false : true;
  },
});
