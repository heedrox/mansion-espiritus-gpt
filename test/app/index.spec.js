import { App } from '../../app/index.js'
import env from '../../env.js'

const renderer = {
    render: jest.fn()
}

global.fetch = jest.fn()

const whenFetchResolvesJson = (data) => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(data)
        })
    );
}

describe('App', () => {
    beforeEach(() => {
        global.fetch.mockClear();
    });

    it('starts', async () => {
        whenFetchResolvesJson({ sentence: 'a-sentence' })
        const app = new App({ renderer })

        await app.start()

        expect(global.fetch).toHaveBeenCalledWith(env.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: 'START_ADVENTURE',
                language: 'es',
                conv: { previousConversation: [] }
            })
        }
        )
        expect(renderer.render).toHaveBeenCalledWith('a-sentence')
    })

    describe('when processing user input', () => {
        it('renders response', async () => {
            whenFetchResolvesJson({ sentence: 'answer-sentence' })
            const app = new App({ renderer })

            await app.processUserInput('user-input')

            expect(renderer.render).toHaveBeenCalledWith('answer-sentence')
        })
        it('sends state with previous conversation', async () => {
            const app = new App({ renderer })

            whenFetchResolvesJson({ sentence: 'answer-sentence-1' })
            await app.start()
            whenFetchResolvesJson({ sentence: 'answer-sentence-2' })
            await app.processUserInput('user-input')

            const body = JSON.parse(global.fetch.mock.lastCall[1].body)
            expect(body.conv.previousConversation).toEqual([
                { user: 'USER', sentence: 'START_ADVENTURE' },
                { user: 'DRON', sentence: 'answer-sentence-1' }
            ])
        })
        
        it('sends summary from previous conversation', async () => {
            const app = new App({ renderer })

            whenFetchResolvesJson({ sentence: 'answer-sentence-1', summary: 'a-summary' })
            await app.start()
            whenFetchResolvesJson({ sentence: 'answer-sentence-2' })
            await app.processUserInput('user-input')

            const body = JSON.parse(global.fetch.mock.lastCall[1].body)
            expect(body.summary).toEqual('a-summary')
        })
    })
})