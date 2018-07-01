import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    let rentals = this.store.findAll('rental');

    return rentals;
  }
});
