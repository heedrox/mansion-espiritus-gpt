const { GptTextParser } = require("../../app/parser/gpt-text-parser")

describe('Gpt Text parser', () => {
    it('parses an empty text', async () => {
        const parser = new GptTextParser()
        const response = await parser.parse('')

        expect(response).to.eql({})
    })
    it('parses a text with gpt', async () => {
        const parser = new GptTextParser()
        const response = await parser.parse('mirar habitacion')

        expect(response).to.eql({ intentName: 'look', arg: [ 'habitacion' ]})
    })
    it('parses another text with gpt', async () => {
        const parser = new GptTextParser()
        const response = await parser.parse('abrir el baul con la llave')

        expect(response).to.eql({ intentName: 'use', arg: [ 'baul', 'llave' ]})
    })
})