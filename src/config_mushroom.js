const layersOrder = [
    { name: 'backgrounds', number: 17 },
    { name: 'hats', number: 13 },
    { name: 'skins', number: 5 },
    { name: 'cheeks', number: 10 },
    { name: 'eyes', number: 28 },
    { name: 'accessories', number: 20 },
    { name: 'mouths', number: 11 },
    { name: 'hairs', number: 25 },
];
  
const format = {
    width: 1080,
    height: 1080
};

const rarity = [
    { key: '', val: 'original' },
    { key: '_r', val: 'rare' },
    { key: '_sr', val: 'super rare' },
];

const defaultEdition = 10;

module.exports = { layersOrder, format, rarity, defaultEdition };
