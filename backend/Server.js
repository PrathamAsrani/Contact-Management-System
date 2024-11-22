const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const contactRoute = require('./Routes/contactRoute.js')
const userRoute = require('./Routes/userRoute.js');

let app = express()
dotenv.config();
app.use(cors({
    origin: '*', 
    methods: '*',
    allowedHeaders: '*', 
    credentials: true 
}));
app.use(express.json());

app.use("/api/v1", contactRoute);
app.use("/api/v1", userRoute);

app.get('/', (req, res) => {
    res.send("Rest api")
})

app.listen((process.env.PORT || 5000), () => {
    console.log(`server running on ${process.env.PORT}\n`);
})