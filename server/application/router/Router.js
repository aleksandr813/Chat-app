const express = require('express');
const router = express.Router();

const {
    useRegistrationHandler,
    notFoundHandler,
    useLoginHandler,
    useUpdateChatHandler,
    useSendMessageHandler,
} = require('./handlers');

function Router({ userManager, chatManager }) {
    router.get('/reg/:username/:password', useRegistrationHandler(userManager, chatManager));
    router.get('/login/:username/:password', useLoginHandler(userManager, chatManager));
    router.get('/updateChat', useUpdateChatHandler(userManager, chatManager));
    router.get('/sendMessage', useSendMessageHandler(userManager, chatManager));
    router.all('/*path', notFoundHandler);
    return router;
}

module.exports = Router;