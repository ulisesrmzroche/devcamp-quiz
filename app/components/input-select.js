import Ember from 'ember';
import AutoComplete from "ember-cli-auto-complete/components/auto-complete";
const { observer } = Ember;

export default AutoComplete.extend({
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
    handleFocusOut(){
    }
  }
});
