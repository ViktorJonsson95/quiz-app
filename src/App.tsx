import { useEffect, useState } from "react"
import JsonUploader from "./components/JsonUploader"
import Quiz from "./components/Quiz"
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
  const [showUploader, setShowUploader] = useState(false)

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

  const clearQuiz = () => {
    localStorage.removeItem("quizzes")
    setQuizzes([])
    setActiveQuiz(null)
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
        {showUploader && (
          <>
            <button
              onClick={() => {
                setShowUploader(false)
              }}
            >
              ← Tillbaka
            </button>

            <JsonUploader
              onLoad={(data) => {
                handleLoadQuiz(data)
                setShowUploader(false)
              }}
            />
          </>
        )}

        {!showUploader && !activeQuiz && (
          <>
            <div className="welcome-card">
              <h1>Hur man använder appen</h1>

              <ol>
                <li>Sammanfatta kursmaterial eller anteckningar.</li>
                <li>Använd prompten och kursmaterial för att generera quiz-JSON.</li>
                <li>Klistra in JSON nedan.</li>
                <li>Ladda quizet.</li>
                <li>Svara på frågorna.</li>
                <li>Quizet sparas automatiskt i webbläsaren.</li>
              </ol>

              <JsonUploader onLoad={handleLoadQuiz} />
            </div>
          </>
        )}

        {activeQuiz && (
          <Quiz quiz={activeQuiz.quiz} />
        )}
      </main>
    </div>
  )
}