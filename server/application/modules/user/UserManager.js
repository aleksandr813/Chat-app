class UserManager {
    constructor ({ mediator }) {
        this.mediator = mediator;
        this.EVENTS = mediator.getEventTypes();
        this.TRIGGERS = mediator.getTriggerTypes();

        this.mediator.set(this.TRIGGERS.GET_USER_BY_TOKEN, ({ token }) => db.getUserByToken(token));
        this.mediator.set(this.TRIGGERS.SET_USER_ONLINE, ({ token, timestamp }) => db.setUserOnline(token, timestamp));
        this.mediator.set(this.TRIGGERS.GET_ALL_USERS, () => db.getAllUsers());
        this.mediator.set(this.TRIGGERS.REGISTER_USER, ({ username, password, token }) => db.registerUser(username, password, token));
        this.mediator.set(this.TRIGGERS.LOGIN_USER, ({ username, password }) => db.loginUser(username, password));
    }

    check(token) {
        console.log('Юзер манагер!');
    }

    getUserById(id) {
        console.log(this.db.getUserById(1));
    }

    async createUser(username, password) {
        const token = Math.round(Math.random() * 100000).toString();
        const user = await this.mediator.get(this.TRIGGERS.REGISTER_USER, { username, password, token });
        this.mediator.call(this.EVENTS.USER_REGISTERED, user);
        return user;
    }

    async loginUser(username, password) {
        const user = await this.mediator.get(this.TRIGGERS.LOGIN_USER, { username, password });
        if (user) {
            this.mediator.call(this.EVENTS.USER_LOGGED_IN, user);
        }
        return user;
    }
}

module.exports = UserManager;