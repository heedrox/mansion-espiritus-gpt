import { data } from './app/data/data.js';
import { GptTextParser }  from './app/parser/gpt-text-parser.js';
import {ScureCliApp} from './scure-cli/index.js';
import { SimpleParser } from './scure-cli/simple-parser/index.js';

const superCutreParser = new SimpleParser()
const improvedParser = new GptTextParser()
const app = new ScureCliApp(data['es'], improvedParser)

;(async() => {
    await app.start()
})()


