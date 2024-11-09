import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { REACT_APP_SUPABASE_ANON_KEY, REACT_APP_SUPABASE_URL } from 'config';

const supabase: SupabaseClient = createClient(
  REACT_APP_SUPABASE_URL ?? '',
  REACT_APP_SUPABASE_ANON_KEY ?? ''
);

// NOTE: Triggers when supabase auth state changes
// supabase.auth.onAuthStateChange(async (event, session) => {
// });

export default supabase;
