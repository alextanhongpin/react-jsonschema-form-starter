import { MongoClient } from "mongodb";

const MONGO_USER = process.env.MONGO_USER ?? "root";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD ?? "example";
const MONGO_HOST = process.env.MONGO_HOST ?? "localhost";
const MONGO_PORT = process.env.MONGO_PORT ?? "27017";
const MONGO_DATABASE = process.env.MONGO_DATABASE ?? "testing";

const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
await client.connect();

// Ping.
await client.db("admin").command({ ping: 1 });
console.log("[mongodb] connected");

// Connect to actual database.
const db = client.db(MONGO_DATABASE);

function createCollectionForms() {
  const forms = db.collection("forms");
  forms.createIndex({ name: 1 }, { unique: true });
  return forms;
}

// Define collections here.
export const collections = Object.seal({
  Forms: createCollectionForms(),
});
