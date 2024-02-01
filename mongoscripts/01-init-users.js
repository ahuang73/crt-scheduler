// 01-init-data.js
var username = "USERNAME";

// Check if the "responders" collection exists

db = db.getSiblingDB("CRTData")
var collectionExists = db.getCollectionNames().indexOf("responders") > -1;

if (!collectionExists) {
  // Create the "responders" collection
  db.createCollection("responders");
  print("Created 'responders' collection.");
}

// Check if the user already exists in the "responders" collection
var existingUser = db.responders.findOne({ username: username });
print("INITIALIZING USER: ")
if (!existingUser) {
  // User does not exist, insert data into the "responders" collection
  db.responders.insert({
    Username: "USERNAME",
    Supervisor: 10,
    Training: 0,
    Debrief: 0,
    Regular: 0,
    Position: "Secondary",
    SFAexpiry: new Date("2027-11-18T19:02:00.000Z"),
    BLSexpiry: new Date("2027-11-18T19:02:00.000Z"),
    FRexpiry: new Date("2027-11-18T19:02:00.000Z"),
    ANP: 0,
    certExpiration: 1411,
    isAdmin: true,
    isSuspended: false,
    Name: ""
  });
  print("User inserted successfully into 'responders' collection.");
} else {
  // User already exists, skip insertion
  print("User" + username+ "already exists in 'responders' collection. Skipping insertion.");
}