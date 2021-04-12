const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require("path");


const connectDB = require('./server/database/connection');

const app = express();

dotenv.config()
const port = process.env.PORT || 8000;

app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());

//log requests

app.use(morgan('tiny'));

//mongoDB connection

connectDB();

//set view engine

app.set('view engine', 'ejs');

//load assets

app.use("/css", express.static(path.resolve(__dirname, "assets/css")))
app.use("/img", express.static(path.resolve(__dirname, "assets/img")))
app.use("/js", express.static(path.resolve(__dirname, "assets/js")))
// app.use("/plugins", express.static(path.resolve(__dirname, "assets/plugins")))


//load routers
app.use('/', require('./server/routes/router'));
app.use('/api/company', require('./server/routes/companyRoute'));

app.listen(port, () => {
    console.log(`listening to the port no ${port}`);
})