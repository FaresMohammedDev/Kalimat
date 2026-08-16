"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

type WordItem = {
  id: number;
  en_word: string;
  ar_word: string;
};

export default function DictationGame({ words, gradeSlug, lessonTitle }: { words: WordItem[], gradeSlug: string, lessonTitle: string }) {
  const [shuffledWords, setShuffledWords] = useState<WordItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [feedback, setFeedback] = useState<"none" | "correct" | "incorrect">("none");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startNewGame();
  }, [words]);

  const startNewGame = () => {
    // Shuffle words
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setFeedback("none");
    setInputText("");
    
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (gameOver || shuffledWords.length === 0) return;

    const currentWord = shuffledWords[currentIndex];
    
    // Check if the typed text matches the English word (case-insensitive, trimmed)
    const isCorrect = inputText.trim().toLowerCase() === currentWord.en_word.trim().toLowerCase();

    if (isCorrect) {
      setFeedback("correct");
      setScore(s => s + 1);
      
      // Play pronunciation on correct answer
      const utterance = new SpeechSynthesisUtterance(currentWord.en_word);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
      
      // Move to next after a short delay
      setTimeout(() => {
        if (currentIndex + 1 < shuffledWords.length) {
          setCurrentIndex(i => i + 1);
          setFeedback("none");
          setInputText("");
          inputRef.current?.focus();
        } else {
          setGameOver(true);
        }
      }, 800);
    } else {
      setFeedback("incorrect");
      // Keep focus
      inputRef.current?.focus();
    }
  };

  if (shuffledWords.length === 0) {
    return <p style={{ textAlign: "center", color: "var(--text-secondary)" }}>Loading words...</p>;
  }

  return (
    <div className="game-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <Link href={`/kalimat/${gradeSlug}`} className="primary-btn" style={{ background: 'transparent', border: '1px solid var(--card-border)' }}>
          <FaArrowLeft />
          <span>Back</span>
        </Link>
        <div style={{ background: 'var(--card-bg)', padding: '5px 15px', borderRadius: '15px', border: '1px solid var(--card-border)' }}>
          Score: {score} / {shuffledWords.length}
        </div>
      </div>

      <div className="game-board" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px', color: 'var(--blue-accent)' }}>✍️ إملاء: {lessonTitle}</h2>
        
        {gameOver ? (
          <div style={{ padding: '40px', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--card-border)' }}>
            <h3>🎉 رائع! لقد أنهيت الإملاء</h3>
            <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>نتيجتك: {score} من {shuffledWords.length}</p>
            <button onClick={startNewGame} className="primary-btn" style={{ margin: '0 auto' }}>
              إعادة المحاولة
            </button>
          </div>
        ) : (
          <div style={{ padding: '40px', background: 'var(--card-bg)', borderRadius: '20px', border: '1px solid var(--card-border)', position: 'relative' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>الكلمة {currentIndex + 1} من {shuffledWords.length}</p>
            
            <h1 style={{ fontSize: '3rem', margin: '20px 0', color: 'var(--foreground)' }} dir="rtl">
              {shuffledWords[currentIndex]?.ar_word}
            </h1>
            
            <form onSubmit={handleCheck} style={{ marginTop: '30px' }}>
              <input 
                ref={inputRef}
                type="text" 
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  setFeedback("none"); // reset feedback on typing
                }}
                placeholder="اكتب الكلمة باللغة الإنجليزية..."
                style={{ 
                  width: '100%', 
                  padding: '15px', 
                  fontSize: '1.2rem', 
                  borderRadius: '10px', 
                  border: `2px solid ${feedback === 'correct' ? '#10b981' : feedback === 'incorrect' ? '#ef4444' : 'var(--card-border)'}`,
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  textAlign: 'center',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
              
              <div style={{ marginTop: '20px', minHeight: '30px' }}>
                {feedback === "correct" && <span style={{ color: '#10b981', fontWeight: 'bold' }}>✅ إجابة صحيحة!</span>}
                {feedback === "incorrect" && <span style={{ color: '#ef4444', fontWeight: 'bold' }}>❌ حاول مرة أخرى!</span>}
              </div>
              
              <button type="submit" className="primary-btn" style={{ marginTop: '10px', width: '100%' }}>
                تحقق (Enter)
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
