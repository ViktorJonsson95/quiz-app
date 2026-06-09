import { useEffect, useState } from "react"
import type { QuizData } from "../types/quiz"

type Props = {
    quiz: QuizData
}

export default function Quiz({ quiz }: Props) {
    const [currentIndex, setCurrentIndex] = useState(() => {
        const saved = localStorage.getItem("currentQuestion")

        return saved ? Number(saved) : 0
    })
    const [userAnswer, setUserAnswer] = useState("")
    const [showAnswer, setShowAnswer] = useState(false)
    const [showHint, setShowHint] = useState(false)

    const question = quiz.questions[currentIndex]

    useEffect(() => {
        localStorage.setItem(
            "currentQuestion",
            String(currentIndex)
        )
    }, [currentIndex])

    const nextQuestion = () => {
        if (currentIndex === quiz.questions.length - 1)
            return

        setCurrentIndex((prev) => prev + 1)
        setUserAnswer("")
        setShowAnswer(false)
        setShowHint(false)
    }

    return (
        <div>
            <h2>{quiz.title}</h2>

            <p>
                Fråga {currentIndex + 1} /{" "}
                {quiz.questions.length}
            </p>

            <p>
                <strong>Kategori:</strong>{" "}
                {question.category}
            </p>

            <h3>{question.question}</h3>


            <textarea
                rows={6}
                value={userAnswer}
                onChange={(e) =>
                    setUserAnswer(e.target.value)
                }
            />

            <br />
            <button onClick={() => setShowHint(true)}>
                Visa hint
            </button>

            {showHint && (
                <p>
                    <strong>Hint:</strong> {question.hint}
                </p>
            )}

            {!showAnswer && (
                <button
                    onClick={() => setShowAnswer(true)}
                >
                    Visa facit
                </button>
            )}

            {showAnswer && (
                <>
                    <h4>Ditt svar</h4>
                    <p>{userAnswer || "Inget svar"}</p>

                    <h4>Facit</h4>
                    <p>{question.answer}</p>

                    <h4>Förklaring</h4>
                    <p>{question.explanation}</p>

                    <button onClick={nextQuestion}>
                        Nästa fråga
                    </button>
                </>
            )}

            <button
                onClick={() => {
                    setCurrentIndex(0)
                    localStorage.setItem("currentQuestion", "0")
                }}
            >
                Börja om
            </button>
        </div>
    )
}