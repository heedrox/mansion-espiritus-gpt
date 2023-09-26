const createConversation = () => ({
    data: {},
    ask: (...args) => console.log(args),
    close: (...args)=> console.log(args),
})

const getConv = () => global.conv ? global.conv : createConversation();

exports.getConv =  getConv;
