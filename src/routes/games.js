import express from 'express';
import { Game, Favorite } from '../models/index.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get all games with filters
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { sport, league, search } = req.query;
    const userId = req.userId;

    const query = {};
    if (sport) query.sport = sport;
    if (league) query.league = league;
    if (search) {
      query.$or = [
        { team_a: { $regex: search, $options: 'i' } },
        { team_b: { $regex: search, $options: 'i' } }
      ];
    }

    const games = await Game.find(query).sort({ start_time: 1 }).lean();

    const favorites = await Favorite.find({ user: userId }).select('game');
    const favoriteGameIds = favorites.map(fav => fav.game.toString());

    const gamesWithFavorites = games.map(game => ({
      ...game,
      id: game._id,
      is_favorite: favoriteGameIds.includes(game._id.toString())
    }));

    res.json({
      games: gamesWithFavorites,
      count: gamesWithFavorites.length
    });
  } catch (error) {
    console.error('Get games error:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// Get unique sports
router.get('/sports', authMiddleware, async (req, res) => {
  try {
    const sports = await Game.distinct('sport');
    res.json(sports.sort());
  } catch (error) {
    console.error('Get sports error:', error);
    res.status(500).json({ error: 'Failed to fetch sports' });
  }
});

// Get unique leagues
router.get('/leagues', authMiddleware, async (req, res) => {
  try {
    const leagues = await Game.distinct('league');
    res.json(leagues.sort());
  } catch (error) {
    console.error('Get leagues error:', error);
    res.status(500).json({ error: 'Failed to fetch leagues' });
  }
});

export default router;