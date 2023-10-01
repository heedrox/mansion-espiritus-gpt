import { cleanData } from './lib/common.js';
import { getConv } from './lib/conv-repository.js';
import { ScureCliIntentExecutor } from './lib/scure-cli-intent-executor.js';
import { UserTextReader } from './lib/user-text-reader.js';

export class ScureCliApp {
  constructor(data, parser) {
    this.executor = new ScureCliIntentExecutor(data)
    this.userTextReader = new UserTextReader()
    this.parser = parser
  }

  async showResponse(sentence) {
    const strippedResponse = sentence.replace(/<[^>]*>?/gm, '');
    const spacesRemoved = strippedResponse.replace(/ +/g, ' ');
  }

  async start() {
    const conv = getConv()
    cleanData(conv)
    const welcomeResponse = this.executor.executeIntent('_welcome', conv, { arg: null })
    await this.showResponse(welcomeResponse.sentence)
    let response = { sentence: '', isEnd: false }
    do {
      const text = await this.userTextReader.readUserText('(look/use/walk/pickup/inventory/answer) >')
      const { intentName, arg } = await this.parser.parse(text)
      try {
        response = this.executor.executeIntent(intentName, conv, { arg })
        await this.showResponse(response.sentence)
      } catch (_) {
        await this.showResponse('No he podido procesar esta petición, lo siento.')
      }      
    } while (!response.isEnd)
    this.userTextReader.close()
  }
}


