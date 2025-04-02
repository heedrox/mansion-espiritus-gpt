import { App } from '../../app/index.js'

const renderer = {
    render: () => {}
}

describe('App', () => {
    it('starts', async () => {
        const app = new App(renderer)

        expect(app.start).toBeDefined()
    })
})