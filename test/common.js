const { scure } = require('scure')
const testData = require('./data/data-test.js').data

const { buildScureFor } = scure

global.buildTestScure = () => buildScureFor(testData);
