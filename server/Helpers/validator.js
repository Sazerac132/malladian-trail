const VALID_PETS = [
  'Bear',
  'Falcon',
  'Nightengale',
  'Wolf',
  'Raven'
];

class Validate {
  constructor() {
    throw new Error('Validator should be treated as an abstract class.');
  }

  static Character(payload) {
    const {
      name = '',
      desc = '',
      pet = -1,
      petName = '',
      traits = '',
      other = ''
    } = payload;

    const invalid = [];

    if (!Validate.name(name)) invalid.push('name');
    if (!Validate.desc(desc)) invalid.push('desc');
    if (!Validate.pet(pet)) invalid.push('pet');
    if (!Validate.name(petName)) invalid.push('petName');
    if (!Validate.traits(traits)) invalid.push('traits');
    if (!Validate.other(other)) invalid.push('other');

    return invalid;
  }

  static name(name) {
    return (/^([a-zA-Z0-9\s']*)$/i).test(name)
      && name.length >= 3 && name.length <= 20;
  }

  static desc(desc) {
    return desc.length <= 1000;
  }

  static traits(text) {
    return text.length <= 200;
  }

  static other(text) {
    return text.length <= 200;
  }

  static pet(petId) {
    return (petId >= 0 && petId < 5);
  }
}

module.exports = Validate;
