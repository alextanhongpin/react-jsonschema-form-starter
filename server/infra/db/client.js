import { MongoClient } from "mongodb";

class Config {
  constructor() {
    this.user = process.env.MONGO_USER ?? "root";
    this.password = process.env.MONGO_PASSWORD ?? "example";
    this.host = process.env.MONGO_HOST ?? "localhost";
    this.port = process.env.MONGO_PORT ?? "27017";
    this.database = process.env.MONGO_DATABASE ?? "testing";
  }

  toString() {
    return `mongodb://${this.user}:${this.password}@${this.host}:${this.port}`;
  }
}

const config = new Config();

// Collection names.
const c = {
  Users: "users",
  Books: "books",
  Forms: "forms",
};

const client = new MongoClient(config.toString(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
await client.connect();

// Ping.
await client.db("admin").command({ ping: 1 });
console.log("[mongodb] connected");

// Connect to actual database.
const db = client.db(config.database);

function createFormCollection() {
  const forms = db.collection(c.Forms);
  forms.createIndex({ name: 1 }, { unique: true });
  return forms;
}

function createUserCollection() {
  const users = db.collection(c.Users);
  users.createIndex({ name: 1, email: 1 }, { unique: true });
  return users;
}

// Define collections here.
export const collection = Object.seal({
  forms: createFormCollection(),
  users: createUserCollection(),
  books: db.collection(c.Books),
});
