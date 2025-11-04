import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ✅ Root route (Render uses this to check if app is alive)
app.get("/", (req, res) => {
  res.status(200).send("✅ Celebify AI backend is running successfully!");
});

// ✅ Health check route
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ✅ Example route to test Supabase connection
app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*").limit(1);
    if (error) throw error;
    res.json({ message: "Supabase connection successful!", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Render assigns a PORT dynamically
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running and listening on port ${PORT}`);
});
