import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('record-collection-favorites-card', 'Integration | Component | record collection favorites card', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{record-collection-favorites-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#record-collection-favorites-card}}
      template block text
    {{/record-collection-favorites-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
