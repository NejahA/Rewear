const mongoose = require("mongoose");
const dbName = process.env.db;
const username = process.env.ATLAS_USERNAME;
const pw = process.env.ATLAS_PASSWORD;

const uri = `mongodb+srv://${username}:${pw}@cluster0.qd9v5k1.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose
  .connect(uri)
  .then(() =>console.log("🛰️🛰️🛰️ Established a connection to the database " + dbName))
  .catch((err) =>console.log(" ❌❌❌Something went wrong when connecting to the database",err)
  );
