import express from "express";
import cors from "cors";
import eventRoutes from "./routes/event-routes.js";

const app = express();

app.use(cors());
app.use(express.json()); // gelen JSON gövdesini req.body'ye koyar

app.use("/events", eventRoutes);

// Yukarıdaki hiçbir adres eşleşmediyse buraya düşer.
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});

export default app;
