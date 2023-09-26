const { data } = require('./app/data/data');
const {ScureCliApp} = require('./scure-cli/index.js')

const app = new ScureCliApp(data['es'])

app.start()

