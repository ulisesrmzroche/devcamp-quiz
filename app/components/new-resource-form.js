import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  selectedValue: null,
  actions: {
    save(){
      this.get('model').save().then((model)=>{
        this.set('selectedValue', model);
      });
    }
  }
});
