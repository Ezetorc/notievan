import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types.configuration";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY;

if (supabaseKey === undefined) {
  throw new Error("Supabase key is undefined");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
