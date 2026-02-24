const sqlite3 = require('sqlite3').verbose();
const ORM = require('./ORM');

class DB {
    constructor({ DATABASE }) {
        this.db = new sqlite3.Database(`${__dirname}/${DATABASE.NAME}`);
        this.orm = new ORM(this.db);
    }

    async registerUser(username, password, token) {
        const result = await this.orm.insert("users", ["username", "token", "password"], [username, token, password]);
        return { username, token, id: result.id };
    }

    async loginUser(username, password) {
        const row = await this.orm.get("users", { username }, ["rowid as id", "username", "password", "token"]);
        
        if (!row || row.password !== password) {
            return null;
        }
        
        const newToken = Math.round(Math.random() * 100000).toString();
        await this.orm.update("users", ["token"], [newToken], { username });
        
        return { username: row.username, token: newToken, id: row.id };
    }

    getUserById(id) {
        return this.orm.get("users", { id }, ["rowid as id", "username", "token", "online"]);
    }

    getUserByToken(token) {
        return this.orm.get("users", { token }, ["rowid as id", "username"]);
    }

    getAllUsers() {
        return this.orm.all("users", null, ["rowid as id", "username", "COALESCE(online, 0) as online"]);
    }

    setUserOnline(token, timestamp) {
        return this.orm.update("users", ["online"], [timestamp], { token });
    }

    async getMessagesHash() {
        const result = await this.orm.get("messages", null, ["COUNT(*) as cnt", "COALESCE(MAX(id), 0) as maxId"]);
        return `${result.cnt}_${result.maxId}`;
    }

    getMessages() {
        const sql = `
            SELECT m.id, m.text, m.time, m.author_id, u.username as author 
            FROM messages m LEFT JOIN users u ON m.author_id = u.rowid 
            ORDER BY m.id DESC LIMIT 100
        `;
        
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows || []);
            });
        });
    }

    async sendMessage(text, authorId) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const currentTime = `${hours}:${minutes}:${seconds}`;
        
        await this.orm.insert("messages", ["author_id", "time", "text"], [authorId, currentTime, text]);
        return true;
    }

    destructor() {
        this.db.close();
    }
}

module.exports = DB;