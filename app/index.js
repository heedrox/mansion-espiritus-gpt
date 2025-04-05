import env from '../env.js'

export class App {
    constructor({ renderer }) {
        this.renderer = renderer
        this.previousConversation = []
        this.summary = undefined
        this.convData = undefined
    }

    async start() {
        await this.processUserInput('START_ADVENTURE')
    }

    async processUserInput(text) {
        this.renderer.addUserInput(text)
        this.renderer.setAsWaiting()
        const response = await this._apiCall(text)
        this.renderer.renderResponse(response.sentence)
        this.previousConversation.push(userInput(text))
        this.previousConversation.push(dronAnswer(response.sentence))        
        this.summary = response.summary ? response.summary : this.summary
        this.convData = response.conv?.data ? response.conv.data : this.convData
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
                    previousConversation: this.previousConversation,
                    data: this.convData
                },
                summary: this.summary  
            })
        })
        return response.json()
    }
}

const userInput = (sentence) => ({ user: 'USER', sentence })
const dronAnswer = (sentence) => ({ user: 'DRON', sentence })