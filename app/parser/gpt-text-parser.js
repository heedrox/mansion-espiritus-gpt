import { queryGpt } from "./query-gpt.js"

const buildPrompt = (conversation, texto) => 
    (`La conversación anterior ha sido:
    ${conversation.map(({user, sentence}) => `${user}> ${sentence}`).join("\n")}
    
    El usuario ahora dice: 
    USER>${texto}
    `)
    
export class GptTextParser {
    constructor(openAiKey) {
        this.openAiKey = openAiKey
        this.previousConversation = []
    }

    async parseWithGpt(text, conversation) {
        const response = await queryGpt(buildPrompt(conversation, text), this.openAiKey)
        try {
            return JSON.parse(response)
        } catch(_) {
            return {
                intentName: "say",
                arg: [ response ]
            }
        }
        
    }

    async parse(text, conversation = []) {
        return text ? this.parseWithGpt(text, conversation.length >= 4 ? conversation.slice(-4) : conversation ) : {}
    }
}
