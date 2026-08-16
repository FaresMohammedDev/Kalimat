import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://tyyuqhnbxizxvkhqmkrp.supabase.co', 'sb_publishable_-8q5UQp-d5yNAX6nc5fLUg_T_oo5gnu');

async function test() {
  const { data: lessons, error: lError } = await supabase.from('lessons').select('*');
  console.log("Lessons in DB:", lessons);
  
  if (lessons && lessons.length > 0) {
    const lesson_id = lessons[0].id;
    const { data, error } = await supabase.from('words').insert({ lesson_id, en_word: "Test", ar_word: "Test AR" }).select();
    console.log("Insert Word:", data);
    console.log("Error:", error);
  }
}
test();
