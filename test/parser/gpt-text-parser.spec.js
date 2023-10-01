import { GptTextParser } from "../../app/parser/gpt-text-parser"

const OPEN_AI_KEY = process.env.OPEN_AI_KEY

describe('Gpt Text parser', () => {
    it('parses an empty text', async () => {
        const parser = new GptTextParser(OPEN_AI_KEY)
        const response = await parser.parse('')

        expect(response).toStrictEqual({})
    })
    it('parses a text with gpt', async () => {
        const parser = new GptTextParser(OPEN_AI_KEY)
        const response = await parser.parse('mirar habitacion')

        expect(response).toStrictEqual({ intentName: 'look', arg: [ 'habitación' ]})
    })
    it('parses another text with gpt', async () => {
        const parser = new GptTextParser(OPEN_AI_KEY)

        const response = await parser.parse('abrir el baul con la llave')

        expect(response).toStrictEqual({ intentName: 'use', arg: [ 'baul', 'llave' ]})
    })
})