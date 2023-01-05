const dotenv = require("dotenv")
dotenv.config()
const express = require('express');
const cors = require("cors")
const bodyParser = require('body-parser');
const commonRouter = require("./routes/commonRoutes");
require("./db"); 
require("./associations")

const app = express();
const port = process.env.PORT || 5000;
const server = require('http').createServer(app)

app.use(bodyParser.json())
app.use(cors());

app.use(commonRouter);

server.listen(port, () => {
    console.log("Listening on port", port)
});