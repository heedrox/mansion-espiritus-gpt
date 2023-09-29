require('babel-register');
const { scure } = require('scure')
const testData = require('./data/data-test.js').data

const { buildScureFor } = scure

global.chai = require('chai')
global.sinon = require('sinon')

global.chai.should();
global.expect = global.chai.expect;
global.buildTestScure = () => buildScureFor(testData);
