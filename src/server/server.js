import { MongoClient, ServerApiVersion } from 'mongodb'



const uri = "mongodb+srv://crt_user:qWYXJj1KOtWkG61J@crt-data.olatvi5.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function fetch_shift_data() {
  try {
    await client.connect();
    const db = client.db("CRT-Data")
    const collection = db.collection('shifts');
    const query = {}; // You can specify a query to filter data

    const cursor = collection.find(query);

    // Loop through the cursor and output data to the console
    await cursor.forEach(document => {
      console.log(document);
    });
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Close the MongoDB connection
    client.close();
  }


}

async function store_shift() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db("CRT-Data")
    const collection = db.collection("shifts");
    const sampleShiftData = {
      Date: "01-01-01",
      Name: "Test A",
      Location: "AB",
      Start_Time: "10:00",
      End_Time: "15:00",
      Primary: "John",
      Secondary: "Jack",
      Rookie: "James",
      Type: "Regular"
    }
    await collection.insertOne(sampleShiftData, function (err, result) {
      if (err) {
        console.error('Error inserting data:', err);
      } else {
        console.log('Inserted a document with the ID:', result.insertedId);
      }
    });


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }

}
fetch_shift_data().catch(console.dir);