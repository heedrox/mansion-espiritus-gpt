export default class DronSpeech {
  constructor(options) {
    this.lang = options.lang;
    this.callback = options.callback ? options.callback : () => {};
    this.interval = null;
    this.maleVoice = speechSynthesis.getVoices().find(({ name }) => name.toLowerCase().includes("male"));
    console.log(speechSynthesis.getVoices(), this.maleVoice)
  }

  speak(text) {
    /*const voices = speechSynthesis.getVoices();
    for (let i = 0; i < voices.length; i++) {
      console.log('Voice ' + i.toString() + ' ' + voices[i].name + ' ' + voices[i].voiceURI + ' ' + voices[i].lang);
    }*/
    const doSpeak = () => {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.voiceURI = 'native';
      if (this.maleVoice) speech.voice = this.maleVoice
      speech.rate = 1.2;
      speech.lang = this.lang;

      speech.addEventListener('end', () => {
        this.clearInterval();
        this.callback();
      });
      this.interval = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          this.clearInterval();
          this.callback();
        }
      }, 500);

      window.speechSynthesis.speak(speech);
    }

    this.clearInterval();
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setTimeout(() => doSpeak(), 500)
    } else {
      doSpeak()
    }
    
  }

  cancel() {
    this.clearInterval();
    window.speechSynthesis.cancel();
  }

  clearInterval() {
    if (this.interval != null) {
      clearInterval(this.interval);
    }
  }
}