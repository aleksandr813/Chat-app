class UserManager {
    constructor (db) {
        this.db = db;
    }

    check(token) {
        console.log('Юзер манагер!');
    }

    getUserById(id) {
        console.log(this.db.getUserById(1));
    }

    async createUser(username, password) {
        const token = Math.round(Math.random() * 100000).toString();
        return this.db.registerUser(username, password, token);
    }

    async loginUser(username, password) {
        return this.db.loginUser(username, password);
    }
}

module.exports = UserManager;