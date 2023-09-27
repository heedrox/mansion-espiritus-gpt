const { data } = require('./app/data/data');
const {ScureCliApp} = require('./scure-cli/index.js');
const { SimpleParser } = require('./scure-cli/simple-parser.js');

const superCutreParser = new SimpleParser()
const app = new ScureCliApp(data['es'], superCutreParser)

;(async() => {
    await app.start()
})()


