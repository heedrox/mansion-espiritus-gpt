import { cleanData } from './lib/common.js';
import { getConv } from './lib/conv-repository.js';
import { ScureCliIntentExecutor } from './lib/scure-cli-intent-executor.js';
import { UserTextReader } from './lib/user-text-reader.js';

export class ScureCliApp {
  constructor(data, parser) {
    this.executor = new ScureCliIntentExecutor(data)
    this.userTextReader = new UserTextReader()
    this.parser = parser
    this.conversation = []
  }

  async showResponse(sentence) {
    const strippedResponse = sentence.replace(/<[^>]*>?/gm, '');
    const spacesRemoved = strippedResponse.replace(/ +/g, ' ');
    console.log(spacesRemoved)
  }

  async start() {
    const conv = getConv()
    cleanData(conv)
    const welcomeResponse = this.executor.executeIntent('_welcome', conv, { arg: null })
    await this.showResponse(welcomeResponse.sentence)
    this.conversation.push({ user: 'DRON', sentence: welcomeResponse.sentence })
    let response = { sentence: '', isEnd: false }
    do {
      const text = await this.userTextReader.readUserText('(look/use/walk/pickup/inventory/answer) >')
            
      try {
        this.conversation.push({ user: 'USER', sentence: text })
        const { intentName, arg } = await this.parser.parse(text, conversation)
        response = this.executor.executeIntent(intentName, conv, { arg })
        await this.showResponse(response.sentence)
        this.conversation.push({ user: 'DRON', sentence: response.sentence })
      } catch (error) {
        console.error('Hubo un error procesando la petición. ', error)
      }      
    } while (!response.isEnd)
    this.userTextReader.close()
  }
  
}


