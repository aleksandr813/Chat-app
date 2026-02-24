const express = require('express');
const app = express();
const CONFIG = require('./config');
const Router = require('./application/router/Router');
const DB = require('./application/modules/db/DB');
const Mediator = require('./application/modules/Mediator/Mediator');
const UserManager = require('./application/modules/user/UserManager');
const ChatManager = require('./application/modules/chat/ChatManager');
const { NAME, PORT, DATABASE } = CONFIG;

const db = new DB({ DATABASE });
const mediator = new Mediator(CONFIG.MEDIATOR);

const { TRIGGERS } = CONFIG.MEDIATOR;

mediator.set(TRIGGERS.GET_MESSAGES_HASH, () => db.getMessagesHash());
mediator.set(TRIGGERS.GET_MESSAGES, () => db.getMessages());
mediator.set(TRIGGERS.SEND_MESSAGE, ({ text, authorId }) => db.sendMessage(text, authorId));

const userManager = new UserManager({ mediator });
const chatManager = new ChatManager({ mediator });

app.use(express.static(`${__dirname}/public`));
app.use('/', new Router({ userManager, chatManager }));

function deinit() {
    db.destrucor();
    setTimeout(() =>process.exit(), 500);
}

app.listen(PORT, () => console.log(`${NAME} started at port ${PORT}`));

process.on('SIGNINT', deinit);