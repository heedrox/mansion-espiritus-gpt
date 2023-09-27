const { cleanData } = require('./lib/common');
const { getConv } = require('./lib/conv-repository');
const ScureCliIntentExecutor = require('./lib/scure-cli-intent-executor');
const { UserTextReader } = require('./lib/user-text-reader');

class ScureCliApp {
  constructor(data, parser) {
    this.intentExecutor = new ScureCliIntentExecutor(data)
    this.userTextReader = new UserTextReader()
    this.parser = parser
  }

  async showResponse(sentence) {
    const strippedResponse = sentence.replace(/<[^>]*>?/gm, '');
    console.log(strippedResponse)
  }

  async start() {
    const conv = getConv()
    cleanData(conv)
    const welcomeResponse = this.intentExecutor.executeIntent('_welcome', conv, { arg: null })
    await this.showResponse(welcomeResponse.sentence)
    let response = { sentence: '', isEnd: false }
    do {
      const text = await this.userTextReader.readUserText('(look/use/walk/pickup/inventory/answer) >')
      const { intentName, arg } = this.parser.parse(text)
      try {
        response = this.intentExecutor.executeIntent(intentName, conv, { arg })
        await this.showResponse(response.sentence)
      } catch (_) {
        await this.showResponse('No he podido procesar esta petición, lo siento.')
      }      
    } while (!response.isEnd)
    this.userTextReader.close()
  }
}

exports.ScureCliApp = ScureCliApp

