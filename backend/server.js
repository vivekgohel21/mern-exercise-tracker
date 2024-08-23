const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);

const exerciseRoutes = require('./routes/exercise.routes');
app.use('/exercises', exerciseRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(err))

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
