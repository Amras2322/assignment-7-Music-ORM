const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Create a Sequelize instance for the SQLite database
const db = new Sequelize({
  dialect: process.env.DB_TYPE || 'sqlite',
  storage: `database/${process.env.DB_NAME || 'music_library.db'}`,
  logging: console.log // Not necessary, but shows SQL queries in the console
});

// Define the Track model
const Track = db.define('Track', {
  trackId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  songTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artistName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  albumName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER
  },
  releaseYear: {
    type: DataTypes.INTEGER
  }
});

// Authenticate, sync the model, and close the connection
async function setupDatabase() {
  try {
    await db.authenticate();
    console.log('Connection to database established successfully.');

    await db.sync({ force: true });
    console.log('Database file created at:',
      `database/${process.env.DB_NAME || 'music_library.db'}`);

    await db.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase();
}

// Export the model and the connection to use in other files
module.exports = { db, Track };
