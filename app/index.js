import env from '../env.js'

export class App {
    constructor({ renderer }) {
        this.renderer = renderer
        this.previousConversation = []
    }

    async start() {
        await this.processUserInput('START_ADVENTURE')
    }

    async processUserInput(text) {
        
        const response = await this._apiCall(text)
        this.renderer.render(response.sentence)
        this.previousConversation.push(userInput(text))
        this.previousConversation.push(dronAnswer(response.sentence))        
    }

    async _apiCall(text) {
        const response = await fetch(env.API_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                text,
                language: "es",
                conv: {
                    previousConversation: this.previousConversation
                }   
            })
        })
        return response.json()
    }
}

const userInput = (sentence) => ({ user: 'USER', sentence })
const dronAnswer = (sentence) => ({ user: 'DRON', sentence })