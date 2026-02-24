module.exports = (mediator) => {
    return async (req, res) => {
        const username = req.params.username;
        const password = req.params.password;
        try {
            const user = await mediator.loginUserTrigger(username, password);
            if (user) {
                res.send(user);
            } else {
                res.send({ error: "Неверный логин или пароль" });
            }
        } catch (err) {
            const text = err.message ? err.message : "Login failed";
            res.send({ error: text });
        }
    };
};
