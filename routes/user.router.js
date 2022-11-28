const { Router } = require('express');
const { users } = require('../controller');
const router = Router();

// Get All Users data
router.post('/', users.createUser);
router.get('/', users.getUsers);
router.get('/:userId', users.getUser);
router.delete('/:userId', users.deleteUser);
router.put('/', users.editedUser);

module.exports = router;
