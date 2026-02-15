const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

let port = process.env.PORT || 8080;
let url = process.env.URI;

app.use(express.json());
app.use(cors({
    origin: "https://udemy-clone2003.vercel.app",
    credentials: true,
}));
// app.use(cors())
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

async function main() {
    await mongoose.connect(url);
}
main().then(() => console.log("Connected to MongoDB"));

const authRoutes = require("./routes/auth.route.js");
const courseRoute = require('./routes/course.route.js');
const reviewRoute = require('./routes/reviews.route.js');
const paymentRoutes = require('./routes/payment.Routes.js');
const userRouter = require('./routes/user.route.js');

app.get('/', (req, res) => {
    res.send("Hi i am Root!");
});

app.use('/api/auth', authRoutes);
app.use('/api/course', courseRoute);
app.use('/api/reviews', reviewRoute);
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
