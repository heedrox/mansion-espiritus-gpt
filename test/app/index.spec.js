import { App } from '../../app/index.js'

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

        expect(renderer.render).toHaveBeenCalledWith('a-sentence')
    })
})