export class HTMLrenderer {
    constructor(fieldName) {
        this.fieldName = fieldName
    }

    render(sentence) {
        const strippedResponse = sentence.replace(/<[^>]*>?/gm, '');
        const spacesRemoved = strippedResponse.replace(/ +/g, ' ');
        document.getElementById(this.fieldName).innerHTML = spacesRemoved        
    }
}
