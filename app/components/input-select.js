import Ember from 'ember';
import AutoComplete from "ember-cli-auto-complete/components/auto-complete";
const { observer, on, $ } = Ember;

export default AutoComplete.extend({
  layoutName: 'components/input-select',
  valueProperty: "name",
  init(){
    this._super(...arguments);
    this.set('validations', this._setupValidations());
  },
  didRender(){
    this._super();
    if (this.get('selectedValue.id')) {
      return this.set('selectedValue', null);
    }
  },
  onFocusIn: on('focusIn', function(){
    if (this.get('validations.isValid') === false) {
      this._clearDisplayState();
    }
    this.set('validations.isNotValid', false);
  }),
  _clearDisplayState(){
    let $element = $(this.get('element'));
    let $input = $element.find('input');
    $input.css({border: '1px solid #ccc'});
  },
  _setupValidations(){
    return {
      didCreate: false,
      isEditing: false,
      isValid: null,
      isNotValid: false,
      isCreating: false,
      suggestions: {
        empty: null
      },
      resource: {
        created: null
      }
    };
  },
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
    let isEmpty = this._checkState('isEmpty');
    if (isEmpty) {
      this._alert('isEmpty');
      this._reset();
    }
  }),

  _alert(error){
    if (error === 'isEmpty') {
      this.set('validations.isValid', false);
      this.set('validations.isEmpty', true);
      this.sendAction('didError', this.get('resourceName'), 'isEmpty');
    }
  },

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
      let $target = $('.tt-suggestions div:first-child');
      let $suggestions = $target.hasClass('tt-suggestion') ? true : false;
      return $suggestions;
    }
    if (state === 'isNull' || state === 'isEmpty') {
      let val = this.get('selectedValue');
      return val === '' || val === null;
    }
  },

  _reset(){
    this.set('visibility', 'hidden');
    this.set('validations.isEditing', false);
    let $target = $(this.get('element')).find('.tt-dropdown-menu');
    $target.removeClass('visible').addClass('hidden');
  },

  _willEdit: on('focusIn', function(){
    this.set('validations.isEditing', true);
    this.set('validations.isEmpty', false);
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
