import GptParser from "../../app/parser/gpt-parser"
import env from '../../env.js'

describe('Gpt parser', () => {
    test('returns intentName look', async () => {
        const parser = new GptParser(env.OPEN_AI_KEY)

        const response = await parser.parse("mira")

        expect(response).toStrictEqual({
            intentName: "look",
            arg: []
        })
    })

    test('returns intentName look with an argument', async () => {
        const parser = new GptParser(env.OPEN_AI_KEY)

        const response = await parser.parse("mira la piscina")

        expect(response).toStrictEqual({
            intentName: "look",
            arg: [ "piscina" ]
        })
    })
})