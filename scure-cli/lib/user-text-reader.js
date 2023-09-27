class UserTextReader {
  constructor() {
    this.readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });  
  }

  async readUserText(prompt) {
    return new Promise((resolve) => {
      this.readline.question(prompt, text => {
        return resolve(text)
      })
    })
  }

  close() {
    this.readline.close()
  }
}

exports.UserTextReader = UserTextReader