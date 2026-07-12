const express = require('express');
const router = express.Router();
const lombaController = require('../controllers/lombaController');
const authMiddleware = require('../middleware/auth');

router.get('/', lombaController.getAll);
router.get('/:id', lombaController.getById);
router.post('/', authMiddleware, lombaController.create);
router.put('/:id', authMiddleware, lombaController.update);
router.delete('/:id', authMiddleware, lombaController.remove);

module.exports = router;
