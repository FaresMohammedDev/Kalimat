import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://tyyuqhnbxizxvkhqmkrp.supabase.co', 'sb_publishable_-8q5UQp-d5yNAX6nc5fLUg_T_oo5gnu');

async function test() {
  const { data, error } = await supabase.from('settings').select('*');
  console.log('Settings:', data);
  console.log('Error:', error);
}

test();
