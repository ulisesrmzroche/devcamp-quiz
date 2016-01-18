import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  session: Ember.inject.service(),
  isFavorite: computed(function(){
    let model = this._getModel();
    let isFavorite = this._validate(model);
    return isFavorite;
  }),

  _validate(record){
    let user = this.get('session.currentUser');
    let info = this._determineModel();
    if (info.resourceName) {
      let list = user.get(info.resourceName);
      return list.contains(record);
    }
  },

  _getModel(){
    let info = this._determineModel();
    return info.record;
  },
  _setModel(){
    let info = this._determineModel();
    this.set('model', info.record);
  },
  _determineModel(){
    let info = {
      resourceName: null,
      record: null,
      attribute: null
    };

    if (this.get('song')) {
      info.resourceName = 'songs';
      info.record = this.get('song');
      info.attribute = 'title';
    }
    if (this.get('album')) {
      info.resourceName = 'albums';
      info.record = this.get('album');
      info.attribute = 'name';
    }
    if (this.get('artist')) {
      info.resourceName = 'artists';
      info.record = this.get('artist');
      info.attribute = 'name';
    }
    return info;
  },
  determineFavorite(){

  },
  actions: {
    toggleFavorite(){
      let currentUser = this.get('session.currentUser');
      let info = this._determineModel();
      let isFavorite = this._validate(info.record);
      if (isFavorite) {
        currentUser.get(info.resourceName).removeObject(info.record);
      } else {
        currentUser.get(info.resourceName).pushObject(info.record);
      }
      return currentUser.save().then(()=>{
        this.toggleProperty('isFavorite');
      });
    }
  }
});
