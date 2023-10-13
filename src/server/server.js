import { MongoClient, ServerApiVersion } from 'mongodb'



const uri = "mongodb+srv://test:CampusResponseTeam@cluster0.k8ipie7.mongodb.net/?retryWrites=true&w=majority";
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

async function fetch_shift_data(){
  const db = client.db("admin")
  const collection = db.collection('mycollection');
  collection.find({}).toArray((err, data) => {
    if (err) {
      console.error('Error fetching data:', err);
    } else {
      // Pass the data to your frontend
      // Typically, you would expose this data as an API or a route
      // in your backend (e.g., using Express.js) for the frontend to access.
      // Here, we'll simply log the data.
      console.log(data);

      // Close the database connection
      client.close();
    }
  });

}
run().catch(console.dir);