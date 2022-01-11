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
        const file = fs.readFileSync(`${process.env.PWD}\\${env.buildFolder}\\images\\1.png`);
        const uploaded = await client.add(
            file,
            {
                progress: (prog) => console.log(`received: ${prog}`)
            }
        );
        console.log('uploaded: ', uploaded);
        
        const metaFile = fs.readFileSync(`${process.env.PWD}\\${env.buildFolder}\\metadata\\1.json`);
        const metadata = JSON.parse(metaFile);
        metadata.image = `https://ipfs.infura.io/ipfs/${uploaded.path}`;
        console.log('metadata: ', metadata);
        const added = await client.add(JSON.stringify(metadata));
        console.log('added: ', added);
        const dataURL = `https://ipfs.infura.io/ipfs/${added.path}`;
        console.log('dataURL: ', dataURL);
    } catch (error) {
        console.log('error: ', error);
    }
}

upload();
