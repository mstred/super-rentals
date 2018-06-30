import { helper } from '@ember/component/helper';

export function rentalPropertyType([type]) {
  return ['Condo', 'Townhouse', 'Apartment']
    .includes(type) ? 'Community' : 'Standalone';
}

export default helper(rentalPropertyType);
