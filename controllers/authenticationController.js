const mongoose = require("mongoose");
const JWT = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const Teacher = mongoose.model('teachers');

exports.login = (request, response, next) => {
    Teacher.findOne({ username: request.body.username })
        .then(object => {
            if (object != null && bcrypt.compareSync(request.body.password, object.password)) {
                // generate token object to be sent to the client 
                const { password, ...objectToClient } = object;
                let token = JWT.sign(objectToClient, process.env.secretKey, { expiresIn: "1d" });
                response.status(200).json({ data: "ok", token });
            }
            else {
                let error = new Error("not authenticated [username or password is incorrect]");
                error.status = 401;
                throw error;
            }
        })
        .catch(error => next(error));
}

exports.register = (request, response, next) => {
    // encrypt password
    const hash = bcrypt.hashSync(request.body.password, bcrypt.genSaltSync(10));

    //upload a file
    const { file } = request;
    const teacherObject = new Teacher({
        fullname: request.body.fullname,
        username: request.body.username,
        password: hash,
        email: request.body.email,
        image: file?.filename
    })

    teacherObject.save()
        .then(data => {
            data.password = request.body.password;
            response.status(201).json(data);
        })
        .catch(error => next(error));
}