const CONFIG = require('../../../config');

class ChatManager {
    constructor({ mediator, db }) {
        this.db = db;
        this.mediator = mediator;
        this.EVENTS = this.mediator.getEventTypes();
        this.TRIGGERS = this.mediator.getTriggerTypes();

        this.mediator.set(this.TRIGGERS.GET_MESSAGES_HASH, () => db.getMessagesHash());
        this.mediator.set(this.TRIGGERS.GET_MESSAGES, () => db.getMessages());
        this.mediator.set(this.TRIGGERS.SEND_MESSAGE, ({ text, authorId }) => db.sendMessage(text, authorId));
    }

    setUserOnline(token) {
        const timestamp = Date.now();
        return this.mediator.get(this.TRIGGERS.SET_USER_ONLINE, { token, timestamp });
    }

    async getOnlineUsersList() {
        const now = Date.now();
        const offlineMs = CONFIG.OFFLINE_MS;
        const allUsers = await this.mediator.get(this.TRIGGERS.GET_ALL_USERS);
        return allUsers.map(function(u) {
            return {
                id: u.id,
                name: u.username,
                isOnline: (now - (u.online || 0)) <= offlineMs
            };
        });
    }

    async updateChat(token, clientHash) {
        const user = await this.mediator.get(this.TRIGGERS.GET_USER_BY_TOKEN, { token });
        if (!user) {
            return { error: true };
        }
        await this.setUserOnline(token);
        const serverHash = await this.mediator.get(this.TRIGGERS.GET_MESSAGES_HASH);
        let messages = null;
        if (clientHash !== serverHash) {
            messages = await this.mediator.get(this.TRIGGERS.GET_MESSAGES);
        }
        const users = await this.getOnlineUsersList();

        this.mediator.call(this.EVENTS.CHAT_UPDATED, {
            user,
            hash: serverHash,
            hasChanges: clientHash !== serverHash,
        });

        return { hash: serverHash, messages: messages, users: users };
    }

    async sendMessage(token, text) {
        const user = await this.mediator.get(this.TRIGGERS.GET_USER_BY_TOKEN, { token });
        if (!user) {
            return { error: true };
        }
        await this.mediator.get(this.TRIGGERS.SEND_MESSAGE, { text, authorId: user.id });

        this.mediator.call(this.EVENTS.MESSAGE_SENDED, {
            user,
            text,
        });

        return { error: false };
    }
}

module.exports = ChatManager;
