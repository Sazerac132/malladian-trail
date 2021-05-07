import React from 'react';

import HowManyPlayers from './HowManyPlayers';

// const placeholderDescriptions = [
//   (name) => {
//     return `${name} hails from the snowy mountains of Yargejeron where they herded `
//       + 'goats for a living. Born and raised in the small town of Sumbajidawad, '
//       + `${name} joined the Malladrian trail to find out what really makes goats `
//       + 'tick from day to day.';
//   },
//   (name) => {
//     return `${name} has travelled the world looking for the perfect recipe for `
//       + 'onion soup. They will not consider their journey complete until cooking '
//       + 'the perfect soup and, coincidentally, finding the ultimate cure for bad '
//       + 'breath.';
//   },
//   (name) => {
//     return `${name} was once stabbed in the back by an old lover (literally). `
//       + 'They have joined the Malladrian trail to atone for past sins, to earn '
//       + 'a place in heaven by being good to the less fortunate, but will '
//       + 'nurture a knife wound in the back for the rest of their life.';
//   }
// ];

const CharacterCreation = () => {
  return (
    <div className="char">
      <h1>Character Creation</h1>
      <HowManyPlayers />
    </div>
  );
};

export default CharacterCreation;
