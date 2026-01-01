import express from 'express';
import { Game, Favorite } from '../models/index.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get user's favorites
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const favorites = await Favorite.find({ user: userId })
      .populate('game')
      .sort({ createdAt: -1 });

    const favoriteGames = favorites.map(fav => ({
      ...fav.game.toObject(),
      id: fav.game._id,
      is_favorite: true
    }));

    res.json({
      favorites: favoriteGames,
      count: favoriteGames.length
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// Add to favorites
router.post('/:gameId', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { gameId } = req.params;

    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    const existingFavorite = await Favorite.findOne({
      user: userId,
      game: gameId
    });

    if (existingFavorite) {
      return res.status(409).json({ error: 'Game already in favorites' });
    }

    await Favorite.create({ user: userId, game: gameId });

    res.status(201).json({ message: 'Game added to favorites' });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ error: 'Failed to add to favorites' });
  }
});

// Remove from favorites
router.delete('/:gameId', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { gameId } = req.params;

    const result = await Favorite.findOneAndDelete({
      user: userId,
      game: gameId
    });

    if (!result) {
      return res.status(404).json({ error: 'Favorite not found' });
    }

    res.json({ message: 'Game removed from favorites' });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ error: 'Failed to remove from favorites' });
  }
});

export default router;