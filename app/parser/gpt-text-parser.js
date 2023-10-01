import { queryGpt } from "./query-gpt.js"

export class GptTextParser {
    constructor(openAiKey) {
        this.openAiKey = openAiKey
    }

    async parseWithGpt(text) {
        const response = await queryGpt(text, this.openAiKey)
        return JSON.parse(response)
    }

    async parse(text) {
        return text ? this.parseWithGpt(text) : {}
    }
}
