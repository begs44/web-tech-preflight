import "dotenv/config";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { Event } from "./models/event-model.js";
import { seedEvents } from "./data/seed-events.js";

// Önce sil, sonra ekle: her çalıştığında 6 kayıt olur.
await connectDatabase();
await Event.deleteMany({});
const created = await Event.insertMany(seedEvents);
console.log(`${created.length} etkinlik eklendi`);
await mongoose.disconnect();
