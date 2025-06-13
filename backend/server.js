import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

// Test route
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("Database connection successful");
    res.json({ serverTime: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database connection error");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
