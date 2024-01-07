import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'
import passport from 'passport'
import { OIDCStrategy } from 'passport-azure-ad';
import { Strategy } from 'passport-openidconnect';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import https from 'https';
import fs from 'fs';
import axios from 'axios';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';


dotenv.config();
const app = express()
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const dbName = "CRT-Data"
const key = fs.readFileSync(process.env.SSL_KEY_PATH);
const cert = fs.readFileSync(process.env.SSL_CERT_PATH);

const server = https.createServer({key: key, cert: cert }, app);
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials:true,
}));

app.use(session({
  secret: process.env.CLIENT_SECRET||"PROVIDE_SECRET",
  resave: false,
  cookie: {maxAge: 7*24*60*60*1000},
  secure:false,
  saveUninitialized: true
}))

app.use(cookieParser());
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });
async function fetchJWKS(jwksUri) {
  try {
    const response = await axios.get(jwksUri);
    return response.data;
  } catch (error) {
    console.error('Error fetching JWKS:', error);
    throw error;
  }
}
async function fetchOidcConfiguration() {
  try {
    const response = await axios.get(process.env.DISCOVERY_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching OIDC configuration:', error);
    throw error;
  }
}
function parseDateString(dateString) {
  const [day, month, year] = dateString.split('-');
  return {
    day: parseInt(day, 10),
    month: parseInt(month, 10),
    year: parseInt(year, 10),
  };
}
function parseJwt (token) {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
const oidcConfiguration = await fetchOidcConfiguration();
const jwks = await fetchJWKS(oidcConfiguration.jwks_uri);


passport.use(new Strategy({
  issuer: oidcConfiguration.issuer,
  authorizationURL: oidcConfiguration.authorization_endpoint,
  tokenURL: oidcConfiguration.token_endpoint,
  clientID: process.env.ADFS_CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  responseType: 'code',
  responseMode: 'form_post',
  callbackURL: `${process.env.SERVER_LOGIN_REDIRECT}`,
  userInfoURL:oidcConfiguration.userinfo_endpoint,
  loggingLevel: 'debug',
  useCookieInsteadOfSession: true,
  cookieEncryptionKeys: [{ key: '12345678901234567890123456789012', 'iv': '123456789012' }], 
},
  async function (req, iss, sub, profile, accessToken, refreshToken, claims, done) {
    
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("responders");
    const decodedProfile = parseJwt(profile);
    const username = decodedProfile.username;
    const responder = await collection.findOne({ Username: username });
    
    console.log('OIDC Strategy - Authentication Successful:', responder);
    return done(null, responder);
  }
));
app.get('/protected-route', (req, res) => {
  const { username, name, email } = req.user;

  // Use the claims as needed
  console.log('Username:', username);
  console.log('Name:', name);
  console.log('Email:', email);

  // Send a response
  res.send('Protected route');
});

passport.serializeUser(function (user, done) {
  console.log("SERIALZING USER: ", user)
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("DESERIALZING USER: ", parseJwt(user))
  done(null, parseJwt(user));
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
    passport.authenticate('openidconnect', {
        prompt: 'login',
        scope:['email','profile'],
    }),
    (req, res) => {

    }
)

app.get('/oidc/callback', 
    passport.authenticate('openidconnect', { 
      failureRedirect: process.env.SERVER_LOGIN_REDIRECT, 
      prompt: 'login',
      scope:['email','profile'],
    }),
    regenerateSessionAfterAuthentication,
    async function (req, res) {
        // const userinfo = parseJwt(req.session.passport.user);
        // console.log('User Info from JWT:', userinfo);

        // const username = userinfo.username;
        // console.log('Username from JWT:', username);

        // await client.connect();
        // const db = client.db(dbName);
        // const collection = db.collection("responders");
        // const responder = await collection.findOne({ Username: username });
        
        // if (responder.isAdmin == undefined) {
        //   responder.isAdmin = false;
        // }

        // const userData = {
        //   username: userinfo.username,
        //   email: userinfo.email, 
        //   profile: userinfo.profile,
        //   isAdmin: responder.isAdmin,
        //   token: req.session.passport.user,
        // };
        // const userDataString = JSON.stringify(userData);

        // // Debug logging
        // console.log('Serialized User Data:', userDataString);

        // res.cookie('userData', userDataString);
        res.redirect(process.env.FRONT_END_URL);
    }
);
app.get('/oidc/session', restrict(), (req, res)=>{
      res.json(req.session.passport.user);        
    }
    
)

app.get('/oauth/logout/',   (req, res, next)=>{
  if (req.session.passport) {
      delete req.session.passport.user;
  }
  let prevSession = req.session;
    
  req.session.save(function(err) {
      if (err) {
         return next(err)
      }
    
      req.session.regenerate(function(err) {
          if (err) {
              return next(err);
          }
          return res.status(200).json({'status': 'ok'})
      });
  });
})

function verifyJwt(token, jwks) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, (header, callback) => {
      const kid = header.kid;
      const key = jwks.keys.find((k) => k.kid === kid);

      if (!key) {
        reject(new Error('Unable to find matching key in JWKS'));
      } else {
        const signingKey = {
          kid: key.kid,
          kty: key.kty,
          use: key.use,
          n: key.n,
          e: key.e,
          alg: key.alg,
        };
        resolve(signingKey);
      }
    });
  });
}
function restrict(check){
  return function (req, res, next) {
      let cfn = check || function(){ return true }
      console.log("REQUEST USER: " ,req.user)
      console.log("REQUEST SESSION: ", req.session)
      if (req.user && cfn(req, res)) {
          next();
      } else {
          res.status(403).json({error: 'not logged in, access denied!'})
      }
  }
}

