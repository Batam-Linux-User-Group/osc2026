const express = require('express');
const router = express.Router();
const pesertaController = require('../controllers/pesertaController');
const authMiddleware = require('../middleware/auth');

// Public route for leaderboard
router.get('/leaderboard', pesertaController.getLeaderboard);

// Protected CRUD routes
router.get('/', authMiddleware, pesertaController.getAll);
router.get('/:id', authMiddleware, pesertaController.getById);
router.post('/', authMiddleware, pesertaController.create);
router.put('/:id', authMiddleware, pesertaController.update);
router.delete('/:id', authMiddleware, pesertaController.remove);

module.exports = router;
