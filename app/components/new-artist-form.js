import Ember from 'ember';
import NewResourceForm from './new-resource-form';

export default NewResourceForm.extend({
  model: Ember.computed(function(){
    return this.get('store').createRecord('artist');
  }),
  willDestroyElement(){
    this.get('model').rollback();
  }
});
