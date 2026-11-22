# Assignment #7: Music Library API

A RESTful API for managing a music library built with Node.js, Express.js, and Sequelize ORM using SQLite database.

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Environment configuration:
   The repository includes a `.env` file with the SQLite database settings
   (`DB_NAME`, `DB_TYPE`, `NODE_ENV`) and the server `PORT`. Edit it if you need
   different values; production settings are listed as comments at the bottom.

4. Set up the database:
   ```bash
   node database/setup.js
   ```

5. Seed the database with sample data:
   ```bash
   node database/seed.js
   ```

6. Start the server:
   ```bash
   node server.js
   ```

## API Endpoints

### Get All Tracks
- **GET** `/api/tracks`
- Returns all tracks in the database

### Get Track by ID
- **GET** `/api/tracks/:id`
- Returns a specific track by ID
- Returns `404 Not Found` if no track has that ID

### Create New Track
- **POST** `/api/tracks`
- Creates a new track and returns `201 Created`
- `songTitle`, `artistName`, `albumName`, and `genre` are required non-empty strings
- `duration` and `releaseYear` are optional integers
- Returns `400 Bad Request` if validation fails
- **Body:**
  ```json
  {
    "songTitle": "Song Title",
    "artistName": "Artist Name",
    "albumName": "Album Name",
    "genre": "Genre",
    "duration": 180,
    "releaseYear": 2024
  }
  ```

### Update Track
- **PUT** `/api/tracks/:id`
- Updates an existing track and returns the refreshed track
- Fields omitted from the body keep their current values
- Returns `400 Bad Request` for invalid values and `404 Not Found` if the track does not exist
- **Body:** Same as create track (all fields optional)

### Delete Track
- **DELETE** `/api/tracks/:id`
- Deletes a track by ID
- Returns `404 Not Found` if the track does not exist

## Database Schema

The `tracks` table contains the following fields:

- `trackId` (INTEGER, Primary Key, Auto Increment)
- `songTitle` (STRING, Required)
- `artistName` (STRING, Required)
- `albumName` (STRING, Required)
- `genre` (STRING, Required)
- `duration` (INTEGER, Optional) - Duration in seconds
- `releaseYear` (INTEGER, Optional)

## Project Structure

```
music-library-api/
├── database/
│   ├── setup.js    # Database setup and model definitions
│   └── seed.js     # Sample data seeding
├── server.js       # Main server file with API routes
├── package.json
├── .env            # Environment variables
├── .gitignore
└── README.md
```

## Notes

- `node database/setup.js` drops and recreates the `tracks` table, then `node database/seed.js` inserts the 12 sample tracks. Run setup before seeding.
- The SQLite database file is created at `database/music_library.db` and is gitignored; only the setup and seed scripts are committed.