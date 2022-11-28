const repository = require('../../../repositories/users.repository');
module.exports = async (req, res) => {
    try {
        const users = await repository.getAll();
        res.status(200).send({
            status: 'success',
            msg: 'Get All Users Success',
            data: users,
        });
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            msg: error.message,
        });
    }
};