app.get('/restricted', restrict(), (req, res) => {
  res.send(`Hello ${req.user}, USERNAME: ${req.user.username}, EMAIL: ${req.user.email}`)
})



app.get('/api/shiftsdata', restrict(), async (req, res) => {
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

app.get('/api/shiftsdata/:id', restrict(), async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("shifts");
    const shiftId = req.params.id;
    console.log(shiftId)
    const shifts = await collection.find({_id: new ObjectId(shiftId)}).toArray();
    res.json(shifts);
  } catch (error) {
    console.error('Error fetching shifts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/shiftsdata/responder/:name', restrict(), async (req, res) => {
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

app.post('/api/shiftsdata', restrict(), async (req, res) => {
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
app.post('/api/shiftsdata/update/:id', restrict(), async (req, res) => {
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
app.delete('/api/shiftsdata/deleteBefore/:dateString', restrict(), async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection('shifts');

    const dateString = req.params.dateString;
    const { day: dayToDelete, month: monthToDelete, year: yearToDelete } = parseDateString(dateString);

    const allShifts = await collection.find({}).toArray();
    const shiftsToDelete = allShifts.filter(shift => {
      const { day, month, year } = parseDateString(shift.Date);
      return year < yearToDelete || (year === yearToDelete && (month < monthToDelete || (month === monthToDelete && day < dayToDelete)));
    });
    const shiftIdsToDelete = shiftsToDelete.map(shift => shift._id);
    const result = await collection.deleteMany({ _id: { $in: shiftIdsToDelete } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No shifts found before the specified date' });
    }

    res.json({ success: true });
    console.log("Shifts deleted before the specified date");
  } catch (error) {
    console.error('Error deleting shifts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
});


app.get('/api/shifttypedata', restrict(), async (req, res) => {
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

app.post('/api/shifttypedata', restrict(), async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('shift_types');

    const shiftTypeData = req.body;

    const result = await collection.insertOne(shiftTypeData);

    res.json({ _id: result.insertedId });
    console.log("Shift Type POST")
  } catch (error) {
    console.error('Error creating shift:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
});

app.get('/api/responderdata', restrict(), async (req, res) => {
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



app.post('/api/responderdata',restrict(), async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('responders');


    const shiftTypeData = req.body;


    const result = await collection.insertOne(shiftTypeData);


    res.json({ _id: result.insertedId });
    console.log("Responder POST")
  } catch (error) {
    console.error('Error creating shift:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {

    client.close();
  }
});

app.get('/api/responderdata/:position', restrict(), async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("responders");

    const position = req.params.position;
    console.log(position)
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
app.get('/api/responderdata/user/:username', restrict(), async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("responders");

    const username = req.params.username;

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
app.post('/api/responderdata/update/user/:username', restrict(), async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("responders");

    const username = req.params.username;
    const {_id, ...updatedParams} = req.body;
    const responders = await collection.updateOne({ Username: username }, {$set: updatedParams} );
    
    res.json(responders);
    console.log(`Responders with username ${username} retrieved`);
  } catch (error) {
    console.error('Error fetching responders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
});
app.delete('/api/responderdata/delete/user/:username', restrict(), async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("responders");

    const username = req.params.username;


    const responders = await collection.deleteOne({ Username: username }).toArray();

    res.json(responders);
    console.log(`Responders with username ${username} retrieved`);
  } catch (error) {
    console.error('Error fetching responders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    client.close();
  }
});
app.delete('/api/shifttypedata/delete/:id', restrict(), async (req, res) => {
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


server.listen(process.env.PORT||3000, process.env.HOST||'localhost', ()=>{
  console.log(`Server is running on port ${process.env.PORT||3000}`);
  console.log(`login url: http://${process.env.HOST}:${process.env.PORT}/oauth2/login`)
})

