import Ember from 'ember';
const { computed } = Ember;
import NewResourceForm from './new-resource-form';

export default NewResourceForm.extend({
  model: computed(function(){
    return this.get('store').createRecord('artist');
  }),
  willDestroyElement(){
    this.get('model').rollback();
  }
});
