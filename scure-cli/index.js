import { cleanData } from './lib/common.js';
import { getConv } from './lib/conv-repository.js';
import { ScureCliIntentExecutor } from './lib/scure-cli-intent-executor.js';

export class ScureCliApp {
  constructor({ data, parser, renderer, debug }) {
    this.executor = new ScureCliIntentExecutor(data)    
    this.parser = parser
    this.renderer = renderer
    this.debug = debug
    this.conversation = []
    this.conv = getConv()
    cleanData(this.conv)
  }

  async showResponse(sentence) {
    await this.renderer.render(sentence)
  }

  start() {
    const welcomeResponse = this.executor.executeIntent('_welcome', this.conv, { arg: null })
    this.showResponse(welcomeResponse.sentence)
    this.conversation.push({ user: 'DRON', sentence: welcomeResponse.sentence })    
  }

  async processUserInput(text) {            
      try {
        this.conversation.push({ user: 'USER', sentence: text })
        const { intentName, arg } = await this.parser.parse(text, this.conversation)
        if (this.debug) {
          console.log({ intentName, arg })
        }
        if (intentName) {
          const response = this.executor.executeIntent(intentName, this.conv, { arg })
          await this.showResponse(response.sentence)
          this.conversation.push({ user: 'DRON', sentence: response.sentence })
          response.isEnd = true  
        }
      } catch (error) {
        console.error('Hubo un error procesando la petición. ', error)
      }      
  }
  
}


