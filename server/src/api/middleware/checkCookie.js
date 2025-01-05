const checkCookie = (cookieName) => (req, res, next) => {
    if (req.cookies && req.cookies[cookieName]) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = checkCookie;