const getArg = (data) => {
    if (data.length <= 1) return null
    if (data.length === 2) return [ data[1] ]
    return [ data[1], data[2] ]
}

// SimpleParser allows to add text in the following format:
// `command` or `command,item1` or `command,item1,item2`
// command can be: walk, look, inventory, help, use, pickup, 
export class SimpleParser {
    async parse(text) {
        const data = text.split(',')
        return {
            intentName: data[0],
            arg: getArg(data)
        }
    }
}

