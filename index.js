import env from './env.js'

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


