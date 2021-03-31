const VALID_PETS = [
  'Bear',
  'Falcon',
  'Nightengale',
  'Wolf',
  'Raven'
];

class Validator {
  constructor() {
    throw new Error('Validator should be treated as an abstract class.');
  }

  static name(name) {
    return (/^([a-zA-Z0-9\s']*)$/i).test(name)
      && name.length >= 3;
  }

  static pet(petId) {
    return (petId >= 0 && petId < 5);
  }
}

module.exports = Validator;
