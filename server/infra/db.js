import { MongoClient } from "mongodb";

const MONGO_HOST = process.env.MONGO_HOST ?? "localhost";
const MONGO_PORT = process.env.MONGO_PORT ?? "27017";

const uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
await client.connect();

await client.db("admin").command({ ping: 1 });
console.log("[mongodb] connected");

export default client;
