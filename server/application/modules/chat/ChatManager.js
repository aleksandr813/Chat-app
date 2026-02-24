const CONFIG = require('../../../config');

class ChatManager {
    constructor(db) {
        this.db = db;
    }

    setUserOnline(token) {
        return this.db.setUserOnline(token, Date.now());
    }

    async getOnlineUsersList() {
        const now = Date.now();
        const offlineMs = CONFIG.OFFLINE_MS;
        const allUsers = await this.db.getAllUsers();
        return allUsers.map(function(u) {
            return {
                id: u.id,
                name: u.username,
                isOnline: (now - (u.online || 0)) <= offlineMs
            };
        });
    }

    async updateChat(token, clientHash) {
        const user = await this.db.getUserByToken(token);
        if (!user) {
            return { error: true };
        }
        await this.setUserOnline(token);
        const serverHash = await this.db.getMessagesHash();
        let messages = null;
        if (clientHash !== serverHash) {
            messages = await this.db.getMessages();
        }
        const users = await this.getOnlineUsersList();
        return { hash: serverHash, messages: messages, users: users };
    }

    async sendMessage(token, text) {
        const user = await this.db.getUserByToken(token);
        if (!user) {
            return { error: true };
        }
        await this.db.sendMessage(text, user.id);
        return { error: false };
    }
}

module.exports = ChatManager;
