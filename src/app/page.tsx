import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

// Disable caching for this route so it's always up to date
export const revalidate = 0;

export default async function Home() {
  const { data: grades } = await supabase.from("grades").select("*").order("id", { ascending: true });

  return (
    <main className="container">
      <section className="unit-section">
        <h2 className="unit-title">
          <span>Classes / الصفوف الدراسية</span>
        </h2>
        
        {grades && grades.length > 0 ? (
          <div className="cards-grid">
            {grades.map((grade: any) => (
              <Link href={`/kalimat/${grade.slug}`} key={grade.id} style={{ textDecoration: 'none' }}>
                <div className="flashcard">
                  <div className="flashcard-inner" style={{ transform: 'none' }}>
                    <div className="flashcard-front" style={{ position: 'relative', height: '100%' }}>
                      <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{grade.title}</span>
                      <FaArrowRight style={{ marginTop: '10px', color: 'var(--blue-accent)' }} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", marginTop: "50px", color: "var(--text-secondary)" }}>
            <p>لا توجد صفوف دراسية مضافة حتى الآن.</p>
          </div>
        )}
      </section>
    </main>
  );
}
