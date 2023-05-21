import mongoose from "mongoose";

if (!process.env.DATABASE_URL) {
  throw new Error("Please add the database url in .env file");
}

const DATABASE_URL: string = process.env.DATABASE_URL;
// console.log('database_url->', DATABASE_URL);

let globalWithMongoose = global as typeof globalThis & {
  mongoose: any;
};
// console.log('globalWithMongoose->', globalWithMongoose);

let cached = globalWithMongoose.mongoose;
// console.log('cached->', cached);

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}


async function connectDb() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose
        .connect(DATABASE_URL, options)
        .then( (mongoose) => {
          console.log("Connection has been established.");
          return mongoose;
        })
        .catch( (error) => {
          console.log(error as Error);
        });
  }

  cached.conn = await cached.promise;
  // console.log('cached.conn->', cached.conn);

  return cached.conn;
}

export default connectDb;