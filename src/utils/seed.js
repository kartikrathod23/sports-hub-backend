import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Game } from '../models/index.js';

dotenv.config();

const sportsMatches = [
  // Cricket - IPL
  { sport: 'Cricket', league: 'IPL', team_a: 'Mumbai Indians', team_b: 'Chennai Super Kings', start_time: new Date('2026-01-05T19:30:00') },
  { sport: 'Cricket', league: 'IPL', team_a: 'Royal Challengers Bangalore', team_b: 'Kolkata Knight Riders', start_time: new Date('2026-01-06T15:30:00') },
  { sport: 'Cricket', league: 'IPL', team_a: 'Delhi Capitals', team_b: 'Punjab Kings', start_time: new Date('2026-01-07T19:30:00') },
  
  // Cricket - BBL
  { sport: 'Cricket', league: 'BBL', team_a: 'Sydney Sixers', team_b: 'Melbourne Stars', start_time: new Date('2026-01-08T14:00:00') },
  { sport: 'Cricket', league: 'BBL', team_a: 'Perth Scorchers', team_b: 'Brisbane Heat', start_time: new Date('2026-01-09T17:00:00') },
  
  // Football - EPL
  { sport: 'Football', league: 'EPL', team_a: 'Manchester United', team_b: 'Liverpool', start_time: new Date('2026-01-05T17:00:00') },
  { sport: 'Football', league: 'EPL', team_a: 'Arsenal', team_b: 'Chelsea', start_time: new Date('2026-01-06T20:00:00') },
  { sport: 'Football', league: 'EPL', team_a: 'Manchester City', team_b: 'Tottenham', start_time: new Date('2026-01-08T19:30:00') },
  
  // Football - La Liga
  { sport: 'Football', league: 'La Liga', team_a: 'Real Madrid', team_b: 'Barcelona', start_time: new Date('2026-01-07T21:00:00') },
  { sport: 'Football', league: 'La Liga', team_a: 'Atletico Madrid', team_b: 'Sevilla', start_time: new Date('2026-01-09T18:00:00') },
  
  // Football - Serie A
  { sport: 'Football', league: 'Serie A', team_a: 'Juventus', team_b: 'AC Milan', start_time: new Date('2026-01-10T20:45:00') },
  { sport: 'Football', league: 'Serie A', team_a: 'Inter Milan', team_b: 'Napoli', start_time: new Date('2026-01-11T19:00:00') },
  
  // Tennis - ATP
  { sport: 'Tennis', league: 'ATP Tour', team_a: 'Novak Djokovic', team_b: 'Carlos Alcaraz', start_time: new Date('2026-01-06T14:00:00') },
  { sport: 'Tennis', league: 'ATP Tour', team_a: 'Rafael Nadal', team_b: 'Daniil Medvedev', start_time: new Date('2026-01-08T16:00:00') },
  
  // Tennis - WTA
  { sport: 'Tennis', league: 'WTA Tour', team_a: 'Iga Swiatek', team_b: 'Aryna Sabalenka', start_time: new Date('2026-01-09T13:00:00') },
  { sport: 'Tennis', league: 'WTA Tour', team_a: 'Coco Gauff', team_b: 'Elena Rybakina', start_time: new Date('2026-01-10T15:00:00') },
  
  // Basketball - NBA
  { sport: 'Basketball', league: 'NBA', team_a: 'Los Angeles Lakers', team_b: 'Golden State Warriors', start_time: new Date('2026-01-07T22:00:00') },
  { sport: 'Basketball', league: 'NBA', team_a: 'Boston Celtics', team_b: 'Miami Heat', start_time: new Date('2026-01-08T23:30:00') },
  { sport: 'Basketball', league: 'NBA', team_a: 'Brooklyn Nets', team_b: 'Milwaukee Bucks', start_time: new Date('2026-01-10T21:00:00') },
  
  // Rugby
  { sport: 'Rugby', league: 'Six Nations', team_a: 'England', team_b: 'France', start_time: new Date('2026-01-11T16:00:00') },
  { sport: 'Rugby', league: 'Six Nations', team_a: 'Ireland', team_b: 'Wales', start_time: new Date('2026-01-12T14:30:00') }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected for seeding...');

    const existingGames = await Game.countDocuments();
    
    if (existingGames > 0) {
      console.log('⚠️  Database already seeded. Skipping...');
      await mongoose.connection.close();
      return;
    }

    console.log('🌱 Seeding database...');
    await Game.insertMany(sportsMatches);

    console.log(`✅ Successfully seeded ${sportsMatches.length} matches!`);
    
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seedDatabase();