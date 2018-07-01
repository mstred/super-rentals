import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from "ember-cli-mirage/test-support/setup-mirage";

module('Acceptance | list rentals', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('should show rentals as the home page', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/rentals', 'should redirect automatically to the index route');
  });

  test('should link to information about the company.', async function (assert) {
    await visit('/');
    await click('.menu-about');
    assert.equal(currentURL(), '/about', 'should navigate to /about route');
  });

  test('should link to contact information.', async function (assert) {
    await visit('/');
    await click('.menu-contact');
    assert.equal(currentURL(), '/contact', 'should navigate to /contact route');
  });

  test('should list available rentals.', async function (assert) {
    await visit('/');
    let listings = this.element.querySelectorAll('article.listing') || [];
    assert.equal(listings.length, 3, 'should display 3 listings');
  });

  test('should filter the list of rentals by city.', async function (assert) {
    const inputSelector = '.list-filter input';

    await visit('/');
    await fillIn(inputSelector, 'seattle');
    await triggerKeyEvent(inputSelector, 'keyup', 69); // key code for letter 'e'
    assert.equal(this.element.querySelectorAll('.results .listing').length, 1, 'should display 1 listing');
    assert.ok(this.element.querySelector('.listing .location').textContent.includes('Seattle'), 'should contain 1 listing with location Seattle');
  });

  test('should show details for a selected rental', async function (/*assert*/) {
  });
});
