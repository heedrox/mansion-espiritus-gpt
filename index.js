import env from './env.js'
import { App } from './app/index.js'
import { HTMLRenderer } from './app/output/html-renderer.js'

const htmlRenderer = new HTMLRenderer("content")
const app = new App({ renderer: htmlRenderer})

const processUserInput = async (evt) => {
    evt.preventDefault();
    try {
        const text = document.getElementById("userInput").value
        if (text) {
            document.getElementById("content").innerHTML = "..."
            document.getElementById("userInput").value = ""
            document.getElementById("userInput").focus()
            await app.processUserInput(text);                
        }
    } catch (err) {
        console.error(err)
    }
    
    return false;
}

;(async() => {
    document.getElementById("userInputForm").addEventListener("submit", processUserInput)
    document.getElementById("button-start").addEventListener("click", async () => {
        await app.start()
        document.getElementById("play-area").classList.remove("invisible")
        document.getElementById("start-area").classList.add("d-none")
    })    
})()


