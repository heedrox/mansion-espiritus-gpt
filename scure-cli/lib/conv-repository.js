const createConversation = () => ({
    data: {}    
})

export const getConv = () => global.conv ? global.conv : createConversation();

