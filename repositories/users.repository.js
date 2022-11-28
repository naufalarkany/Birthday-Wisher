const { Op } = require('sequelize');
const { User: Model } = require('../models');

exports.create = async (newUser) =>
    new Promise((resolve, reject) => {
        Model.create(newUser)
            .then((data) => {
                resolve(data);
            })
            .catch(reject);
    });

exports.getAll = () =>
    new Promise((resolve, reject) => {
        Model.findAll()
            .then((data) => {
                resolve(data ? data : null);
            })
            .catch(reject);
    });

exports.getAllByLteToday = (date) =>
    new Promise((resolve, reject) => {
        Model.findAll({
            where: {
                [Op.and]: [
                    {
                        nextBirthDay: {
                            [Op.lte]: date,
                        },
                        isSent: false,
                    },
                ],
            },
        })
            .then((data) => {
                resolve(data ? data : null);
            })
            .catch(reject);
    });

exports.getOne = (id) =>
    new Promise((resolve, reject) => {
        Model.findOne({
            where: {
                id: id,
            },
        })
            .then((data) => {
                resolve(data ? data : null);
            })
            .catch(reject);
    });

exports.delete = async (userId) =>
    new Promise((resolve, reject) => {
        Model.destroy({
            where: {
                id: userId,
            },
        })
            .then(resolve)
            .catch(reject);
    });

exports.edit = async (userId, editedUser) =>
    new Promise((resolve, reject) => {
        Model.update(editedUser, {
            where: {
                id: userId,
            },
        })
            .then((data) => {
                resolve(data);
            })
            .catch(reject);
    });
