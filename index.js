import { data } from './app/data/data.js';
import { GptTextParser }  from './app/parser/gpt-text-parser.js';
import {ScureCliApp} from './scure-cli/index.js';
import { SimpleParser } from './scure-cli/simple-parser/index.js';
import 'dotenv/config'

const superCutreParser = new SimpleParser()
const improvedParser = new GptTextParser(process.env.OPEN_AI_KEY)
const app = new ScureCliApp(data['es'], improvedParser)

;(async() => {
    await app.start()
})()


