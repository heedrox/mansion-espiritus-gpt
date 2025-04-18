export class HTMLRenderer {
    constructor() {
        this.rootField = "play-area"
        this.dronClass = "dron-answer"
        this.userClass = "user-input"
    }

    start() {
        const node = document.getElementById("begin-text")
        node.parentElement.removeChild(node)
        const newNode = this.getContentField(node.innerHTML)
        newNode.classList.add(this.dronClass)
    }

    getContentField(html) {
        const node = document.createElement("div")
        node.classList.add("content-box")
        node.classList.add("p-3")
        node.innerHTML = html
        document.getElementById(this.rootField).appendChild(node)
        return node
    }
    addUserInput(text) {
        const textToShow = text === 'START_ADVENTURE' ? "Adelante, ¡EMPECEMOS!" : text
        const node = this.getContentField(textToShow)
        node.classList.add(this.userClass)        
    }
    setAsWaiting() {
        const node = this.getContentField("...")
        node.classList.add(this.dronClass)
        if (document.getElementById("last-dron-answer")) {
            document.getElementById("last-dron-answer").removeAttribute("id")
        }
        node.id = "last-dron-answer"
        this.scrollToBottom()
    }
    renderResponse(sentence) {
        const strippedResponse = sentence.replace(/<[^>]*>?/gm, '');
        const spacesRemoved = strippedResponse.replace(/ +/g, ' ');
        const node = document.getElementById("last-dron-answer")
        node.innerHTML = spacesRemoved  
        this.scrollToBottom()
    }

    scrollToBottom() {
        setTimeout(() => {
            const node = document.getElementById("last-dron-answer")
            if (document.getElementsByClassName("content-box").length > 2) {
                node.scrollIntoView({ 
                behavior: "smooth", 
                block: "end",
                inline: "nearest"
            })
                window.scrollBy(0, 100)
            }
        }, 100)
    }

    end() {
        document.getElementById("play-area").classList.remove("invisible")        
    }
}

