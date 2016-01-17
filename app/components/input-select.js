import Ember from 'ember';
import AutoComplete from "ember-cli-auto-complete/components/auto-complete";
const { observer, on, $ } = Ember;

export default AutoComplete.extend({
  init(){
    this._super(...arguments);
    this.set('validations', {
      didCreate: false,
      isEditing: false,
      isCreating: false,
      suggestions: {
        empty: null
      },
      resource: {
        created: null
      }
    });
  },
  setup: on('didRender', function(){
    if (this.get('selectedValue.id')) {
      return this.set('selectedValue', null);
    }
  }),
  layoutName: 'components/input-select',
  valueProperty: "name",
  determineSuggestions: function(options, input) {
      let list = options.filter(function(item) {
        return item.get("name").toLowerCase().indexOf(input.toLowerCase()) > -1;
      });
      let results = Ember.A(list);
      return results;
  },
  hasMatch: observer('inputVal', function(){
    var options = this.get("options");
    if (!this.get('hasStarted')) {
      this.set('hasStarted', true);
    }
    var input = this.getWithDefault("selectedValue", "");
    this.set("suggestions", this.determineSuggestions(options, input));
  }),

  reset: on('focusOut', function(){

  }),


  _checkState(state){
    if (state === 'canCreate') {
      let $msg = $(".message .no-matches-found").promise();
      $msg.then(function(){
        let $msgExists = this.length === 1 ? true : false;
        let $msgIsCreate = $.trim(this.text()) === 'Create New Artist';
        return $msgExists && $msgIsCreate ? true : false;
      });
    }
    if (state === 'canSelect') {
      let $suggestions = $('.tt-suggestions div:first-child').hasClass('tt-suggestion') ? true : false;
      return $suggestions;
    }
    if (state === 'isNull' || state === 'isEmpty') {
      return this.get('inputVal') === '';
    }
  },

  _reset(){
    this.set('visibility', 'hidden');
    this.set('validations.isEditing', false);
  },

  _willEdit: on('focusIn', function(){
    this.set('validations.isEditing', true);
  }),

  actions: {
    noMatchesFound(){
      this.sendAction('noMatchesFound');
    },
    selectItem: function (item) {
      this.set("selectedFromList", true);
      this.set('selectedValue', item);
      this.sendAction('selectItem', item);
      this.sendAction('onSuccess', item);
      this.set('visibility', 'hidden');
    },
  }
});
