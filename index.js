import { data } from './app/data/data.js';
import { GptTextParser }  from './app/parser/gpt-text-parser.js';
import {ScureCliApp} from './scure-cli/index.js';
import { SimpleParser } from './scure-cli/simple-parser/index.js';
import env from './env.js'
import { TTSRenderer } from './app/output/tts-renderer.js';

if (window && !window.global) window.global = { }

const superCutreParser = new SimpleParser()
const improvedParser = new GptTextParser(env.OPEN_AI_KEY)
const renderer = new TTSRenderer("content")
const app = new ScureCliApp({
    data: data['es'],
    parser: improvedParser,
    renderer,
    debug: true
})

const processUserInput = (evt) => {
    evt.preventDefault();
    try {
        const text = document.getElementById("userInput").value
        if (text) {
            document.getElementById("content").innerHTML = "..."
            document.getElementById("userInput").value = ""
            document.getElementById("userInput").focus()
            app.processUserInput(text);                
        }
    } catch (err) {
        console.error(err)
    }
    
    return false;
}

;(async() => {
    document.getElementById("userInputForm").addEventListener("submit", processUserInput)
    document.getElementById("button-start").addEventListener("click", () => {
        app.start()
        document.getElementById("play-area").classList.remove("invisible")
        document.getElementById("start-area").classList.add("d-none")
    })    
})()


