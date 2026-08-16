import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://tyyuqhnbxizxvkhqmkrp.supabase.co', 'sb_publishable_-8q5UQp-d5yNAX6nc5fLUg_T_oo5gnu');

async function test() {
  const { data, error } = await supabase.from('settings').update({ value: '$2b$10$hv8FgsDSeofdzVurtGkyIuNQuW7VDDoMpFanYN0t/GGTeSe8KOLHS' }).eq('key', 'admin_password');
  console.log('Update Data:', data);
  console.log('Update Error:', error);
}

test();
