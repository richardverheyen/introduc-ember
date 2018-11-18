import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  name: attr('string'),
  tagline: attr('string'),
  lat: attr('number'),
  lng: attr('number')
});
