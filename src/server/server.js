import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'
import passport from 'passport'
import { OIDCStrategy } from 'passport-azure-ad';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';


dotenv.config();
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

app.use(cookieParser());

app.use(session({
  secret: process.env.CLIENT_SECRET||"PROVIDE_SECRET",
  resave: false,
  cookie: {maxAge: 7*24*60*60*1000}, // Optionally add secure: true if https,
  secure:false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
passport.use(new OIDCStrategy({
  identityMetadata: `${process.env.DISCOVERY_URL}`,
  clientID: process.env.ADFS_CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  responseType: 'code',
  responseMode: 'form_post',
  redirectUrl: `https://${process.env.SERVER_LOGIN_REDIRECT}`,
  passReqToCallback: true,
  loggingLevel: 'debug',
  useCookieInsteadOfSession: true,
  cookieEncryptionKeys: [{ key: '12345678901234567890123456789012', 'iv': '123456789012' }],  // IDK what this does lol

},
  function (req, iss, sub, profile, accessToken, refreshToken, done) {
    // You'll probably want to do some work here
    // You can pull out whatever you want from the profile here
    let username = profile._json.winaccountname
    if (!username) {
      return done(new Error("No username found"), null);
    }
    return done(null, { username: username })
  }
));

passport.serializeUser(function(user, done) {
  // You can do some stuff here
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // Also here
  done(null, user);
});

function regenerateSessionAfterAuthentication(req, res, next) {
  let passportInstance = req.session.passport;
  return req.session.regenerate(function (err){
      if (err) {
          return next(err);
      }
      req.session.passport = passportInstance;
      return req.session.save(next);
  })
}
app.get('/oauth2/login',
    passport.authenticate('azuread-openidconnect', {
        prompt: 'login'
    })
)
app.post('/oauth2/callback', 
    passport.authenticate('azuread-openidconnect', { failureRedirect: process.env.SERVER_LOGIN_REDIRECT, prompt: 'login'}),
    regenerateSessionAfterAuthentication,
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect(process.env.SERVER_LOGIN_REDIRECT);
    }
)

app.post('/oauth/logout/', (req, res, next)=>{
  // Logout is broken with azure-ad, so we just do it manually!
  if (req.session.passport) {
      delete req.session.passport.user;
  }
  let prevSession = req.session;
    
  req.session.save(function(err) {
      if (err) {
         return next(err)
      }
    
      // regenerate the session, which is good practice to help
      // guard against forms of session fixation
      req.session.regenerate(function(err) {
          if (err) {
              return next(err);
          }
          // You may want to redirect somewhere here!!
          return res.status(200).json({'status': 'ok'})
      });
  });
})
function restrict(check){
  // You can pass a check function here to add additional stuff!
  return function (req, res, next) {
      let cfn = check || function(){ return true }
      if (req.user && cfn(req, res)) {
          next();
      } else {
          // Do whatever you want here -- I'm returing json
          res.status(403).json({error: 'not logged in, access denied!'})
      }
  }
}



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

app.get('/api/shiftsdata/responder/:name', async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("shifts");
    const name = req.params.name.replace("+"," ");
    const shifts = await collection.find({$or:[
      {Primary: name},
      {Secondary: name},
      {Rookie: name}
    ]}).toArray();
    console.log(`Shifts with responder ${name} retrieved`)
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
app.post('/api/shiftsdata/update/:id', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('shifts');

    // Extract shift data from the request body
    const shiftID = req.params.id;
    // Exclude the _id field from the update
    const { _id, ...updateFields } = req.body;

    // Insert the shift data into the MongoDB collection
    const result = await collection.updateOne({_id: new ObjectId(shiftID)}, {$set: updateFields});
    console.log(`Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s)`);

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

app.get('/api/responderdata/:position', async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("responders");

    const position = req.params.position;
    console.log(position)
    // Fetch responders with the specified position
    const responders = await collection.find({ Position: position }).toArray();

    res.json(responders);
    console.log(`Responders with position ${position} retrieved`);
  } catch (error) {
    console.error('Error fetching responders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
});
app.get('/api/responderdata/user/:username', async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("responders");

    const username = req.params.username;

    // Fetch responders with the specified position
    const responders = await collection.find({ Username: username }).toArray();

    res.json(responders);
    console.log(`Responders with username ${username} retrieved`);
  } catch (error) {
    console.error('Error fetching responders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
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

app.listen(process.env.PORT||3000, process.env.HOST||'localhost', ()=>{
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log(`login url: http://${process.env.HOST}:${process.env.PORT}/oauth2/login`)
})