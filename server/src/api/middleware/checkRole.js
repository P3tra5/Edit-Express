const checkRole = (role) => (req, res, next) => {
    if (req.User && req.User.role === role) {
        next();
    } else {
        res.status(403).send(`Zabranjen pristup - vaša uloga je ${req.User.role} `);
    }
};

module.exports = checkRole;