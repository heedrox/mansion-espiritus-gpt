const getArg = (data) => {
    if (data.length <= 1) return null
    if (data.length === 2) return data[1]
    return [ data[1], data[2] ]
}

class SimpleParser {
    parse(text) {
        const data = text.split(',')
        return {
            intentName: data[0],
            arg: getArg(data)
        }
    }
}

exports.SimpleParser = SimpleParser