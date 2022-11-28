const repository = require('../../../repositories/users.repository');
const dateHelper = require('../../../helpers/date.helper');

module.exports = async (req, res) => {
    try {
        let { userId, firstName, lastName, birthDay, location } = req.body;
        const user = await repository.getOne(userId);
        if (!user) {
            throw new Error('User not exist');
        }

        const updatedUser = {
            firstName: firstName ? firstName : user.firstName,
            lastName: lastName ? lastName : user.lastName,
            birthDay: birthDay
                ? dateHelper.createDate(birthDay, location)
                : user.birthDay,
            location: location ? location : user.location,
        };

        if (birthDay || location) {
            const diff =
                dateHelper.createDateThisYear(
                    birthDay ? birthDay : user.birthDay,
                    location ? location : user.location
                ) > dateHelper.today();
            updatedUser.nextBirthDay = diff
                ? dateHelper.createDateThisYear(
                      birthDay ? birthDay : user.birthDay,
                      location ? location : user.location
                  )
                : dateHelper.createDateNextYear(
                      birthDay ? birthDay : user.birthDay,
                      location ? location : user.location
                  );
        }
        await repository.edit(user.id, updatedUser);
        res.status(200).send({
            status: 'success',
            msg: 'Edit User Success',
            data: [],
        });
    } catch (error) {
        res.status(500).send({
            status: 'failed',
            msg: error.message,
        });
    }
};
