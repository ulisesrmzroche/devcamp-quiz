import Ember from 'ember';
import NewResourceForm from './new-resource-form';

export default NewResourceForm.extend({
  model: Ember.computed(function(){
    return this.get('store').createRecord('artist', {name: null});
  }),
  willDestroyElement(){
    this.get('model').rollback();
  }
});
