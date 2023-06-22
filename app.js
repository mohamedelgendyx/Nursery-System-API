const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');

/******************** configrations ************************/
require('dotenv').config()
// initialize auto increment
autoIncrement.initialize(mongoose.connection);
// disappear warning of verions
mongoose.set('strictQuery', false);
// only run the modules 
require("./models/teacherModel");
require("./models/childModel");
require("./models/classModel");

const authenticatedRouter = require('./routes/authenticationRoute');
const teacherRouter = require("./routes/teacherRouter");
const childRouter = require("./routes/childRouter");
const classRouter = require('./routes/classRouter');
const authentcationMW = require("./middlewares/authentcationMW");

// Open server using express
const server = express();

// Listen Port
const port = process.env.PORT || process.env.port;

// open connection with mongoDB
mongoose.connect(process.env.DatabaseUrl)
    .then(() => {
        console.log("DB connected sucessfully");
        // Listening to the server
        server.listen(port, () => {
            console.log(`Server is Listening..... on port: ${port}`);
        });
    }
    )
    .catch(error => console.log(`DB connection problem ${error}`));

// Logging Middleware
server.use(morgan('dev'));

//settings MW to enable using http request body
server.use(express.json());

// authentication Middleware
server.use(authenticatedRouter);
server.use(authentcationMW);

/*************************** Routes ***************************/
server.use(teacherRouter);
server.use(childRouter);
server.use(classRouter);

// Not Found Middleware
server.use((request, response) => {
    response.status(404).json({ message: "Page Not Found" });
});

// Error Handling Middleware
server.use((error, request, response, next) => {
    response.status(error.status || 500).json({ message: error + "" })
});

