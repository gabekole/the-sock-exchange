import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import pg from 'pg';

dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
const PORT = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON parsing for request bodies

const { Pool } = pg;
// PostgreSQL pool configuration
const pool = new Pool({
    user: 'postgres',
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: 'postgres',
    port: 5432,
});

app.post('/socks/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await pool.query('SELECT uid FROM users WHERE username = $1 AND password = $2', [username, password]);
        if (result.rows.length > 0) {
            res.status(200).json({ uid: result.rows[0].uid });
        } else {
            res.status(401).json({ message: 'Authentication failed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to read and send all socks
app.get('/socks', async (_req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const socks = await collection.find({}).toArray();
    res.status(200).json(socks);
    client.close();
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No socks for you! ☹");
  }
});

// POST Search Route Handler
app.post('/socks/search', async (req, res) => {
  try {
    const { searchTerm } = req.body;
    console.log(req.body)
    
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const sampleSock = await collection.findOne();

    const socks = await collection.find({ "sockDetails.color" : searchTerm }).toArray();
    console.log(socks)
    res.status(200).json(socks);

    client.close();
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Hmm, something doesn\'t smell right... Error searching for socks');
  }
});

// DELETE Delete Route Handler
app.delete('/socks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount > 0) {
      res.status(200).json({});
    } else {
      res.status(403).send('Sock not found');
    }
    client.close();
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Hmm, something doesn\'t smell right... Error deleting sock');
  }
});

// POST Add Route Handler
app.post('/socks', async (req, res) => {
  try {
    const newSock = req.body;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.insertOne(newSock);
    res.status(200).json({});
    client.close();
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Hmm, something doesn\'t smell right... Error adding sock');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
