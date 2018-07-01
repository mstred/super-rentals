import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerKeyEvent, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { resolve } from 'rsvp';

module('Integration | Component | rental-tile', function(hooks) {
  setupRenderingTest(hooks);

  const ITEMS = [{location: 'San Francisco'}, {location: 'Portland'}, {location: 'Seattle'}];
  const FILTERED_ITEMS = [{location: 'San Francisco'}];

  let listFilterTemplate = hbs`
    {{#list-filter filter=(action filterByLocation) as |results|}}
      <ul>
        {{#each results as |item|}}
          <li class="location">{{item.location}}</li>
        {{/each}}
      </ul>
    {{/list-filter}}
    `;

  test('should initially load all rentals', async function (assert) {
    // stub filterByLocation action
    this.filterByLocation = () => resolve({ results: ITEMS });
    // render it in order to emulate its actual behavior.
    await render(listFilterTemplate);

    return settled().then(() => {
      assert.equal(this.element.querySelectorAll('.location').length, 3);
      assert.equal(this.element.querySelector('.location').textContent.trim(), 'San Francisco');
    });
  });

  test('should update with matching listings', async function (assert) {
    // stub filterByLocation action
    this.filterByLocation = location => resolve({ location, results: location ? FILTERED_ITEMS : ITEMS });
    // render it in order to emulate its actual behavior.
    await render(listFilterTemplate);

    let filterInputElement = this.element.querySelector('.list-filter input');
    // fill the input field with the letter 's' and trigger the keyup event
    await fillIn(filterInputElement,'s');
    await triggerKeyEvent(filterInputElement, "keyup", 83);

    return settled().then(() => {
      assert.equal(this.element.querySelectorAll('.location').length, 1, 'One filtered result');
      assert.equal(this.element.querySelector('.location').textContent.trim(), 'San Francisco');
    });
  });
});
