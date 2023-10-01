import { scure } from 'scure'
import { intentProcessor } from './intent-processor.js';
import { checkForSyns } from './check-for-syns.js';
import { bye, fallback, help, inventory, look, pickup, use, walk, welcome, answer } from '../intents/index.js';

const { buildScureFor } = scure
 
export class ScureCliIntentExecutor {
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
            'say':  scureIntentProcessor(say)
        }
    }

    executeIntent(intentName, conv, arg) {
        return this.executor[intentName](conv, arg)
    }
}
