"use client";

import { useState, useEffect } from "react";
import { FaArrowsRotate } from "react-icons/fa6";

type WordItem = {
  id: number;
  en_word: string;
  ar_word: string;
  unit_id: number;
  lesson_id: number;
};

export default function MatchGame({ words, units }: { words: WordItem[], units: any[] }) {
  const [selectedUnit, setSelectedUnit] = useState<string>("all");
  const [selectedLesson, setSelectedLesson] = useState<string>("all");
  
  const [enWords, setEnWords] = useState<any[]>([]);
  const [arWords, setArWords] = useState<any[]>([]);
  
  const [selectedEn, setSelectedEn] = useState<number | null>(null);
  const [selectedAr, setSelectedAr] = useState<number | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [errorPair, setErrorPair] = useState<{en: number, ar: number} | null>(null);

  // Filter words
  let filteredWords = words;
  if (selectedUnit !== "all") {
    filteredWords = filteredWords.filter(w => w.unit_id.toString() === selectedUnit);
  }
  if (selectedLesson !== "all") {
    filteredWords = filteredWords.filter(w => w.lesson_id.toString() === selectedLesson);
  }

  // Pick up to 6 random words for a round
  const startRound = () => {
    if (filteredWords.length === 0) {
      setEnWords([]);
      setArWords([]);
      return;
    }
    
    // Shuffle and pick 6
    const shuffled = [...filteredWords].sort(() => 0.5 - Math.random());
    const roundWords = shuffled.slice(0, Math.min(6, shuffled.length));

    // Create English array and Arabic array
    const enArr = roundWords.map(w => ({ id: w.id, text: w.en_word })).sort(() => 0.5 - Math.random());
    const arArr = roundWords.map(w => ({ id: w.id, text: w.ar_word })).sort(() => 0.5 - Math.random());

    setEnWords(enArr);
    setArWords(arArr);
    setMatchedPairs([]);
    setSelectedEn(null);
    setSelectedAr(null);
    setErrorPair(null);
  };

  useEffect(() => {
    startRound();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUnit, selectedLesson]);

  const handleMatch = (enId: number, arId: number) => {
    if (enId === arId) {
      // Match!
      setMatchedPairs([...matchedPairs, enId]);
      setSelectedEn(null);
      setSelectedAr(null);
      // Play sound or effect?
    } else {
      // Error!
      setErrorPair({ en: enId, ar: arId });
      setTimeout(() => {
        setErrorPair(null);
        setSelectedEn(null);
        setSelectedAr(null);
      }, 500);
    }
  };

  const onEnClick = (id: number) => {
    if (matchedPairs.includes(id)) return;
    if (selectedEn === id) {
      setSelectedEn(null);
      return;
    }
    setSelectedEn(id);
    if (selectedAr !== null) {
      handleMatch(id, selectedAr);
    }
  };

  const onArClick = (id: number) => {
    if (matchedPairs.includes(id)) return;
    if (selectedAr === id) {
      setSelectedAr(null);
      return;
    }
    setSelectedAr(id);
    if (selectedEn !== null) {
      handleMatch(selectedEn, id);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "30px", flexWrap: "wrap" }}>
        <select 
          className="form-control" 
          value={selectedUnit} 
          onChange={(e) => { setSelectedUnit(e.target.value); setSelectedLesson("all"); }}
        >
          <option value="all">All Units</option>
          {units.map((u: any) => (
            <option key={u.id} value={u.id}>{u.title}</option>
          ))}
        </select>
        
        <select 
          className="form-control" 
          value={selectedLesson} 
          onChange={(e) => setSelectedLesson(e.target.value)}
          disabled={selectedUnit === "all"}
        >
          <option value="all">All Lessons</option>
          {selectedUnit !== "all" && units.find(u => u.id.toString() === selectedUnit)?.lessons.map((l: any) => (
            <option key={l.id} value={l.id}>{l.title}</option>
          ))}
        </select>
        
        <button onClick={startRound} className="primary-btn" style={{ padding: "10px 20px" }}>
          <FaArrowsRotate />
          <span>New Round</span>
        </button>
      </div>

      {enWords.length === 0 ? (
        <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
          <p>لا توجد كلمات كافية في هذا القسم.</p>
        </div>
      ) : (
        <div className="match-game-container">
          <div className="match-column">
            <h3 style={{ textAlign: "center", marginBottom: "15px", color: "var(--text-secondary)" }}>English</h3>
            {enWords.map(w => {
              const isMatched = matchedPairs.includes(w.id);
              const isSelected = selectedEn === w.id;
              const isError = errorPair?.en === w.id;
              return (
                <div 
                  key={`en-${w.id}`}
                  onClick={() => onEnClick(w.id)}
                  className={`match-item ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''} ${isError ? 'error' : ''}`}
                >
                  {w.text}
                </div>
              );
            })}
          </div>

          <div className="match-column" dir="rtl">
            <h3 style={{ textAlign: "center", marginBottom: "15px", color: "var(--text-secondary)", fontFamily: "var(--font-cairo)" }}>عربي</h3>
            {arWords.map(w => {
              const isMatched = matchedPairs.includes(w.id);
              const isSelected = selectedAr === w.id;
              const isError = errorPair?.ar === w.id;
              return (
                <div 
                  key={`ar-${w.id}`}
                  onClick={() => onArClick(w.id)}
                  className={`match-item ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''} ${isError ? 'error' : ''}`}
                  style={{ fontFamily: "var(--font-cairo)", fontWeight: "600" }}
                >
                  {w.text}
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {matchedPairs.length > 0 && matchedPairs.length === enWords.length && enWords.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <h3 style={{ color: "var(--success-accent)", fontSize: "2rem", marginBottom: "20px" }}>Excellent! 🎉</h3>
          <button onClick={startRound} className="primary-btn">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
