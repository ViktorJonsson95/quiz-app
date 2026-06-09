import { useEffect, useState } from "react"
import JsonUploader from "./components/JsonUploader"
import type { QuizData, SavedQuiz } from "./types/quiz"
import QuizList from "./components/QuizList"
import "./App.css"

export default function App() {
  const [quizzes, setQuizzes] = useState<SavedQuiz[]>(() => {
    const saved = localStorage.getItem("quizzes")

    if (!saved) return []

    return JSON.parse(saved)
  })
  const [activeQuiz, setActiveQuiz] = useState<SavedQuiz | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("quizzes")

    if (!saved) return

    setQuizzes(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes))
  }, [quizzes])

  const handleLoadQuiz = (data: QuizData) => {
    const newQuiz: SavedQuiz = {
      id: crypto.randomUUID(),
      title: data.title,
      currentQuestion: 0,
      quiz: data,
    }

    setQuizzes((prev) => [...prev, newQuiz])

    setActiveQuiz(newQuiz)
  }

  return (
    <div className="app">
      <aside className="sidebar">
        {activeQuiz && (
          <button
            onClick={() => setActiveQuiz(null)}
          >
            ← Till startsidan
          </button>
        )}


        <QuizList
          quizzes={quizzes}
          onSelect={setActiveQuiz}
        />
      </aside>

      <main className="content">
        {!activeQuiz && (
          <JsonUploader
            onLoad={handleLoadQuiz}
          />
        )}
      </main>
    </div>
  )
}