import type { SavedQuiz } from "../types/quiz"

type Props = {
    quizzes: SavedQuiz[]
    onSelect: (quiz: SavedQuiz) => void
}

export default function QuizList({
    quizzes,
    onSelect
}: Props) {
    return (
        <>
            <h1>Mina Quiz</h1>

            {quizzes.map((quiz) => (
                <div key={quiz.id}>
                    <h3>{quiz.title}</h3>

                    <p>
                        Fråga {quiz.currentQuestion + 1} /{" "}
                        {quiz.quiz.questions.length}
                    </p>

                    <button
                        onClick={() => onSelect(quiz)}
                    >
                        Fortsätt
                    </button>
                </div>
            ))}
        </>
    )
}