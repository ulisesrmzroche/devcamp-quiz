import Ember from 'ember';

export default Ember.Service.extend({
  validateUniquenessOf(attribute, song, songs){
    let songAttrList = songs.mapBy('title');
    let attr = song.get(`${attribute}`);
    songAttrList.pop();
    return !songAttrList.contains(attr) ? true : false;
  },

  validatePresenceOf(attribute, song){
    let attr = song.get(`${attribute}`);
    return attr !== '' || null ? true : false;
  },
});
