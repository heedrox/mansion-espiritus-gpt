import { queryGpt } from "./query-gpt.js"

export class GptTextParser {
    constructor() {

    }

    async parseWithGpt(text) {
        const response = await queryGpt(text, openAikey)
        return response
    }

    async parse(text) {
        return text ? this.parseWithGpt(text) : {}
    }
}
