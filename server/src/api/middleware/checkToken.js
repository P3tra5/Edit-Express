require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
    const token = req.cookies?.accessToken;
    if (!token) return res.status(403).send('Token nije pronađen u kolačiću');
   
    try {
        const decodedToken = jwt.verify(token, process.env.TAJNI_KLJUC);
        req.userId = decodedToken;
    } catch (err) {
        return res.status(401).send('Neispravni Token');
    }
    return next();
};

module.exports = checkToken;