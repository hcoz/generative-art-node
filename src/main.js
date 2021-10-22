const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const console = require('console');
const env = require('./env.json');

const { layersOrder, format, rarity } = require(`./${env.configFile}`);

const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext('2d');

if (!process.env.PWD) {
    process.env.PWD = process.cwd();
}

const buildDir = `${process.env.PWD}/${env.buildFolder}`;
const metDataFile = '_metadata.json';
const layersDir = `${process.env.PWD}/${env.layersFolder}`;

let metadata = [];
let attributes = [];
let hash = [];
let decodedHash = [];
const Exists = new Map();


const addRarity = _str => {
    let itemRarity;

    rarity.forEach((r) => {
        if (_str.includes(r.key)) {
            itemRarity = r.val;
        }
    });

    return itemRarity;
};

const cleanName = _str => {
    let name = _str.slice(0, -4);
    rarity.forEach((r) => {
        name = name.replace(r.key, '');
    });
    return name;
};

const getElements = path => {
    return fs
        .readdirSync(path)
        .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
        .map((i, index) => {
            return {
                id: index + 1,
                name: cleanName(i),
                fileName: i,
                rarity: addRarity(i),
            };
        });
};

const layersSetup = layersOrder => {
    const layers = layersOrder.map((layerObj, index) => ({
        id: index,
        name: layerObj.name,
        location: `${layersDir}/${layerObj.name}/`,
        elements: getElements(`${layersDir}/${layerObj.name}/`),
        position: { x: 0, y: 0 },
        size: { width: format.width, height: format.height },
        number: layerObj.number
    }));

    return layers;
};

const buildSetup = () => {
    if (fs.existsSync(buildDir)) {
        fs.rmdirSync(buildDir, { recursive: true });
    }
    fs.mkdirSync(buildDir);
    fs.mkdirSync(`${buildDir}/images`);
    fs.mkdirSync(`${buildDir}/metadata`);
};

const saveLayer = (_canvas, _edition) => {
    fs.writeFileSync(`${buildDir}/images/${_edition}.png`, _canvas.toBuffer('image/png'));
};

const addMetadata = _edition => {
    // let dateTime = Date.now();
    let tempMetadata = {
        // hash: hash.join(''),
        // decodedHash: decodedHash,
        // edition: _edition,
        // date: dateTime,
        description: 'Friendly OpenSea Creature that enjoys long swims in the ocean.',
        external_url: 'https://openseacreatures.io/3',
        image: 'https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png',
        name: _edition,
        attributes: attributes,
    };
    metadata.push(tempMetadata);
    createMetaDataJson(tempMetadata);
    attributes = [];
    hash = [];
    decodedHash = [];
};

const addAttributes = (_element, _layer) => {
    let tempAttr = {
        trait_type: _layer.name,
        value: _element.name
        // id: _element.id,
        // layer: _layer.name,
        // name: _element.name,
        // rarity: _element.rarity,
    };
    attributes.push(tempAttr);
    hash.push(_layer.id);
    hash.push(_element.id);
    decodedHash.push({ [_layer.id]: _element.id });
};

const drawLayer = async (_layer, _edition) => {
    const rand = Math.random();
    let element =
        _layer.elements[Math.floor(rand * _layer.number)] ? _layer.elements[Math.floor(rand * _layer.number)] : null;
    if (element) {
        addAttributes(element, _layer);
        const image = await loadImage(`${_layer.location}${element.fileName}`);

        ctx.drawImage(
            image,
            _layer.position.x,
            _layer.position.y,
            _layer.size.width,
            _layer.size.height
        );
        saveLayer(canvas, _edition);
    }
};

const createFiles = async edition => {
    const layers = layersSetup(layersOrder);

    let numDupes = 0;
    for (let i = 1; i <= edition; i++) {
        await layers.forEach(async (layer) => {
            await drawLayer(layer, i);
        });

        let key = hash.toString();
        if (Exists.has(key)) {
            console.log(
                `Duplicate creation for edition ${i}. Same as edition ${Exists.get(
                    key
                )}`
            );
            numDupes++;
            if (numDupes > edition) break; //prevents infinite loop if no more unique items can be created
            i--;
        } else {
            Exists.set(key, i);
            addMetadata(i);
            console.log('Creating edition ' + i);
        }
    }
};

const createMetaData = () => {
    fs.stat(`${buildDir}/${metDataFile}`, (err) => {
        if (err == null || err.code === 'ENOENT') {
            fs.writeFileSync(`${buildDir}/${metDataFile}`, JSON.stringify(metadata, null, 2));
        } else {
            console.log('Oh no, error: ', err.code);
        }
    });
};

function createMetaDataJson(meta) {
    fs.stat(`${buildDir}/${metDataFile}`, (err) => {
        if (err == null || err.code === 'ENOENT') {
            fs.writeFileSync(`${buildDir}/metadata/${meta.name}${metDataFile}`, JSON.stringify(meta, null, 2));
        } else {
            console.log('createMetaDataJson error: ', err.code);
        }
    });
}

module.exports = { buildSetup, createFiles, createMetaData };
