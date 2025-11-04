import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ Celebify AI backend is running successfully!");
});

// ✅ Health check route (for Render)
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// ✅ Example endpoint to test Supabase
app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*").limit(1);
    if (error) throw error;
    res.json({ message: "Supabase connection successful!", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running and listening on port ${PORT}`);
});
