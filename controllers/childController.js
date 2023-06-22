const mongoose = require('mongoose');

const Child = mongoose.model("childs");
const Class = mongoose.model("classes");


exports.getAllChilds = (request, response, next) => {
    Child.find()
        .then(data => {
            response.status(200).json(data);
        })
        .catch(error => next(error));
}

exports.getChildById = (request, response, next) => {
    Child.findOne({ _id: request.params.id })
        .then(object => {
            if (object == null)
                throw new Error("Child doesn't exist")
            response.status(200).json(object);
        })
        .catch(error => next(error));
}

exports.getChildClassInfo = (request, response, next) => {
    Child.findOne({ _id: request.params.id })
        .then(object => {
            if (object == null)
                throw new Error("Child doesn't exist");
            return Class.findOne({ children: request.params.id })
        })
        .then(object => {
            if (object == null)
                throw new Error("Child not in a Class");
            response.status(200).json(object)
        })
        .catch(error => next(error));
}

exports.addNewChild = (request, response, next) => {
    const childObject = new Child({
        fullname: request.body.fullname,
        age: request.body.age,
        level: request.body.level,
        address: request.body.address
    })
    childObject.save()
        .then(data => {
            response.status(201).json(data);
        })
        .catch(error => next(error));
}

exports.updateChild = (request, response, next) => {
    Child.findOneAndUpdate({ _id: request.body.id }, request.body, { new: true })
        .then(object => {
            if (object == null)
                throw new Error("Child doesn't exist")
            response.status(200).json(object);
        })
}

exports.deleteChild = (request, response, next) => {
    Child.findByIdAndDelete({ _id: request.body.id })
        .then(object => {
            if (object == null)
                throw new Error("Child doesn't exist")
            return Class.updateMany({ children: request.body.id }, { $pull: { "children": request.body.id } })
        }).then((object) => {
            response.status(200).json(object);
        })
        .catch(error => next(error));
}