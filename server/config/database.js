// ? server/config/database.js
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

let supabase = null;

const connectDB = async () => {
  try {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.error('? Missing Supabase environment variables');
      return null;
    }

    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('? Connected to Supabase successfully!');
    return supabase;
  } catch (error) {
    console.error('? Supabase connection error:', error.message);
    return null;
  }
};

module.exports = connectDB;







