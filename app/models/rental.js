import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr(),
  owner: DS.attr(),
  location: DS.attr(),
  type: DS.attr(),
  bedrooms: DS.attr(),
  image: DS.attr(),
  description: DS.attr()
});
