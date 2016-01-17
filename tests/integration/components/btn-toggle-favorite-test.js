import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('btn-toggle-favorite', 'Integration | Component | btn toggle favorite', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{btn-toggle-favorite}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#btn-toggle-favorite}}
      template block text
    {{/btn-toggle-favorite}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
