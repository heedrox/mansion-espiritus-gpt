import { data } from './app/data/data.js';
import { ScureCliApp } from './scure-cli/index.js';
import { SimpleParser } from './scure-cli/simple-parser/index.js';
import { HTMLrenderer } from './app/output/html-renderer.js';

if (window && !window.global) window.global = { }

const simpleParser = new SimpleParser()
const renderer = new HTMLrenderer("content")
const app = new ScureCliApp({
    data: data['es'],
    parser: simpleParser,
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
    app.start()
})()


