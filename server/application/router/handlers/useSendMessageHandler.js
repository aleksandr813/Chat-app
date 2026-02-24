module.exports = (userManager, chatManager) => {
    return async (req, res) => {
        const token = req.query.token;
        const text = req.query.text;
        if (!token) {
            res.send({ error: "No token" });
            return;
        }
        if (!text || !text.trim()) {
            res.send({ error: "Empty message" });
            return;
        }
        try {
            const result = await chatManager.sendMessage(token, text.trim());
            if (result.error) {
                res.send({ error: "Invalid token" });
                return;
            }
            res.send({});
        } catch (err) {
            const text = err.message ? err.message : "Send failed";
            res.send({ error: text });
        }
    };
};
