const cron = require('node-cron');
const axios = require('axios');
const repository = require('../repositories/users.repository');
const time = '00 00 * * *';
const scheduled = true;
const timezone = 'UTC';

const job = async () => {
    try {
        const url = 'https://eoae5svfnuewm1j.m.pipedream.net';
        const date = new Date();
        const people = await repository.getAllByLteToday(date);
        for (let i in people) {
            const person = people[i].dataValues;
            const body = {
                full_name: `${person.firstName} ${person.lastName}`,
            };
            const resp = await axios.post(url, body, (err) => {
                throw new Error(err.message, 'axios');
            });
            await repository.edit(person.id, { isSent: true });
            console.log(resp?.data);
        }
    } catch (error) {
        console.log(error);
    }
};

cron.schedule(time, job, { scheduled, timezone });
