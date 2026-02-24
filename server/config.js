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
        },
        TRIGGERS: {
            SET_STORE: 'SET_STORE', // записать в стор
            GET_STORE: 'GET_STORE', // получить из стора
        },
    },
}

module.exports = CONFIG;