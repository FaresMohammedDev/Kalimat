import { supabase } from "@/lib/supabase";
import GradeContent from "@/components/GradeContent";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function GradePage({ params }: { params: Promise<{ grade: string }> }) {
  const { grade: gradeSlug } = await params;

  // Fetch the grade
  const { data: grade, error: gradeError } = await supabase
    .from("grades")
    .select("id, title")
    .eq("slug", gradeSlug)
    .single();

  if (gradeError || !grade) {
    notFound();
  }

  // Fetch units, lessons, and words for this grade
  const { data: unitsData } = await supabase
    .from("units")
    .select(`
      id, title,
      lessons (
        id, title,
        words (id, en_word, ar_word)
      )
    `)
    .eq("grade_id", grade.id)
    .order("id", { ascending: true });

  // Sort lessons and words if needed, Supabase nested selects don't easily order nested by default in all clients
  const formattedUnits = (unitsData || []).map((u: any) => ({
    ...u,
    lessons: (u.lessons || []).sort((a: any, b: any) => a.id - b.id).map((l: any) => ({
      ...l,
      words: (l.words || []).sort((a: any, b: any) => a.id - b.id)
    }))
  }));

  return (
    <main className="container">
      <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2rem" }}>
        {grade.title}
      </h2>
      <GradeContent units={formattedUnits} gradeSlug={gradeSlug} />
    </main>
  );
}
