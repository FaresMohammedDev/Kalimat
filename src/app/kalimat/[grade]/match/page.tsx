import { supabase } from "@/lib/supabase";
import MatchGame from "@/components/MatchGame";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export const revalidate = 0;

export default async function MatchPage({ params }: { params: Promise<{ grade: string }> }) {
  const { grade: gradeSlug } = await params;

  // Fetch grade and words
  const { data: grade, error: gradeError } = await supabase
    .from("grades")
    .select("id, title")
    .eq("slug", gradeSlug)
    .single();

  if (gradeError || !grade) notFound();

  // Fetch words with their unit/lesson info for filtering
  const { data: unitsData } = await supabase
    .from("units")
    .select(`
      id, title,
      lessons (
        id, title,
        words (id, en_word, ar_word)
      )
    `)
    .eq("grade_id", grade.id);

  // Flatten words for the game
  const wordsForGame: any[] = [];
  unitsData?.forEach(unit => {
    unit.lessons?.forEach(lesson => {
      lesson.words?.forEach(word => {
        wordsForGame.push({
          id: word.id,
          en_word: word.en_word,
          ar_word: word.ar_word,
          lesson_id: lesson.id,
          unit_id: unit.id,
          lesson_title: lesson.title,
          unit_title: unit.title
        });
      });
    });
  });

  return (
    <main className="container" style={{ paddingBottom: '100px' }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href={`/kalimat/${gradeSlug}`} className="primary-btn" style={{ background: 'transparent', boxShadow: 'none' }}>
          <FaArrowLeft />
          <span>Back to {grade.title}</span>
        </Link>
      </div>
      
      <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2rem" }}>
        Match Game - {grade.title}
      </h2>

      <MatchGame words={wordsForGame} units={unitsData || []} />
    </main>
  );
}
