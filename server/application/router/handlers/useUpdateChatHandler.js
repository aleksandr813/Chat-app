module.exports = (userManager, chatManager) => {
    return async (req, res) => {
        const token = req.query.token;
        const hash = req.query.hash || "";
        if (!token) {
            res.send({ error: "No token" });
            return;
        }
        try {
            const data = await chatManager.updateChat(token, hash);
            if (data.error) {
                res.send({ error: "Invalid token" });
                return;
            }
            res.send(data);
        } catch (err) {
            const text = err.message ? err.message : "Update failed";
            res.send({ error: text });
        }
    };
};
