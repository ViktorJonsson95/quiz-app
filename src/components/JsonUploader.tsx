import { useState } from "react"
import type { QuizData } from "../types/quiz"

type Props = {
    onLoad: (data: QuizData) => void
}

export default function JsonUploader({ onLoad }: Props) {
    const [jsonText, setJsonText] = useState("")
    const [copied, setCopied] = useState(false)
    const [questionCount, setQuestionCount] = useState(20)
    const promptText = `Skapa ett JSON-objekt enligt detta schema:

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

- Skapa exakt ${questionCount} frågor.
- Returnera endast giltig JSON.
- Ingen markdown.
- Ingen förklarande text.
- Varje fråga måste ha en hint.
- Hinten ska hjälpa studenten tänka i rätt riktning utan att avslöja svaret.
- Täck allt material.`


    const copyPrompt = async () => {
        await navigator.clipboard.writeText(promptText)

        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

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
            <h1>Quiz Generator</h1>

            <p>
                Skapa quiz från kursmaterial med hjälp av ChatGPT.
                Följ stegen nedan.
            </p>

            <section className="step-card">
                <h2>Steg 1: Skapa prompt</h2>

                <p>
                    Välj antal frågor och kopiera prompten.
                    Klistra sedan in den tillsammans med
                    ditt kursmaterial i ChatGPT.
                </p>

                <label>
                    Antal frågor:
                    <input
                        type="number"
                        min="1"
                        max="100"
                        value={questionCount}
                        onChange={(e) =>
                            setQuestionCount(
                                Number(e.target.value)
                            )
                        }
                    />
                </label>

                <button
                    className="copy-prompt-btn"
                    onClick={copyPrompt}
                >
                    {copied
                        ? "Prompt kopierad!"
                        : "Kopiera prompt"}
                </button>
            </section>

            <section className="step-card">
                <h2>Steg 2: Generera quiz i ChatGPT</h2>

                <p>
                    Klistra in prompten tillsammans med
                    dina anteckningar eller kursmaterial.
                    ChatGPT ska svara med JSON enligt
                    schemat ovan.
                </p>
            </section>

            <section className="step-card">
                <h2>Steg 3: Ladda quiz</h2>

                <p>
                    Klistra in JSON-svaret från ChatGPT
                    och klicka på "Ladda quiz".
                </p>

                <textarea
                    rows={20}
                    value={jsonText}
                    onChange={(e) =>
                        setJsonText(e.target.value)
                    }
                    placeholder="Klistra in JSON här..."
                />

                <button
                    onClick={handleLoad}
                    disabled={!jsonText.trim()}
                >
                    Ladda quiz
                </button>
            </section>
        </div>
    )
}