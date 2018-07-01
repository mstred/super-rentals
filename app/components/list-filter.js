import Component from '@ember/component';

export default Component.extend({
  classNames: ['list-filter'],
  value: '',

  setResults(results) {
    this.set('results', results);
  },

  init() {
    this._super(...arguments);
    this.filter().then(this.setResults.bind(this));
  },

  actions: {
    handleFilterEntry() {
      this.filter(this.value).then(this.setResults.bind(this));
    }
  }
});
