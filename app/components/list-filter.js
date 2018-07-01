import Component from '@ember/component';

export default Component.extend({
  classNames: ['list-filter'],
  value: '',

  init() {
    this._super(...arguments);
    this.filter().then(data => this.set('results', data.results));
  },

  actions: {
    handleFilterEntry() {
      let location = this.value;
      this.filter(location).then(data => {
        if (data.location === location) {
          this.set('results', data.results);
        }
      });
    }
  }
});
