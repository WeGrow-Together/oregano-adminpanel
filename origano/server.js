const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");


const connectDB = require('./server/database/connection');

const app = express();


dotenv.config({ path: 'config.env' })
const port = process.env.PORT || 8000;

//log requests

app.use(morgan('tiny'));

//mongoDB connection

connectDB();

//parse request to body-parser

app.use(bodyparser.urlencoded({ extended: true }))

//set view engine

app.set('view engine', 'ejs');

//load assets

app.use("/css", express.static(path.resolve(__dirname, "assets/css")))
app.use("/img", express.static(path.resolve(__dirname, "assets/img")))
app.use("/js", express.static(path.resolve(__dirname, "assets/js")))
    // app.use("/plugins", express.static(path.resolve(__dirname, "assets/plugins")))


//load routers

app.use('/', require('./server/routes/router'))



app.listen(port, () => {
    console.log(`listening to the port no ${port}`);
})