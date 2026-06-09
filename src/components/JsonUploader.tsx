import { useState } from "react"
import type { QuizData } from "../types/quiz"

type Props = {
    onLoad: (data: QuizData) => void
}

export default function JsonUploader({ onLoad }: Props) {
    const [jsonText, setJsonText] = useState("")

    const handleLoad = () => {
        try {
            const data = JSON.parse(jsonText)

            if (
                !data.title ||
                !Array.isArray(data.questions)
            ) {
                throw new Error()
            }

            onLoad(data)
            setJsonText("")
        } catch {
            alert("Ogiltig JSON")
        }
    }

    return (
        <div>
            <h2>Ladda quiz</h2>
            <p>
                Klistra in JSON från ChatGPT och klicka på
                "Ladda quiz".
            </p>
            <textarea
                rows={20}
                cols={80}
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                placeholder="Klistra in JSON här..."
            />
            <details>
                <summary className="prompt">Visa prompt</summary>

                <pre>
                    {`Skapa ett JSON-objekt enligt detta schema:

{
  "title": string,
  "questions": [
    {
      "id": number,
      "category": string,
      "question": string,
      "hint": string,
      "answer": string,
      "explanation": string
    }
  ]
}

Regler:

- Returnera endast giltig JSON.
- Ingen markdown.
- Ingen förklarande text.
- Varje fråga måste ha en hint.
- Hinten ska hjälpa studenten tänka i rätt riktning utan att avslöja svaret.
- Täck allt material.`}
                </pre>
            </details>
            <br />

            <button
                onClick={handleLoad}
                disabled={!jsonText.trim()}
            >
                Ladda quiz
            </button>
        </div>
    )
}