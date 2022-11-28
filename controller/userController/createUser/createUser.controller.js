const repository = require('../../../repositories/users.repository');
const dateHelper = require('../../../helpers/date.helper');
module.exports = async (req, res) => {
    try {
        const { firstName, lastName, birthDay, location } = req.body;
        if (!dateHelper.tz.find((i) => i === location)) {
            throw new Error('Timezone not exist');
        }
        const diff =
            dateHelper.createDateThisYear(birthDay, location) >
            dateHelper.today();
        const newUser = {
            firstName,
            lastName,
            birthDay: dateHelper.createDate(birthDay, location),
            nextBirthDay: diff
                ? dateHelper.createDateThisYear(birthDay, location)
                : dateHelper.createDateNextYear(birthDay, location),
            location,
            isSent: false,
        };

        const createdUser = await repository.create(newUser);

        res.status(200).send({
            status: 'success',
            msg: 'Successfully created user',
            data: createdUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'failed',
            msg: error.message,
        });
    }
};
