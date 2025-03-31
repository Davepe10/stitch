import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY; // Aquí está el cambio

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL y clave son necesarias en .env.local");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
