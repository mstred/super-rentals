import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    filterByLocation(location) {
      const store = this.store;

      let results = (location) ?
        store.query('rental', {location}) :
        store.findAll('rental');

      return results.then(results => { return {location, results}; });
    }
  }
});
