import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('btn-add-to-record-collection', 'Integration | Component | btn add to record collection', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{btn-add-to-record-collection}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#btn-add-to-record-collection}}
      template block text
    {{/btn-add-to-record-collection}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
