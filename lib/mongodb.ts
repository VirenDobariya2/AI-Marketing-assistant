import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var myMongoose: MongooseCache | undefined;
}

let cached = global.myMongoose

if (!cached) {
  cached = global.myMongoose = { conn: null, promise: null }
}

if (!global.myMongoose) {
  global.myMongoose = cached;
}

export async function connectDB() {
  if (cached!.conn) {
    return cached!.conn
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    }

    console.log("Attempting to connect to MongoDB:", MONGODB_URI.replace(/\/\/.*@/, "//***:***@"))
    cached!.promise = mongoose.connect(MONGODB_URI, opts)
  }

  try {
    cached!.conn = await cached!.promise
    console.log("MongoDB connected successfully")
    return cached!.conn
  } catch (e) {
    cached!.promise = null
    console.error("MongoDB connection error:", e)
    throw new Error(`Failed to connect to MongoDB: ${e instanceof Error ? e.message : "Unknown error"}`)
  }
}
export async function getDatabase() {
  const connection = await connectDB()
  return connection.connection.db
}

// export async function connectDB(): Promise<typeof mongoose> {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((mongoose) => {
//       console.log("✅ Connected to MongoDB");
//       return mongoose;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (error) {
//     cached.promise = null;
//     throw error;
//   }

//   return cached.conn;
// }
