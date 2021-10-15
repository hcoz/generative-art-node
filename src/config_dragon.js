const layersOrder = [
    { name: 'backgrounds', number: 10 },
    { name: 'hats', number: 7 },
    { name: 'skins', number: 3 },
    { name: 'cheeks', number: 6 },
    { name: 'eyes', number: 18 },
    { name: 'accessories', number: 10 },
    { name: 'mouths', number: 11 },
    { name: 'hairs', number: 20 },
];
  
const format = {
    width: 1080,
    height: 1080
};

const rarity = [
    { key: "", val: "original" },
    { key: "_r", val: "rare" },
    { key: "_sr", val: "super rare" },
];

const defaultEdition = 10;

module.exports = { layersOrder, format, rarity, defaultEdition };
