const layersOrder = [
    { name: 'Backgrounds', number: 10 },
    { name: 'Fur', number: 16 },
    { name: 'Eye', number: 16 },
    { name: 'Eyebrow', number: 12 },
    { name: 'Head', number: 46 },
    { name: 'Clothes', number: 57 },
    { name: 'Earring', number: 20 }, // 45%
    { name: 'Glasses', number: 45 }, // 40%
    { name: 'Nose', number: 30 }, // 30%
    { name: 'Ray', number: 100 }, // 2%
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

const defaultEdition = 1000;

module.exports = { layersOrder, format, rarity, defaultEdition };
