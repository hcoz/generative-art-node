const myArgs = process.argv.slice(2);
const env = require('./src/env');
const { buildSetup, createFiles } = require('./src/main.js');
const { defaultEdition } = require(`./src/${env.configFile}`);
const edition = myArgs.length > 0 ? Number(myArgs[0]) : defaultEdition;

(() => {
    buildSetup();
    createFiles(edition);
})();
