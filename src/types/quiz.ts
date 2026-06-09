export interface Question {
    id: number
    category: string
    question: string
    hint: string
    answer: string
    explanation: string
}

export interface QuizData {
    title: string
    questions: Question[]
}

export interface SavedQuiz {
    id: string
    title: string
    currentQuestion: number
    quiz: QuizData
}