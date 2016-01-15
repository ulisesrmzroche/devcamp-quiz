import { moduleFor, test } from 'ember-qunit';

moduleFor('route:library/songs/song', 'Unit | Route | library/songs/song', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
