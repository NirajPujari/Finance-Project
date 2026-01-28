import { MongoClient, Db } from "mongodb";

const uri = process.env.DB_URL!;
const dbName = process.env.DB_NAME!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!uri) {
  throw new Error("DB_URL missing");
}

if (!dbName) {
  throw new Error("DB_NAME missing");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// 🔑 convert client → db
const dbPromise: Promise<Db> = clientPromise.then((client) => client.db(dbName));

export default dbPromise;
