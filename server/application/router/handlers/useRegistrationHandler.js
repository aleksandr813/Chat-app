module.exports = (userManager, chatManager) => {
    return async (req, res) => {
        const username = req.params.username;
        const password = req.params.password;
        try {
            const user = await userManager.createUser(username, password);
            res.send(user);
        } catch (err) {
            const text = err.message ? err.message : "Registration failed";
            res.send({ error: text });
        }
    };
};
