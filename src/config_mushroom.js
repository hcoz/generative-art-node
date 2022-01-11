const layersOrder = [
    { name: 'background', number: 4 },
    { name: 'hat', number: 13 },
    { name: 'skin', number: 5 },
    { name: 'cheeks', number: 10 }, // 30%
    { name: 'eyes', number: 21 }, 
    { name: 'accessories', number: 18 }, // 50%
    { name: 'mouth', number: 11 },
    { name: 'hair', number: 30 }, // 33%
];
  
const format = {
    width: 350,
    height: 350
};

const rarity = [
    { key: '', val: 'original' },
    { key: '_r', val: 'rare' },
    { key: '_sr', val: 'super rare' },
];

const defaultEdition = 200;

module.exports = { layersOrder, format, rarity, defaultEdition };
