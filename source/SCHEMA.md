# English Learning Hub — data schema (read fully before writing)

Audience: a French-speaking adult learner (lycée/fac level), currently A2, aiming as high as possible
(B2/C1, C2 as stretch) by the end of the school year. Explanations are in French, addressed with "tu",
warm but precise. English examples are natural, correct, modern and varied (daily life, school, work,
travel, news, relationships). French translations are natural French, not word-for-word.

## Hard rules (the validator enforces most of them)

- Plain JavaScript files in `/home/claude/english-hub/data/`. Each file starts with:
  `window.HUB = window.HUB || { lessons: [], vocab: [], extras: {} };`
- ALL string literals use double quotes `"..."`. Never put a raw `"` inside a string; for quotation
  marks inside text use “ ” or « ». Apostrophes `'` are fine inside double-quoted strings.
- Inside strings, the only HTML allowed is `<b>`, `<em>`, `<br>`. Nothing else.
- No emoji anywhere. No ellipsis placeholders, no "etc." lists standing in for content, no TODOs.
- Write original explanations and examples. The book Essential Grammar in Use (Murphy, 4th ed.,
  attached PDF) is used only to map unit numbers in the `murphy` field — never copy its text.
- English must be correct. Where UK/US usage differs and it matters, say so briefly in French.
- After writing, run: `node /home/claude/english-hub/validate.js <your files>` and fix every error.

## Lessons (grammar)

```js
HUB.lessons.push({
  id: "b1-passive",                 // unique; lowercase a-z, 0-9, hyphens; starts with the level code
  level: "B1",                      // "A2" | "B1" | "B2" | "C1" | "C2"
  module: "Passif et conditionnels",// French module label — use exactly the label given in your task
  title: "The passive",             // English name of the grammar point
  fr: "La voix passive",            // French name
  murphy: "Unités 21–22, annexe 1", // Essential Grammar in Use units when given in your task, else ""
  minutes: 15,                      // realistic study time including exercises (8–20)
  goal: "Dire ce qui est fait sans préciser qui le fait.",   // ONE French sentence: what you'll be able to do
  intro: [                          // 2–4 short French paragraphs; the core explanation, step by step
    "Paragraph 1 ...",
    "Paragraph 2 ..."
  ],
  formulas: [                       // 2–5 rows showing the form(s); label in French, value may use <b>
    { label: "Affirmatif", value: "sujet + <b>am / is / are</b> + participe passé" }
  ],
  uses: [                           // 3–5 cases of WHEN to use it; each with one example + translation
    { title: "L'auteur n'est pas important", desc: "Short French explanation.", en: "My bike was stolen.", fr: "On m'a volé mon vélo." }
  ],
  examples: [                       // 8–10 example sentences, varied contexts, increasing difficulty
    { en: "This song was written in 1975.", fr: "Cette chanson a été écrite en 1975.", note: "" } // note: optional short French comment, "" if none
  ],
  table: null,                      // OR { caption: "French caption", head: ["col", "col"], rows: [["", ""], ...] }
                                    //    for a genuinely useful reference table (forms, verb lists, patterns)
  compare: null,                    // OR { title: "X ou Y ?", a: { label: "X", points: ["...", "..."] },
                                    //                         b: { label: "Y", points: ["...", "..."] } }
                                    //    contrast with the structure most often confused with it (2–4 points each)
  errors: [                         // 3–4 typical mistakes of FRENCH speakers (calques from French)
    { bad: "I am agree.", good: "I agree.", why: "French explanation of why." }
  ],
  tip: "One memorable trick, mnemonic or self-test, in French.",
  exercises: [                      // EXACTLY 6 items: at least 2 "mcq", at least 2 "type", 1 or 2 "order"
    { type: "mcq", q: "The bridge ___ in 1890.", options: ["built", "was built", "has built"], answer: 1,
      why: "French explanation of the right answer." },             // 3–4 options, answer = index
    { type: "type", q: "English ___ (speak) all over the world.", answer: ["is spoken"],
      why: "..." },                                                // q contains exactly one ___ and a cue in ( );
                                                                   // answer = every accepted variant (contractions AND full forms)
    { type: "order", words: ["painted", "was", "Monet", "the", "by", "picture"],
      answer: "The picture was painted by Monet", fr: "Le tableau a été peint par Monet.", why: "..." }
                                                                   // words shown shuffled (NOT already in order), no punctuation;
                                                                   // answer uses exactly the same words (case-insensitive)
                                                                   // optional alt: ["Other equally natural order", ...]
  ],
  cards: [                          // EXACTLY 5 flashcards for spaced repetition: French sentence -> English sentence
    { fr: "Ma voiture a été réparée hier.", en: "My car was repaired yesterday." }
  ]
});
```

Quality bar for each lesson: someone who reads only this lesson understands what the structure means,
how it is built (affirmative / negative / question when relevant), exactly when to use it versus its
neighbours, and can do the exercises. Explanations go from simple to subtle. Exercises test the uses
taught, not trivia; `why` always explains in French. Cards are useful sentences the learner can reuse.

## Vocabulary sets

```js
HUB.vocab.push({
  id: "a2-voc-home", level: "A2",
  title: "La maison et le quotidien",   // French title
  en: "Home and daily life",            // English title
  words: [                              // exactly 14 entries
    { en: "to wake up", fr: "se réveiller", pos: "verbe", ex: "I wake up at 6:30 on school days.", exFr: "Je me réveille à 6h30 les jours d'école." }
  ]                                     // pos in French: "nom", "verbe", "adjectif", "adverbe", "expression", "verbe à particule"
});
```

## Extras (one object, reference material)

```js
HUB.extras.irregular    = [ ["be", "was / were", "been", "être"], ... ];        // 110 most useful, alphabetical
HUB.extras.phrasal      = [ { v: "give up", fr: "abandonner, arrêter", ex: "...", level: "B1", sep: true } ]; // sep = separable
HUB.extras.idioms       = [ { en: "a piece of cake", fr: "simple comme bonjour", ex: "...", level: "B1" } ];
HUB.extras.falseFriends = [ { en: "actually", means: "en fait, en réalité", trap: "actuellement = currently", ex: "..." } ];
HUB.extras.connectors   = [ { en: "however", fr: "cependant", role: "Contraste", level: "B1", ex: "..." } ];
HUB.extras.writing      = [ { level: "A2", title: "Ma journée type", prompt: "French task description", words: "60–80" } ];
HUB.extras.dictation    = [ { level: "A2", en: "I usually take the bus to school." } ];
HUB.extras.speaking     = [ { level: "A2", en: "Could you speak a little more slowly, please?", focus: "French tip on the sound to watch" } ];
HUB.extras.daily        = [ { en: "Better late than never.", fr: "Mieux vaut tard que jamais.", ex: "...", note: "short French usage note" } ];
```
