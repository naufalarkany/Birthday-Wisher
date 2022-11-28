const repository = require('../../../repositories/users.repository');
module.exports = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await repository.getOne(userId);
        res.status(200).send({
            status: 'success',
            msg: 'Get User Success',
            data: user ? user : [],
        });
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            msg: error.message,
        });
    }
};
