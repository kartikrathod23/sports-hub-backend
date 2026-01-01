import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
}, {
  timestamps: true
});

// Game Schema
const gameSchema = new mongoose.Schema({
  sport: {
    type: String,
    required: [true, 'Sport is required'],
    trim: true
  },
  league: {
    type: String,
    required: [true, 'League is required'],
    trim: true
  },
  team_a: {
    type: String,
    required: [true, 'Team A is required'],
    trim: true
  },
  team_b: {
    type: String,
    required: [true, 'Team B is required'],
    trim: true
  },
  start_time: {
    type: Date,
    required: [true, 'Start time is required']
  }
}, {
  timestamps: true
});

// Favorite Schema
const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  }
}, {
  timestamps: true
});

// Indexes
gameSchema.index({ sport: 1 });
gameSchema.index({ league: 1 });
gameSchema.index({ start_time: 1 });
favoriteSchema.index({ user: 1 });
favoriteSchema.index({ user: 1, game: 1 }, { unique: true });

export const User = mongoose.model('User', userSchema);
export const Game = mongoose.model('Game', gameSchema);
export const Favorite = mongoose.model('Favorite', favoriteSchema);