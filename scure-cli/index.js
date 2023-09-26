const { cleanData } = require('./lib/common');
const { getConv } = require('./lib/conv-repository');
const ScureCliIntentExecutor = require('./lib/scure-cli-intent-executor');

class ScureCliApp {
  constructor(data) {
    this.intentExecutor = new ScureCliIntentExecutor(data)
  }
  start() {
    const conv = getConv()
    cleanData(conv)
    const response = this.intentExecutor.executeIntent('_welcome', conv, { arg: null })
    console.log('respuesta', response)
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    
  readline.question(`What's your name?`, name => {
      console.log(`Hi ${name}!`);
      readline.close();
      });
  
  }
}

exports.ScureCliApp = ScureCliApp

