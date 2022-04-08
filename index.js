const express = require("express");
const request = require("request");
const mongoose = require("mongoose");
const app = express();

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://admin:admin@cluster0.wehxb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  },
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);

const PORT = 3100;

app.get("/one", async (req, res) => {
  await client.connect();
  console.log("first");
  const database = client.db("Data");
  const collection = database.collection("nodeOne");
  request(
    "http://127.0.0.1:5100/sensor_data1",
    async function (error, response, body) {
      console.log(typeof JSON.parse(response["body"]));
      collection.deleteMany({});
      collection.insertMany(
        JSON.parse(response["body"]),
        function (err, result) {
          if (err) {
            res.status(400).send("Error inserting matches!");
          } else {
            console.log(`Added a new match with id ${result.insertedId}`);
            res.status(204).send();
          }
        }
      );
    }
  );
});
app.get("/two", async (req, res) => {
  await client.connect();
  console.log("second");
  const database = client.db("Data");
  const collection = database.collection("nodeTwo");
  request(
    "http://127.0.0.1:5100/sensor_data2",
    async function (error, response, body) {
      // console.log(JSON.parse(response["body"]));
      // console.log(JSON.parse(response["body"]));
      collection.deleteMany({});
      collection.insertMany(
        JSON.parse(response["body"]),
        function (err, result) {
          if (err) {
            res.status(400).send("Error inserting matches!");
          } else {
            console.log(`Added a new match with id ${result.insertedId}`);
            res.status(204).send();
          }
        }
      );
    }
  );
});

app.get("/total_traffic", async (req, res) => {
  await client.connect();
  console.log("traffic");
  const database = client.db("Data");
  const collection = database.collection("totalTraffic");
  request(
    "http://127.0.0.1:5100/total_traffic",
    async function (error, response, body) {
      console.log(typeof JSON.parse(response["body"]));
      collection.deleteMany({});
      collection.insertMany(
        JSON.parse(response["body"]),
        function (err, result) {
          if (err) {
            res.status(400).send("Error inserting matches!");
          } else {
            console.log(`Added a new match with id ${result.insertedId}`);
            res
              .status(204)
              .send(`Added a new match with id ${result.insertedId}`);
          }
        }
      );
    }
  );
});

app.get("/getnodeone", async (req, res) => {
  await client.connect();
  const database = client.db("Data");
  const collection = database.collection("nodeOne");
  let data = await collection.find({}).toArray();
  console.log(data);
  res.send(data);
});
app.get("/getnodetwo", async (req, res) => {
  await client.connect();
  const database = client.db("Data");
  const collection = database.collection("nodeTwo");
  let data = await collection.find({}).toArray();
  console.log(data);
  res.send(data);
});
app.get("/gettotaltraffic", async (req, res) => {
  await client.connect();
  const database = client.db("Data");
  const collection = database.collection("totalTraffic");
  let data = await collection.find({}).toArray();
  console.log(data);
  res.send(data);
});

app.listen(PORT, function () {
  console.log("Listening on Port 3100");
});
