export class HTMLRenderer {
    constructor() {
        this.rootField = "play-area"
        this.dronClass = "dron-answer"
        this.userClass = "user-input"
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
        if (text === 'START_ADVENTURE') {
            return
        }
        const node = this.getContentField(text)
        node.classList.add(this.userClass)        
    }
    setAsWaiting() {
        const node = this.getContentField("...")
        node.classList.add(this.dronClass)
        if (document.getElementById("last-dron-answer")) {
            document.getElementById("last-dron-answer").removeAttribute("id")
        }
        node.id = "last-dron-answer"
        node.scrollIntoView({ 
            behavior: "smooth", 
            block: "end",
            inline: "nearest"
        })
        window.scrollBy(0, 100)
    }
    renderResponse(sentence) {
        const strippedResponse = sentence.replace(/<[^>]*>?/gm, '');
        const spacesRemoved = strippedResponse.replace(/ +/g, ' ');
        const node = document.getElementById("last-dron-answer")
        node.innerHTML = spacesRemoved
        node.scrollIntoView({ 
            behavior: "smooth", 
            block: "end",
            inline: "nearest"
        })
        window.scrollBy(0, 100)
    }
}

