# Flashcards webapp

Veb aplikacija za pregled špilova kartica za učenje (flashcards), grupisanih po predmetima.
Domaći zadatak iz predmeta Internet tehnologije, FON.

## Funkcionalnosti

- prikaz špilova u mreži kartica (naziv špila i predmet)
- pretraga špilova po nazivu
- klik na karticu vodi na stranicu špila (`/decks/:id`)
- responzivan raspored: 1 kolona na telefonu, do 4 kolone na velikom ekranu

Podaci su trenutno probni (mock), u `src/mock/data.ts`.

## Tehnologije

- Next.js (App Router) + React
- TypeScript
- Tailwind CSS
- Docker i docker-compose

## Struktura

```text
src/
├── app/page.tsx                 početna stranica
├── components/DeckBrowser.tsx   pretraga i mreža špilova
├── mock/data.ts                 probni predmeti i špilovi
└── shared/types.ts              TypeScript tipovi (FullDeckDto, FullSubjectDto)
```

## Pokretanje preko Docker-a

Potreban je samo Docker Desktop.

```bash
docker compose up --build
```

Aplikacija je na [http://localhost:3000](http://localhost:3000). Gašenje: `Ctrl+C`, pa `docker compose down`.

## Pokretanje za razvoj (bez Docker-a)

Potreban je Node.js 20.9 ili noviji.

```bash
npm install
npm run dev
```

Aplikacija je na [http://localhost:3000](http://localhost:3000).
