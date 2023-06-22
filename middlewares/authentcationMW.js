const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');

const Class = mongoose.model("classes");

module.exports = (request, response, next) => {
    // check only if there is a token
    try {
        const token = request.get("authorization").split(" ")[1];
        const decodedToken = JWT.verify(token, process.env.secretKey);
        request.decodedObject = decodedToken;
        next();
    } catch (error) {
        next(error);
    }
}

// authorization premissions MWs
module.exports.isAdmin = (request, response, next) => {
    // console.log(request.decodedObject);
    if (request.decodedObject._doc.role == 'admin') {
        next();
    }
    else {
        let error = new Error("Not Authorized to access");
        error.status = 403;
        next(error);
    }
}

module.exports.isAdminOrSupervisor = (request, response, next) => {
    if (request.decodedObject._doc.role == 'admin') {
        next();
    }
    else if (request.decodedObject._doc.role == 'supervisor') {
        Class.find({ supervisor: request.decodedObject._doc._id }, { _id: 1 })
            .then(objects => {
                // console.log(typeof objects[0], typeof request.params.id);
                if (objects.map(object => object._id).includes((Number(request.params.id) || Number(request.body.id))))
                    next();
                else {
                    let error = new Error("Not Authorized to access");
                    error.status = 403;
                    next(error);
                }
            })
    }
    else {
        let error = new Error("Not Authorized to access");
        error.status = 403;
        next(error);
    }
}

module.exports.isAdminOrTeacher = (request, response, next) => {
    if (request.decodedObject._doc._id == (request.body.id || request.params.id) || request.decodedObject._doc.role == 'admin') {
        next();
    }
    else {
        let error = new Error("Not Authorized to access");
        error.status = 403;
        next(error);
    }
}