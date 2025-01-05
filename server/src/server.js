require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const authRoutes = require("./api/routes/authRoutes");	
const userRoutes = require("./api/routes/userRoutes");

const checkToken = require("./api/middleware/checkToken");
const checkCookie = require("./api/middleware/checkCookie");
const checkRole = require("./api/middleware/checkRole");

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

const app = express();
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

connectDB();

app.get('/ruta2', checkCookie('accessToken'), checkToken, (req, res) => {
    res.status(200).json({ message: 'Dozvoljen pristup podatku, ruta2' });
});  //test

app.get('/samoadmin', checkToken, checkRole('admin'), (req, res) => {
    res.send('Ovo je podatak samo za admina');
}); //test   

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server sluša zahtjeve na portu ${PORT}`);
});