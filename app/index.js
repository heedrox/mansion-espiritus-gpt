import env from '../env.js'

export class App {
    constructor({ renderer }) {
        this.renderer = renderer
    }

    async start() {
        console.log("Starting app...")
        const response = await this._apiCall('START_ADVENTURE')
        this.renderer.render(response.sentence)
    }
    async processUserInput(text) {
        const response = await this._apiCall(text)
        this.renderer.render(response.sentence)
    }

    async _apiCall(text) {
        const response = await fetch(`${env.API_URL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                text,
                language: "es",
                conv: {
                    previousConversation: []
                }   
            })
        })
        return response.json()
    }
}