const CONFIG = {
    NAME: 'Chat',
    PORT: 3003,

    DATABASE: {
        NAME: 'data.db',
    },

    OFFLINE_MS: 5000,

    MEDIATOR: {
        EVENTS: {
            MESSAGE_SENDED: 'MESSAGE_SENDED',
            USER_REGISTERED: 'USER_REGISTERED',
            USER_LOGGED_IN: 'USER_LOGGED_IN',
            USER_ONLINE_UPDATED: 'USER_ONLINE_UPDATED',
            CHAT_UPDATED: 'CHAT_UPDATED',
        },
        TRIGGERS: {
            GET_USER_BY_TOKEN: 'GET_USER_BY_TOKEN',
            SET_USER_ONLINE: 'SET_USER_ONLINE',
            GET_ALL_USERS: 'GET_ALL_USERS',
            GET_MESSAGES_HASH: 'GET_MESSAGES_HASH',
            GET_MESSAGES: 'GET_MESSAGES',
            SEND_MESSAGE: 'SEND_MESSAGE',
            REGISTER_USER: 'REGISTER_USER',
            LOGIN_USER: 'LOGIN_USER',
        },
    },
}

module.exports = CONFIG;