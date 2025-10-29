import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "/api"; // Proxy üzerinden yönlendirme
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
