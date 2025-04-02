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
        whenFetchResolvesJson({ sentence: 'a-sentence'})
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


})