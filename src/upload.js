require('dotenv').config();
const fs = require('fs');
const ipfsHttpClient = require('ipfs-http-client');
const env = require('./env');
const { IPFS_PROJECT_ID, IPFS_PROJECT_SECRET } = process.env;

if (!process.env.PWD) {
    process.env.PWD = process.cwd();
}

const client = ipfsHttpClient.create({
    url: 'https://ipfs.infura.io:5001/api/v0',
    headers: {
        authorization: 'Basic ' + Buffer.from(`${IPFS_PROJECT_ID}:${IPFS_PROJECT_SECRET}`).toString('base64')
    }
});

async function upload() {
    try {
        const dragonId = 1;
        const file = fs.readFileSync(`${process.env.PWD}\\${env.buildFolder}\\images\\${dragonId}.png`);
        const uploaded = await client.add(
            file,
            {
                progress: (prog) => console.log(`received: ${prog}`)
            }
        );

        const metaFile = fs.readFileSync(`${process.env.PWD}\\${env.buildFolder}\\metadata\\${dragonId}.json`);
        const metadata = JSON.parse(metaFile);
        metadata.image = `https://ipfs.infura.io/ipfs/${uploaded.path}`;

        const added = await client.add(JSON.stringify(metadata));
        const dataURL = `https://ipfs.infura.io/ipfs/${added.path}`;

        const dragonsFile = fs.readFileSync(`${process.env.PWD}\\${env.buildFolder}\\dragons.json`);
        const dragons = JSON.parse(dragonsFile);
        dragons.list.push({
            id: dragonId,
            url: dataURL,
            isSold: false
        });

        fs.writeFileSync(`${process.env.PWD}\\${env.buildFolder}\\dragons.json`, JSON.stringify(dragons));
    } catch (error) {
        console.log('error: ', error);
    }
}

upload();
