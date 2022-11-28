const repository = require('../../../repositories/users.repository');
module.exports = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await repository.getOne(userId);
        if (!user) {
            throw new Error('User not exist');
        }
        await repository.delete(userId);
        res.status(200).send({
            status: 'success',
            msg: 'Delete User Success',
            data: [],
        });
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            msg: error.message,
        });
    }
};
