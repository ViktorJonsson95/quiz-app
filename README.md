# Quiz Trainer

En enkel React-applikation för att skapa och studera quiz baserade på kursmaterial, anteckningar eller annan text. Quiz genereras med hjälp av ChatGPT och sparas lokalt i webbläsaren så att du kan fortsätta studera senare.

## Funktioner

* Importera quiz genom att klistra in JSON
* Spara quiz automatiskt i Local Storage
* Hantera flera quiz samtidigt
* Visa en fråga i taget
* Visa hint innan facit
* Visa facit och förklaring
* Fortsätt där du slutade
* Mobile First-layout
* Ingen backend krävs

## Hur det fungerar

### 1. Generera quiz

Kopiera kursmaterial eller anteckningar och använd följande prompt i ChatGPT:

```txt
Skapa ett JSON-objekt enligt detta schema:

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
- Täck allt material.
```

### 2. Importera quiz

1. Kopiera JSON-svaret från ChatGPT.
2. Klistra in det i appens textfält.
3. Klicka på "Ladda quiz".

### 3. Studera

* Välj ett quiz i sidomenyn.
* Svara på frågan.
* Visa hint vid behov.
* Visa facit.
* Läs förklaringen.
* Gå vidare till nästa fråga.

## JSON-format

Exempel:

```json
{
  "title": "Avancerad Frontend",
  "questions": [
    {
      "id": 1,
      "category": "Zod",
      "question": "Vad är skillnaden mellan TypeScript och Zod?",
      "hint": "Tänk på compile-time och runtime.",
      "answer": "TypeScript validerar vid compile-time medan Zod validerar vid runtime.",
      "explanation": "TypeScript försvinner efter kompilering medan Zod fortsätter validera data när applikationen körs."
    }
  ]
}
```

## Tekniker

* React
* TypeScript
* Vite
* Local Storage

## Lagring

Alla quiz sparas lokalt i webbläsaren via Local Storage.

Ingen data skickas till någon server.

Om Local Storage rensas försvinner quizen.

## Installation

```bash
npm install
npm run dev
```

## Framtida förbättringar

* Bättre UI
* Statistik per quiz


```
```
