const mongoose = require('mongoose');

const Class = mongoose.model("classes");
const Child = mongoose.model("childs");

exports.getAllClasses = (request, response, next) => {
    Class.find()
        .then(data => {
            response.status(200).json(data)
        })
        .catch(error => next(error))
}

exports.getClassById = (request, response, next) => {
    Class.findOne({ _id: request.params.id })
        .then(object => {
            if (object == null)
                throw new Error("Class doesn't exist");
            response.status(200).json(object);
        })
        .catch(error => next(error))
}

//need Child model
exports.getClassChildsInfo = (request, response, next) => {
    Class.findOne({ _id: request.params.id }, { children: 1 })
        .then(object => {
            if (object == null)
                throw new Error("Class doesn't exist");
            return object.populate("children")
        })
        .then(object => {
            response.status(200).json(object.children)
        })
        .catch(error => next(error))
}

//need Teacher model
exports.getClassTeacherInfo = (request, response, next) => {
    Class.findOne({ _id: request.params.id })
        .then(object => {
            if (object == null)
                throw new Error("Class doesn't exist");
            return object.populate("supervisor")
        })
        .then(object => {
            response.status(200).json(object.supervisor)
        })
        .catch(error => next(error))
}

exports.addNewClass = (request, response, next) => {
    // request.body.children.forEach((childId) => {
    //     Child.findOne({ _id: childId }, { _id: 1 })
    //         .then(data => {
    //             if (data == null) {

    //                 let error = new Error("some childs are not exists");
    //                 error.status = 422;
    //                 next(error);
    //             } else {

    //             }
    //         })
    //         .catch(error => next(error))
    // })

    const classObject = new Class({
        name: request.body.name,
        supervisor: request.body.supervisor,
        children: request.body.children
    })
    classObject.save()
        .then(data => {
            response.status(201).json(data);
        })
        .catch(error => next(error));
}

exports.updateClass = (request, response, next) => {
    Class.findOneAndUpdate({ _id: request.body.id }, request.body, { new: true })
        .then(object => {
            if (object == null)
                throw new Error("Class doesn't exist")
            response.status(200).json(object);
        })
        .catch(error => next(error));
}

exports.deleteClass = (request, response, next) => {
    Class.findByIdAndDelete({ _id: request.body.id })
        .then(object => {
            if (object == null)
                throw new Error("Class doesn't exist")
            response.status(200).json(object);
        })
        .catch(error => next(error));
}