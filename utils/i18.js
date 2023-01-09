const i18next = require('i18next');
const Backend = require('i18next-node-fs-backend');
const path = require("path")

const localpath = path.join(__dirname,"../locales")

i18next
    .use(Backend)
    .init({
        backend: {
            loadPath: path.join(localpath, "/{{lng}}/translation.json")
        },
        preload: ['en', 'pt'],
        saveMissing: true,
        fallBackLng: ['en']
    }
);

module.exports = i18next;