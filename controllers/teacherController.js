const mongoose = require('mongoose');

const Teacher = mongoose.model("teachers");
const Class = mongoose.model("classes");


exports.getAllTeachers = (request, response, next) => {
    Teacher.find()
        .then(data => {
            response.status(200).json(data);
        })
        .catch(error => next(error));
}

exports.getTeacherById = (request, response, next) => {
    Teacher.findOne({ _id: request.params.id })
        .then(object => {
            if (object == null)
                throw new Error("Teacher doesn't exist")
            response.status(200).json(object);
        })
        .catch(error => next(error));
}

// need class model
exports.getAllClassSupervisors = (request, response, next) => {
    Class.find({}, { supervisor: 1, _id: 0 })
        .populate("supervisor")
        .then(objects => {
            response.status(200).json(objects.map(object => object.supervisor))
        })
        .catch(error => next(error))
}

exports.updateTeacher = (request, response, next) => {
    Teacher.findOneAndUpdate({ _id: request.body.id }, request.body, { new: true })
        .then(object => {
            if (object == null)
                throw new Error("Teacher doesn't exist")
            response.status(200).json(object);
        })
        .catch(error => next(error));
}

exports.deleteTeacher = (request, response, next) => {
    Teacher.findByIdAndDelete({ _id: request.body.id })
        .then(object => {
            if (object == null)
                throw new Error("Teacher doesn't exist")
            return Class.updateMany({ supervisor: request.body.id }, { $set: { "supervisor": null } })
        }).then((object) => {
            response.status(200).json(object);
        })
        .catch(error => next(error));
}