import Component from '@ember/component';

const maps = window.google.maps;

export default Component.extend({
  init() {
    this._super(...arguments);
    this.set('geocoder', new maps.Geocoder());
  },

  createMapElement() {
    let element = document.createElement('div');
    element.className = 'map';
    return element;
  },

  createMap(element, location) {
    let map = new maps.Map(element, {scrollwheel: false, zoom: 10});

    // pinLocation(location, map)
    this.get('geocoder').geocode({address: location}, (result, status) => {
      if (status === maps.GeocoderStatus.OK) {
        let geometry = result[0].geometry.location;
        let position = {lat: geometry.lat(), lng: geometry.lng()};
        map.setCenter(position);
        (new maps.Marker({position, map, title: location}));
      }
    });

    return map;
  },

  didInsertElement() {
    this._super(...arguments);
    let mapElement = this.createMapElement();
    let location = this.get('location');
    this.createMap(mapElement, location);
    this.$('.location-map').append(mapElement);
  }
});
