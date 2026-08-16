"use client";

import { useState } from "react";
import { FaLanguage, FaVolumeHigh, FaGamepad } from "react-icons/fa6";
import Link from "next/link";

type Word = {
  id: number;
  en_word: string;
  ar_word: string;
};

type Lesson = {
  id: number;
  title: string;
  words: Word[];
};

type Unit = {
  id: number;
  title: string;
  lessons: Lesson[];
};

export default function GradeContent({ units, gradeSlug }: { units: Unit[], gradeSlug: string }) {
  const [isArabicFront, setIsArabicFront] = useState(false);

  const toggleLanguage = () => setIsArabicFront(!isArabicFront);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, enWord: string) => {
    e.currentTarget.classList.toggle('flipped');
    const utterance = new SpeechSynthesisUtterance(enWord);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <button onClick={toggleLanguage} className="primary-btn">
          <FaLanguage />
          <span>Switch to {isArabicFront ? "English" : "Arabic"} Front</span>
        </button>
        <Link href={`/kalimat/${gradeSlug}/match`} className="primary-btn" style={{ background: 'var(--primary-gradient)', borderColor: 'transparent' }}>
          <FaGamepad />
          <span>Play Match Game</span>
        </Link>
      </div>

      {units.length === 0 ? (
        <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
          <p>No units found for this grade.</p>
        </div>
      ) : (
        units.map((unit) => (
          <section key={unit.id} className="unit-section">
            <h2 className="unit-title"><span>{unit.title}</span></h2>
            
            {unit.lessons.length === 0 ? (
               <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>No lessons in this unit.</p>
            ) : (
              unit.lessons.map((lesson) => (
                <div key={lesson.id} style={{ marginBottom: '50px' }}>
                  <h3 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--text-secondary)' }}>{lesson.title}</h3>
                  <div className="cards-grid">
                    {lesson.words.map((word) => {
                      const frontText = isArabicFront ? word.ar_word : word.en_word;
                      const backText = isArabicFront ? word.en_word : word.ar_word;
                      const frontDir = isArabicFront ? 'rtl' : 'ltr';
                      const backDir = isArabicFront ? 'ltr' : 'rtl';

                      return (
                        <div key={word.id} className="flashcard" onClick={(e) => handleCardClick(e, word.en_word)}>
                          <div className="flashcard-inner">
                            <div className="flashcard-front" dir={frontDir}>
                              {frontText}
                            </div>
                            <div className="flashcard-back" dir={backDir}>
                              {backText}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Dictation Game Button for this Lesson */}
                  {lesson.words.length > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                      <Link href={`/kalimat/${gradeSlug}/dictation/${lesson.id}`} className="primary-btn" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: '#fff', borderColor: 'transparent', padding: '8px 20px', fontSize: '0.9rem' }}>
                        ✍️ إملاء (Dictation)
                      </Link>
                    </div>
                  )}
                </div>
              ))
            )}
          </section>
        ))
      )}
    </>
  );
}
