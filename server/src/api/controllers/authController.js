require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const saltRunde = 10;

const signup = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, saltRunde);
        const newUser = new User({ ...req.body, password: hashPassword });
        await newUser.save();

        const token = jwt.sign({ idUser: newUser._id }, process.env.TAJNI_KLJUC, { expiresIn: '1h' });

        res.cookie('accessToken', token, {
            httpOnly: true,
            maxAge: 3600000, // 1 sat
            secure: false, // u produkcijskoj verziji mora biti TRUE
        }); 

        res.status(201).json({
            message: "Uspješna registracija",
            user: {
                id: newUser._id,
                username: newUser.username,
                role: newUser.role,
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const login = async (req, res) => {
    try {
        const userDB = await User.findOne({ email: req.body.email });
        if (userDB && await bcrypt.compare(req.body.password, userDB.password)) {
            const token = jwt.sign({ idUser: userDB._id }, process.env.TAJNI_KLJUC, { expiresIn: '1h' });

            res.cookie('accessToken', token, {
                httpOnly: true,
                maxAge: 3600000, // 1 sat
                secure: false, // u produkcijskoj verziji mora biti TRUE
            }); 

            res.status(200).json({
                message: "Uspješna prijava",
                user: {
                    id: userDB._id,
                    username: userDB.username,
                    role: userDB.role,
                }
            });
        } else {
            res.status(401).send('Neispravni podaci za prijavu');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};
   

module.exports = { signup, login };