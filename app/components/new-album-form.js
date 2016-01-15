import Ember from 'ember';

import NewResourceForm from './new-resource-form';

export default NewResourceForm.extend({
  inline: false,
  model: Ember.computed(function(){
    return this.get('store').createRecord('album', {
      name: null
    });
  }),
  willDestroyElement(){
    this.get('model').rollback();
  }
});
