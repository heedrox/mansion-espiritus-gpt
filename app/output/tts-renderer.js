import DronSpeech from "./speech/dron-speech.js";

const hasXml = text => text.indexOf("<")>=0 && text.indexOf(">")>=0
const assureXml = (sentence) => hasXml(sentence) ? `<?xml version="1.0" encoding="UTF-8"?>${sentence}` : sentence
export class TTSRenderer {
    constructor(fieldName) {
        this.fieldName = fieldName
        this.dronSpeech = new DronSpeech({
          lang: "es-ES"        
        })
    }


    render(sentence) {
        const strippedResponse = sentence.replace(/<[^>]*>?/gm, '');
        const spacesRemoved = strippedResponse.replace(/ +/g, ' ');
        document.getElementById(this.fieldName).innerHTML = spacesRemoved        

        
        this.dronSpeech.speak(assureXml(sentence))
      }
    }
