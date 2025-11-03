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

app.get("/", (req, res) => {
  res.send("✅ Celebify AI backend is running successfully!");
});

// Example endpoint to test Supabase
app.get("/test-supabase", async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*").limit(1);
    if (error) throw error;
    res.json({ message: "Supabase connection successful!", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Important for Render — dynamic port and 0.0.0.0 binding
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running and listening on port ${PORT}`);
});
