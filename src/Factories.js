const uuidv4 = require('uuid/v4');
const createUser = ({name ='' } = {}) => (
    {
        id:uuidv4(),
        name
    }
);
const createMessage = ({message = '',sender = ''} =  {}) => (
    
    {
        id:uuidv4(),
        time: new Date(Date.now()),
        message,
        sender
    }

);

const createChat = ({message = [], name =  "Community", users =  []} = {}) => (
    {
        id:uuidv4(),
        name,
        message,
        users,
        typingUsers:[]
    }
)
const getTime = (date) =>{
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`
}

module.export = { 
    createChat,
    createMessage,
    createUser
}