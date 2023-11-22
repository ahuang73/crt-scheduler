import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'
import express from 'express';
import cors from 'cors';
const app = express()
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://crt_user:qWYXJj1KOtWkG61J@crt-data.olatvi5.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = "CRT-Data"

app.use(express.json());
app.use(cors());
app.get('/api/shiftsdata', async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("shifts");

    const shifts = await collection.find({}).toArray();
    res.json(shifts);
  } catch (error) {
    console.error('Error fetching shifts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/shiftsdata', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('shifts');
    
    // Extract shift data from the request body
    const shiftData = req.body;

    // Insert the shift data into the MongoDB collection
    const result = await collection.insertOne(shiftData);

    // Respond with the ID of the inserted document
    res.json({ _id: result.insertedId });
  } catch (error) {
    console.error('Error creating shift:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Close the MongoDB connection
    client.close();
  }
});


app.get('/api/shifttypedata', async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("shift_types");

    const shifts = await collection.find({}).toArray();
    res.json(shifts);
    console.log("Shift Type GET")
  } catch (error) {
    console.error('Error fetching shifts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/shifttypedata', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('shift_types');
    
    // Extract shift data from the request body
    const shiftTypeData = req.body;

    // Insert the shift data into the MongoDB collection
    const result = await collection.insertOne(shiftTypeData);

    // Respond with the ID of the inserted document
    res.json({ _id: result.insertedId });
    console.log("Shift Type POST")
  } catch (error) {
    console.error('Error creating shift:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Close the MongoDB connection
    client.close();
  }
});

app.get('/api/responderdata', async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("responders");

    const shifts = await collection.find({}).toArray();
    res.json(shifts);
    console.log("Responder GET")
  } catch (error) {
    console.error('Error fetching shifts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/responderdata', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('responders');
    
    // Extract shift data from the request body
    const shiftTypeData = req.body;

    // Insert the shift data into the MongoDB collection
    const result = await collection.insertOne(shiftTypeData);

    // Respond with the ID of the inserted document
    res.json({ _id: result.insertedId });
    console.log("Responder POST")
  } catch (error) {
    console.error('Error creating shift:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Close the MongoDB connection
    client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.delete('/api/shifttypedata/delete/:id', async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('shift_types');

    const shiftTypeId = req.params.id;
    console.log(shiftTypeId)
    const result = await collection.deleteOne({ _id: new ObjectId(shiftTypeId) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Shift type not found' });
    }

  
    res.json({ success: true });
    console.log("Shift Type DELETE");
  } catch (error) {
    console.error('Error deleting shift type:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
});

