const twinsOfBackgrounds = {
  'twin-light': 'twin-light',
  'twin-dark': 'twin-dark',
};
const twinsOfColors = {
  'twin-light': 'twin-light',
  'twin-dark': 'twin-dark',
};

const twins = {
  getTwinOfColor: (colorID) => {
    return twinsOfColors[colorID];
  },
  getTwinOfBackground: (backgroundID) => {
    return twinsOfBackgrounds[backgroundID];
  },
};

export default twins;
