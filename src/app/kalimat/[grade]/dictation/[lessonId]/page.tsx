import { supabase } from "@/lib/supabase";
import DictationGame from "@/components/DictationGame";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function DictationPage({ params }: { params: Promise<{ grade: string; lessonId: string }> }) {
  const { grade: gradeSlug, lessonId } = await params;

  // Verify the grade exists
  const { data: grade } = await supabase.from("grades").select("id").eq("slug", gradeSlug).single();
  if (!grade) return notFound();

  // Fetch the lesson and its words
  const { data: lesson, error } = await supabase
    .from("lessons")
    .select("id, title, words(id, en_word, ar_word)")
    .eq("id", Number(lessonId))
    .single();

  if (error || !lesson) return notFound();

  // Sort words by id so it's consistent before shuffling
  const sortedWords = (lesson.words || []).sort((a: any, b: any) => a.id - b.id);

  if (sortedWords.length === 0) {
    return (
      <main className="container" style={{ textAlign: "center", paddingTop: "100px" }}>
        <h2>No words found in this lesson for dictation.</h2>
      </main>
    );
  }

  return (
    <main className="container">
      <DictationGame words={sortedWords} gradeSlug={gradeSlug} lessonTitle={lesson.title} />
    </main>
  );
}
