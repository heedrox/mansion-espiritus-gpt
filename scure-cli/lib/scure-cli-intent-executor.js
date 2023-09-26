const { buildScureFor } = require('scure').scure;
const { intentProcessor } = require('./intent-processor');
const { checkForSyns } = require('./check-for-syns');
const { bye, fallback, help, inventory, look, pickup, use, walk, welcome, answer } = require('../intents');

class ScureCliIntentExecutor {
    constructor(data) {
        const scure = buildScureFor(data);
        this.scure = scure
        const scureIntentProcessor = intentProcessor(scure);
        this.executor = {
            '_fallback' : scureIntentProcessor(fallback),
            '_welcome': scureIntentProcessor(welcome),
            '_default-bye:': scureIntentProcessor(bye),
            'bye': scureIntentProcessor(bye),
            '_exit': scureIntentProcessor(bye),
            'look': scureIntentProcessor(checkForSyns(look)),
            'walk': scureIntentProcessor(checkForSyns(walk)),
            'pickup': scureIntentProcessor(checkForSyns(pickup)),
            'use': scureIntentProcessor(checkForSyns(use)),
            'inventory': scureIntentProcessor(inventory),
            'answer': scureIntentProcessor(answer),
            'help': scureIntentProcessor(help),
        }
    }

    executeIntent(intentName, conv, arg) {
        return this.executor[intentName](conv, arg)
    }
}

module.exports = ScureCliIntentExecutor