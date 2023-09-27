const createConversation = () => ({
    data: {}    
})

const getConv = () => global.conv ? global.conv : createConversation();

exports.getConv =  getConv;
