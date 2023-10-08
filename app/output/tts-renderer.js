export class TTSRenderer {
    constructor(fieldName) {
        this.fieldName = fieldName
    }


    render(sentence) {
        const strippedResponse = sentence.replace(/<[^>]*>?/gm, '');
        const spacesRemoved = strippedResponse.replace(/ +/g, ' ');
        document.getElementById(this.fieldName).innerHTML = spacesRemoved        

        const ut = new SpeechSynthesisUtterance('No warning should arise');
        ut.onerror = function (event) {
            console.error("SpeechSynthesisUtterance.onerror", event);
          };
  
window.speechSynthesis.speak(ut);
return;
        const utterThis = new SpeechSynthesisUtterance(sentence);

        utterThis.onend = function (event) {
          console.log("SpeechSynthesisUtterance.onend");
        };
    
        utterThis.onerror = function (event) {
          console.error("SpeechSynthesisUtterance.onerror", event);
        };
    
        window.speechSynthesis.speak(utterThis);
      }
    }
