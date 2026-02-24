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
const mediator = new Mediator();
const userManager = new UserManager(db);
const chatManager = new ChatManager(db);

app.use(express.static(`${__dirname}/public`));
app.use('/', new Router({ mediator }));

function deinit() {
    db.destrucor();
    setTimeout(() =>process.exit(), 500);
}

app.listen(PORT, () => console.log(`${NAME} started at port ${PORT}`));

process.on('SIGNINT', deinit);