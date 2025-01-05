require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_ADDRESS/*, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }*/);

        if (mongoose.connection.readyState === 1) {
            console.log("Uspješno spojen na MongoDB!");
            //console.log("Mongoose readyState:", mongoose.connection.readyState);
        }

        mongoose.connection.on("error", (error) => {
            console.error("Greška pri spajanju:", error);
        });
    } catch (error) {
        console.error("Greška pri povezivanju na bazu:", error);
        process.exit(1);
    }
};

module.exports = connectDB;