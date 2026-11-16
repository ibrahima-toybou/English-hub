window.HUB = window.HUB || { lessons: [], vocab: [], extras: {} };

window.HUB.lessons.push({
  "id": "b1-relative-clauses",
  "level": "B1",
  "module": "Structure de phrase",
  "title": "Relative clauses (defining)",
  "fr": "Les propositions relatives",
  "murphy": "Unités 101–102",
  "minutes": 16,
  "goal": "Préciser de qui ou de quoi tu parles avec who, which, that, whose et where.",
  "intro": [
    "Une proposition relative donne une information sur un nom, pour préciser <b>de qui</b> ou <b>de quoi</b> on parle : <em>the girl who lives next door</em> (la fille qui habite à côté). On l'appelle « déterminative » quand elle est indispensable pour identifier la personne ou la chose.",
    "Le choix du pronom dépend de l'antécédent : <b>who</b> pour les personnes, <b>which</b> pour les choses et les animaux, <b>that</b> pour les deux (très courant à l'oral). <b>Whose</b> exprime la possession (dont le, dont la), <b>where</b> renvoie à un lieu.",
    "Grande différence avec le français : quand le pronom est <b>complément</b> (l'équivalent de « que »), on peut le supprimer. <em>The film that I saw</em> = <em>The film I saw</em>. Mais quand il est <b>sujet</b> (« qui »), il est obligatoire : <em>The man who called</em>.",
    "Les prépositions se placent souvent à la fin : <em>the girl I was talking to</em> (la fille à qui je parlais). Et « ce que » se traduit par <b>what</b> : <em>I don't understand what you mean</em>."
  ],
  "formulas": [
    {
      "label": "Personne (sujet)",
      "value": "nom + <b>who / that</b> + verbe : <em>the man who called</em>"
    },
    {
      "label": "Chose (sujet)",
      "value": "nom + <b>which / that</b> + verbe : <em>the bus which goes to the centre</em>"
    },
    {
      "label": "Complément (pronom facultatif)",
      "value": "nom + (<b>that / who / which</b>) + sujet + verbe : <em>the book (that) I read</em>"
    },
    {
      "label": "Possession, lieu",
      "value": "nom + <b>whose</b> + nom : <em>the boy whose dog...</em> · nom + <b>where</b> + phrase"
    }
  ],
  "uses": [
    {
      "title": "Identifier une personne",
      "desc": "Who ou that, quand la relative dit de qui on parle.",
      "en": "The woman who works in the library is my aunt.",
      "fr": "La femme qui travaille à la bibliothèque est ma tante."
    },
    {
      "title": "Identifier une chose",
      "desc": "Which ou that pour les objets, les idées, les animaux.",
      "en": "I lost the ring that my grandmother gave me.",
      "fr": "J'ai perdu la bague que ma grand-mère m'avait donnée."
    },
    {
      "title": "Supprimer le pronom complément",
      "desc": "Quand un nouveau sujet suit le nom, le pronom est facultatif.",
      "en": "Is this the song you were talking about?",
      "fr": "C'est la chanson dont tu parlais ?"
    },
    {
      "title": "Possession et lieu",
      "desc": "Whose = dont + nom ; where = où (pour un lieu).",
      "en": "That's the restaurant where we had our first date.",
      "fr": "C'est le restaurant où on a eu notre premier rendez-vous."
    }
  ],
  "examples": [
    {
      "en": "I have a friend who speaks five languages.",
      "fr": "J'ai un ami qui parle cinq langues.",
      "note": ""
    },
    {
      "en": "The laptop which I bought last month has already broken.",
      "fr": "L'ordinateur que j'ai acheté le mois dernier est déjà cassé.",
      "note": ""
    },
    {
      "en": "The people we met on holiday were really friendly.",
      "fr": "Les gens que nous avons rencontrés en vacances étaient très sympas.",
      "note": "Pronom supprimé : il est complément."
    },
    {
      "en": "She's the teacher whose classes everyone loves.",
      "fr": "C'est la prof dont tout le monde adore les cours.",
      "note": ""
    },
    {
      "en": "This is the town where I was born.",
      "fr": "C'est la ville où je suis né.",
      "note": ""
    },
    {
      "en": "What I need is a long holiday.",
      "fr": "Ce dont j'ai besoin, ce sont de longues vacances.",
      "note": ""
    },
    {
      "en": "The guy I was sitting next to snored all the way.",
      "fr": "Le type à côté de qui j'étais assis a ronflé tout le trajet.",
      "note": "Préposition à la fin."
    },
    {
      "en": "Do you know anyone who can fix a bike?",
      "fr": "Tu connais quelqu'un qui sait réparer un vélo ?",
      "note": ""
    },
    {
      "en": "Everything that he said was true.",
      "fr": "Tout ce qu'il a dit était vrai.",
      "note": "Après everything, all, nothing : that, pas which."
    },
    {
      "en": "The dog that bit me belongs to my neighbour.",
      "fr": "Le chien qui m'a mordu appartient à mon voisin.",
      "note": ""
    }
  ],
  "table": null,
  "compare": {
    "title": "Pronom obligatoire ou facultatif ?",
    "a": {
      "label": "Le pronom est sujet (« qui »)",
      "points": [
        "Obligatoire.",
        "The girl who sings in the band...",
        "The train that leaves at 8..."
      ]
    },
    "b": {
      "label": "Le pronom est complément (« que »)",
      "points": [
        "Facultatif, souvent supprimé à l'oral.",
        "The girl (who) I met at the party...",
        "The train (that) I took..."
      ]
    }
  },
  "errors": [
    {
      "bad": "The man which lives here is a doctor.",
      "good": "The man who lives here is a doctor.",
      "why": "Which est réservé aux choses et aux animaux. Pour une personne : who ou that."
    },
    {
      "bad": "This is the film that I told you about it.",
      "good": "This is the film that I told you about.",
      "why": "Le pronom relatif remplace déjà l'objet : ne répète pas it, him ou them à la fin."
    },
    {
      "bad": "The girl that her mother is a pilot.",
      "good": "The girl whose mother is a pilot.",
      "why": "« Dont » + possession se traduit par whose, suivi directement du nom."
    },
    {
      "bad": "I don't understand that you say.",
      "good": "I don't understand what you say.",
      "why": "« Ce que » se dit what, pas that ni which."
    }
  ],
  "tip": "Pour savoir si tu peux supprimer le pronom, regarde ce qui le suit : s'il y a un nouveau sujet (I, she, the teacher...), tu peux l'enlever. S'il y a directement un verbe, garde-le.",
  "exercises": [
    {
      "type": "mcq",
      "q": "The girl ___ won the race is in my class.",
      "options": [
        "which",
        "who",
        "whose",
        "where"
      ],
      "answer": 1,
      "why": "Une personne, pronom sujet : who (ou that)."
    },
    {
      "type": "mcq",
      "q": "That's the man ___ car was stolen.",
      "options": [
        "who",
        "which",
        "whose"
      ],
      "answer": 2,
      "why": "Possession (sa voiture) : whose + nom."
    },
    {
      "type": "type",
      "q": "This is the house ___ my grandparents lived. (où)",
      "answer": [
        "where",
        "in which"
      ],
      "why": "Un lieu : where (ou in which, plus formel)."
    },
    {
      "type": "type",
      "q": "I didn't understand ___ the teacher said. (ce que)",
      "answer": [
        "what"
      ],
      "why": "« Ce que » = what."
    },
    {
      "type": "order",
      "words": [
        "you",
        "the",
        "is",
        "this",
        "recommended",
        "book"
      ],
      "answer": "This is the book you recommended",
      "fr": "C'est le livre que tu as recommandé.",
      "why": "Pronom complément supprimé : the book (that) you recommended."
    },
    {
      "type": "mcq",
      "q": "Is that the guy you were talking ___?",
      "options": [
        "to",
        "to him",
        "whom"
      ],
      "answer": 0,
      "why": "La préposition se place à la fin, sans répéter le pronom."
    }
  ],
  "cards": [
    {
      "fr": "J'ai une sœur qui habite au Canada.",
      "en": "I have a sister who lives in Canada."
    },
    {
      "fr": "Le film qu'on a vu hier était génial.",
      "en": "The film we saw yesterday was great."
    },
    {
      "fr": "C'est le garçon dont le père est pompier.",
      "en": "That's the boy whose father is a firefighter."
    },
    {
      "fr": "Ce que je préfère, c'est le week-end.",
      "en": "What I like most is the weekend."
    },
    {
      "fr": "C'est le café où on se retrouve le samedi.",
      "en": "That's the café where we meet on Saturdays."
    }
  ]
});

window.HUB.lessons.push({
  "id": "b1-reported-speech",
  "level": "B1",
  "module": "Structure de phrase",
  "title": "Reported speech",
  "fr": "Le discours indirect",
  "murphy": "Unité 50",
  "minutes": 18,
  "goal": "Rapporter ce que quelqu'un a dit, demandé ou ordonné.",
  "intro": [
    "Le discours indirect sert à rapporter ce que quelqu'un a dit sans le citer mot pour mot : <em>“I'm tired.”</em> devient <em>She said (that) she was tired</em>. Le mot <em>that</em> est facultatif.",
    "<b>Say</b> ou <b>tell</b> ? <em>Tell</em> est toujours suivi de la personne à qui on parle : <em>She told me</em>, <em>He told his parents</em>. <em>Say</em> s'emploie sans la personne, ou avec <em>to</em> : <em>She said (to me)</em>. On ne dit jamais <em>She said me</em>.",
    "Quand le verbe introducteur est au passé (said, told), les temps reculent d'un cran : le présent devient passé, le passé devient past perfect, <em>will</em> devient <em>would</em>, <em>can</em> devient <em>could</em>. Les repères de temps changent aussi : <em>tomorrow</em> devient <em>the next day</em>, <em>here</em> devient <em>there</em>.",
    "Pour les questions, on garde l'ordre d'une affirmation (sujet + verbe) et on enlève <em>do / did</em> : <em>He asked where I lived</em>. Pour une question fermée : <em>if</em> ou <em>whether</em>. Pour un ordre : <em>tell / ask someone (not) to</em> + base verbale. Si ce qui est dit est toujours vrai, on peut ne pas reculer les temps."
  ],
  "formulas": [
    {
      "label": "Affirmation",
      "value": "sujet + <b>said (that)</b> / <b>told</b> + personne + (that) + phrase reculée"
    },
    {
      "label": "Question ouverte",
      "value": "sujet + <b>asked</b> + mot interrogatif + sujet + verbe"
    },
    {
      "label": "Question fermée",
      "value": "sujet + <b>asked if / whether</b> + sujet + verbe"
    },
    {
      "label": "Ordre, demande",
      "value": "sujet + <b>told / asked</b> + personne + <b>(not) to</b> + base verbale"
    }
  ],
  "uses": [
    {
      "title": "Rapporter une affirmation",
      "desc": "Les temps reculent quand say ou tell sont au passé.",
      "en": "“I love this song.” → She said she loved that song.",
      "fr": "Elle a dit qu'elle adorait cette chanson."
    },
    {
      "title": "Rapporter une question",
      "desc": "Ordre sujet + verbe, pas de do / did, pas de point d'interrogation.",
      "en": "“Where do you live?” → He asked me where I lived.",
      "fr": "Il m'a demandé où j'habitais."
    },
    {
      "title": "Rapporter un ordre ou une demande",
      "desc": "Tell ou ask + personne + to + base verbale.",
      "en": "“Don't be late!” → My mum told me not to be late.",
      "fr": "Ma mère m'a dit de ne pas être en retard."
    },
    {
      "title": "Quand on ne recule pas",
      "desc": "Fait toujours vrai, ou verbe introducteur au présent.",
      "en": "He says he's coming tonight.",
      "fr": "Il dit qu'il vient ce soir."
    }
  ],
  "examples": [
    {
      "en": "She said she was hungry.",
      "fr": "Elle a dit qu'elle avait faim.",
      "note": ""
    },
    {
      "en": "Tom told me he had lost his keys.",
      "fr": "Tom m'a dit qu'il avait perdu ses clés.",
      "note": ""
    },
    {
      "en": "They said they would call us later.",
      "fr": "Ils ont dit qu'ils nous appelleraient plus tard.",
      "note": ""
    },
    {
      "en": "My friend asked if I wanted to go to the cinema.",
      "fr": "Mon ami m'a demandé si je voulais aller au cinéma.",
      "note": ""
    },
    {
      "en": "The teacher asked us what we had done at the weekend.",
      "fr": "Le prof nous a demandé ce que nous avions fait le week-end.",
      "note": ""
    },
    {
      "en": "He told me not to tell anyone.",
      "fr": "Il m'a dit de ne le dire à personne.",
      "note": ""
    },
    {
      "en": "She asked me to help her with her homework.",
      "fr": "Elle m'a demandé de l'aider pour ses devoirs.",
      "note": ""
    },
    {
      "en": "He said he could come the next day.",
      "fr": "Il a dit qu'il pourrait venir le lendemain.",
      "note": "Tomorrow devient the next day."
    },
    {
      "en": "Our teacher told us that the Earth goes round the Sun.",
      "fr": "Notre prof nous a dit que la Terre tourne autour du Soleil.",
      "note": "Vérité générale : pas de recul obligatoire."
    },
    {
      "en": "I wondered whether she had received my message.",
      "fr": "Je me demandais si elle avait reçu mon message.",
      "note": ""
    }
  ],
  "table": {
    "caption": "Le recul des temps (backshift)",
    "head": [
      "Discours direct",
      "Discours indirect"
    ],
    "rows": [
      [
        "Présent simple : “I work.”",
        "Past simple : he said he worked."
      ],
      [
        "Présent continu : “I'm working.”",
        "Past continuous : he said he was working."
      ],
      [
        "Past simple : “I worked.”",
        "Past perfect : he said he had worked."
      ],
      [
        "Present perfect : “I've worked.”",
        "Past perfect : he said he had worked."
      ],
      [
        "will : “I'll work.”",
        "would : he said he would work."
      ],
      [
        "can : “I can work.”",
        "could : he said he could work."
      ],
      [
        "must : “I must work.”",
        "had to : he said he had to work."
      ],
      [
        "today / tomorrow / here",
        "that day / the next day / there"
      ]
    ]
  },
  "compare": null,
  "errors": [
    {
      "bad": "She said me that she was tired.",
      "good": "She told me that she was tired.",
      "why": "Avec la personne, utilise tell : tell someone. Say s'emploie sans la personne."
    },
    {
      "bad": "He asked me where did I live.",
      "good": "He asked me where I lived.",
      "why": "Au discours indirect, la question prend l'ordre d'une affirmation, sans do / did."
    },
    {
      "bad": "She told me to not worry.",
      "good": "She told me not to worry.",
      "why": "La négation se place avant to : not to + base verbale."
    },
    {
      "bad": "He asked me do I like jazz.",
      "good": "He asked me if I liked jazz.",
      "why": "Question fermée : if ou whether + sujet + verbe."
    }
  ],
  "tip": "Pense à une machine à remonter le temps : chaque verbe recule d'une case (présent vers passé, passé vers past perfect, will vers would). Et retiens : on <em>tell</em> quelqu'un, on <em>say</em> quelque chose.",
  "exercises": [
    {
      "type": "mcq",
      "q": "She ___ me she was leaving.",
      "options": [
        "said",
        "told",
        "asked"
      ],
      "answer": 1,
      "why": "Suivi de la personne (me) : told."
    },
    {
      "type": "mcq",
      "q": "He asked me where ___.",
      "options": [
        "did I live",
        "I lived",
        "do I live"
      ],
      "answer": 1,
      "why": "Question rapportée : ordre sujet + verbe, sans did."
    },
    {
      "type": "type",
      "q": "“I'm busy.” → She said she ___ (be) busy.",
      "answer": [
        "was"
      ],
      "why": "Le présent recule au passé : am devient was."
    },
    {
      "type": "type",
      "q": "“Close the door.” → The teacher told us ___ (close) the door.",
      "answer": [
        "to close"
      ],
      "why": "Ordre rapporté : told + personne + to + base verbale."
    },
    {
      "type": "order",
      "words": [
        "if",
        "wanted",
        "she",
        "I",
        "asked",
        "to",
        "come"
      ],
      "answer": "She asked if I wanted to come",
      "fr": "Elle m'a demandé si je voulais venir.",
      "why": "Question fermée : asked if + sujet + verbe."
    },
    {
      "type": "mcq",
      "q": "“I will help you.” → He said he ___ help me.",
      "options": [
        "will",
        "would",
        "can"
      ],
      "answer": 1,
      "why": "Will recule en would."
    }
  ],
  "cards": [
    {
      "fr": "Il m'a dit qu'il était malade.",
      "en": "He told me he was ill."
    },
    {
      "fr": "Elle m'a demandé où j'habitais.",
      "en": "She asked me where I lived."
    },
    {
      "fr": "Le prof nous a dit de ne pas parler.",
      "en": "The teacher told us not to talk."
    },
    {
      "fr": "Ils ont dit qu'ils viendraient le lendemain.",
      "en": "They said they would come the next day."
    },
    {
      "fr": "Je lui ai demandé s'il aimait le jazz.",
      "en": "I asked him if he liked jazz."
    }
  ]
});

window.HUB.lessons.push({
  "id": "b1-question-tags",
  "level": "B1",
  "module": "Structure de phrase",
  "title": "Question tags and indirect questions",
  "fr": "Question tags et questions indirectes",
  "murphy": "Unités 41, 49",
  "minutes": 14,
  "goal": "Vérifier une information avec un question tag et poser des questions polies.",
  "intro": [
    "Un <em>question tag</em> est une petite question ajoutée à la fin d'une phrase, comme « n'est-ce pas ? » ou « hein ? » en français : <em>It's cold, isn't it?</em> Les anglophones l'utilisent sans arrêt pour vérifier une information ou relancer la conversation.",
    "La règle : on reprend l'<b>auxiliaire</b> de la phrase (be, have, do, can, will...) et on inverse le sens. Phrase positive : tag négatif (<em>You're French, aren't you?</em>). Phrase négative : tag positif (<em>You aren't French, are you?</em>). S'il n'y a pas d'auxiliaire (présent ou past simple), on utilise <em>do / does / did</em> : <em>She lives here, doesn't she?</em>",
    "L'intonation change le sens : si ta voix <b>descend</b>, tu es presque sûr et tu attends un accord ; si elle <b>monte</b>, c'est une vraie question. Quelques cas spéciaux : <em>I'm late, aren't I?</em> · <em>Let's go, shall we?</em> · <em>Close the door, will you?</em>",
    "Les <b>questions indirectes</b> rendent une question plus polie : <em>Could you tell me where the station is?</em> Après l'introduction, on garde l'ordre d'une affirmation (sujet + verbe) et on supprime <em>do / did</em>."
  ],
  "formulas": [
    {
      "label": "Positif + tag négatif",
      "value": "<em>You <b>are</b> tired, <b>aren't</b> you?</em>"
    },
    {
      "label": "Négatif + tag positif",
      "value": "<em>She <b>can't</b> swim, <b>can</b> she?</em>"
    },
    {
      "label": "Sans auxiliaire",
      "value": "<em>He <b>plays</b> tennis, <b>doesn't</b> he?</em> · <em>You <b>saw</b> it, <b>didn't</b> you?</em>"
    },
    {
      "label": "Question indirecte",
      "value": "<b>Could you tell me / Do you know</b> + mot interrogatif + sujet + verbe ?"
    }
  ],
  "uses": [
    {
      "title": "Demander confirmation",
      "desc": "Intonation descendante : tu penses connaître la réponse.",
      "en": "You've met my brother, haven't you?",
      "fr": "Tu as déjà rencontré mon frère, non ?"
    },
    {
      "title": "Vraie question",
      "desc": "Intonation montante : tu n'es pas sûr.",
      "en": "The shop doesn't open on Sundays, does it?",
      "fr": "Le magasin n'ouvre pas le dimanche, si ?"
    },
    {
      "title": "Faire la conversation",
      "desc": "Pour engager l'échange avec quelqu'un, souvent sur la météo.",
      "en": "Lovely weather today, isn't it?",
      "fr": "Il fait super beau aujourd'hui, hein ?"
    },
    {
      "title": "Demander poliment",
      "desc": "Question indirecte avec Could you tell me ou Do you know.",
      "en": "Do you know what time the museum closes?",
      "fr": "Vous savez à quelle heure ferme le musée ?"
    }
  ],
  "examples": [
    {
      "en": "It's a beautiful day, isn't it?",
      "fr": "Il fait beau, n'est-ce pas ?",
      "note": ""
    },
    {
      "en": "You don't eat meat, do you?",
      "fr": "Tu ne manges pas de viande, c'est ça ?",
      "note": ""
    },
    {
      "en": "She's been to Japan, hasn't she?",
      "fr": "Elle est déjà allée au Japon, non ?",
      "note": ""
    },
    {
      "en": "They won the match, didn't they?",
      "fr": "Ils ont gagné le match, non ?",
      "note": ""
    },
    {
      "en": "You can drive, can't you?",
      "fr": "Tu sais conduire, hein ?",
      "note": ""
    },
    {
      "en": "I'm right, aren't I?",
      "fr": "J'ai raison, non ?",
      "note": "I'm ..., aren't I ? (amn't I n'existe pas en anglais standard)."
    },
    {
      "en": "Let's order a pizza, shall we?",
      "fr": "On commande une pizza ?",
      "note": ""
    },
    {
      "en": "Pass me the salt, will you?",
      "fr": "Tu peux me passer le sel ?",
      "note": ""
    },
    {
      "en": "Could you tell me where the toilets are?",
      "fr": "Pourriez-vous me dire où sont les toilettes ?",
      "note": ""
    },
    {
      "en": "I wonder if you could help me.",
      "fr": "Je me demande si vous pourriez m'aider.",
      "note": ""
    }
  ],
  "table": null,
  "compare": null,
  "errors": [
    {
      "bad": "You like pizza, isn't it?",
      "good": "You like pizza, don't you?",
      "why": "Contrairement à « n'est-ce pas », le tag change selon la phrase. Ici, pas d'auxiliaire au présent simple : don't you."
    },
    {
      "bad": "She is nice, isn't it?",
      "good": "She is nice, isn't she?",
      "why": "Le tag reprend le sujet sous forme de pronom : she, pas it."
    },
    {
      "bad": "Can you tell me where is the bank?",
      "good": "Can you tell me where the bank is?",
      "why": "Dans une question indirecte, le verbe revient après le sujet."
    },
    {
      "bad": "Do you know what time does the film start?",
      "good": "Do you know what time the film starts?",
      "why": "Pas de do / does dans la partie indirecte : ordre affirmatif et -s au verbe."
    }
  ],
  "tip": "Pour former un tag, cherche le premier auxiliaire de la phrase et inverse-le. Pas d'auxiliaire visible ? Il est caché : <em>do</em>, <em>does</em> ou <em>did</em>.",
  "exercises": [
    {
      "type": "mcq",
      "q": "You're coming to the party, ___?",
      "options": [
        "isn't it",
        "aren't you",
        "don't you"
      ],
      "answer": 1,
      "why": "Auxiliaire are, phrase positive : tag négatif aren't you."
    },
    {
      "type": "mcq",
      "q": "He didn't call you, ___?",
      "options": [
        "did he",
        "didn't he",
        "does he"
      ],
      "answer": 0,
      "why": "Phrase négative au passé : tag positif did he."
    },
    {
      "type": "type",
      "q": "She works in a hospital, ___ she?",
      "answer": [
        "doesn't"
      ],
      "why": "Présent simple sans auxiliaire avec she : doesn't."
    },
    {
      "type": "type",
      "q": "Let's go to the beach, ___ we?",
      "answer": [
        "shall"
      ],
      "why": "Après Let's, le tag est toujours shall we."
    },
    {
      "type": "order",
      "words": [
        "the",
        "you",
        "station",
        "could",
        "where",
        "me",
        "is",
        "tell"
      ],
      "answer": "Could you tell me where the station is",
      "fr": "Pourriez-vous me dire où est la gare ?",
      "why": "Question indirecte : le sujet (the station) vient avant le verbe (is)."
    },
    {
      "type": "mcq",
      "q": "I'm late, ___?",
      "options": [
        "amn't I",
        "aren't I",
        "isn't it"
      ],
      "answer": 1,
      "why": "Cas spécial : I'm ..., aren't I ?"
    }
  ],
  "cards": [
    {
      "fr": "Il fait froid, hein ?",
      "en": "It's cold, isn't it?"
    },
    {
      "fr": "Tu n'aimes pas le café, si ?",
      "en": "You don't like coffee, do you?"
    },
    {
      "fr": "Tu as vu ce film, non ?",
      "en": "You've seen this film, haven't you?"
    },
    {
      "fr": "Pourriez-vous me dire où se trouve la poste ?",
      "en": "Could you tell me where the post office is?"
    },
    {
      "fr": "Tu sais à quelle heure part le train ?",
      "en": "Do you know what time the train leaves?"
    }
  ]
});

window.HUB.lessons.push({
  "id": "b1-gerund-infinitive",
  "level": "B1",
  "module": "Verbes et constructions",
  "title": "-ing or to + infinitive",
  "fr": "Gérondif ou infinitif",
  "murphy": "Unités 51–54",
  "minutes": 18,
  "goal": "Choisir entre -ing et to après un verbe ou une préposition.",
  "intro": [
    "Quand deux verbes se suivent en anglais, le second prend soit la forme <b>-ing</b> (<em>I enjoy swimming</em>), soit la forme <b>to + base verbale</b> (<em>I want to swim</em>). Le choix dépend du <b>premier verbe</b> : il faut apprendre les verbes par groupes, comme des expressions.",
    "En gros, beaucoup de verbes tournés vers l'avenir, une intention ou une décision prennent <em>to</em> : <em>want, hope, plan, decide, promise, refuse, manage, learn</em>. Les verbes d'appréciation ou d'action déjà en cours prennent souvent <em>-ing</em> : <em>enjoy, mind, finish, avoid, suggest, can't stand, keep</em>.",
    "Deux règles sûres : après une <b>préposition</b> (in, at, of, about, without, before, after), on met toujours <em>-ing</em> : <em>I'm good at drawing</em>, <em>without saying goodbye</em>. Et pour exprimer le <b>but</b> (pour), on utilise <em>to</em> : <em>I went out to buy some bread</em>.",
    "Avec une personne : <em>want / ask / tell / expect someone to do</em> : <em>I want you to listen</em> (et non <em>I want that you listen</em>). Enfin, <em>like</em> + <em>-ing</em> parle d'un goût général, mais <em>would like</em> + <em>to</em> exprime un souhait précis."
  ],
  "formulas": [
    {
      "label": "Verbe + -ing",
      "value": "<b>enjoy / finish / avoid / mind / suggest</b> + verbe-<b>ing</b>"
    },
    {
      "label": "Verbe + to",
      "value": "<b>want / decide / hope / plan / manage</b> + <b>to</b> + base verbale"
    },
    {
      "label": "Verbe + personne + to",
      "value": "<b>want / ask / tell</b> + personne + <b>to</b> + base verbale"
    },
    {
      "label": "Préposition + -ing",
      "value": "<b>at / in / of / about / without / before / after</b> + verbe-<b>ing</b>"
    }
  ],
  "uses": [
    {
      "title": "Verbes suivis de -ing",
      "desc": "Goûts, habitudes, actions qu'on évite ou qu'on termine.",
      "en": "I've finished doing my homework.",
      "fr": "J'ai fini de faire mes devoirs."
    },
    {
      "title": "Verbes suivis de to",
      "desc": "Intentions, décisions, projets, efforts.",
      "en": "We've decided to move to Bordeaux.",
      "fr": "Nous avons décidé de déménager à Bordeaux."
    },
    {
      "title": "Après une préposition",
      "desc": "Toujours -ing, jamais to ni la base verbale.",
      "en": "Thanks for helping me.",
      "fr": "Merci de m'avoir aidé."
    },
    {
      "title": "Exprimer le but",
      "desc": "To + base verbale = pour, afin de.",
      "en": "I'm saving money to buy a scooter.",
      "fr": "J'économise pour acheter un scooter."
    }
  ],
  "examples": [
    {
      "en": "Do you mind waiting a few minutes?",
      "fr": "Ça te dérange d'attendre quelques minutes ?",
      "note": ""
    },
    {
      "en": "She refused to answer my question.",
      "fr": "Elle a refusé de répondre à ma question.",
      "note": ""
    },
    {
      "en": "I can't stand getting up early on Sundays.",
      "fr": "Je ne supporte pas de me lever tôt le dimanche.",
      "note": ""
    },
    {
      "en": "He managed to finish the race despite the rain.",
      "fr": "Il a réussi à finir la course malgré la pluie.",
      "note": ""
    },
    {
      "en": "My parents want me to study medicine.",
      "fr": "Mes parents veulent que je fasse médecine.",
      "note": ""
    },
    {
      "en": "I'm thinking about changing my phone.",
      "fr": "Je pense à changer de téléphone.",
      "note": ""
    },
    {
      "en": "He left without saying goodbye.",
      "fr": "Il est parti sans dire au revoir.",
      "note": ""
    },
    {
      "en": "I went to the library to borrow some books.",
      "fr": "Je suis allé à la bibliothèque pour emprunter des livres.",
      "note": ""
    },
    {
      "en": "I like cooking, but today I'd like to eat out.",
      "fr": "J'aime cuisiner, mais aujourd'hui j'aimerais manger au restaurant.",
      "note": "Like + -ing (en général), would like + to (souhait précis)."
    },
    {
      "en": "She suggested going to the museum.",
      "fr": "Elle a proposé d'aller au musée.",
      "note": ""
    }
  ],
  "table": {
    "caption": "Les verbes les plus courants par construction",
    "head": [
      "Verbe + -ing",
      "Verbe + to",
      "Verbe + personne + to"
    ],
    "rows": [
      [
        "enjoy (aimer, apprécier)",
        "want (vouloir)",
        "want someone to"
      ],
      [
        "finish (finir de)",
        "decide (décider de)",
        "ask someone to"
      ],
      [
        "avoid (éviter de)",
        "hope (espérer)",
        "tell someone to"
      ],
      [
        "mind (être gêné de)",
        "plan (prévoir de)",
        "expect someone to"
      ],
      [
        "suggest (proposer de)",
        "promise (promettre de)",
        "allow someone to"
      ],
      [
        "can't stand (ne pas supporter)",
        "refuse (refuser de)",
        "advise someone to"
      ],
      [
        "keep (continuer à)",
        "manage (réussir à)",
        "encourage someone to"
      ],
      [
        "imagine (imaginer)",
        "learn (apprendre à)",
        "teach someone to"
      ]
    ]
  },
  "compare": null,
  "errors": [
    {
      "bad": "I want that you come with me.",
      "good": "I want you to come with me.",
      "why": "Want ne se construit jamais avec that : want + personne + to + base verbale."
    },
    {
      "bad": "I'm interested in learn Japanese.",
      "good": "I'm interested in learning Japanese.",
      "why": "Après une préposition (in), le verbe prend -ing."
    },
    {
      "bad": "I went to the shop for buy milk.",
      "good": "I went to the shop to buy milk.",
      "why": "Pour exprimer le but, utilise to + base verbale, pas for."
    },
    {
      "bad": "I enjoy to play the guitar.",
      "good": "I enjoy playing the guitar.",
      "why": "Enjoy est toujours suivi de -ing."
    }
  ],
  "tip": "Apprends chaque verbe avec sa suite, comme un bloc : « enjoy doing », « decide to do », « want someone to do ». Et une règle d'or : après une préposition, c'est toujours <em>-ing</em>.",
  "exercises": [
    {
      "type": "mcq",
      "q": "I really enjoy ___ in the sea.",
      "options": [
        "swim",
        "to swim",
        "swimming"
      ],
      "answer": 2,
      "why": "Enjoy + -ing."
    },
    {
      "type": "mcq",
      "q": "They've decided ___ a new car.",
      "options": [
        "buying",
        "to buy",
        "buy"
      ],
      "answer": 1,
      "why": "Decide + to + base verbale."
    },
    {
      "type": "type",
      "q": "Would you mind ___ (open) the window?",
      "answer": [
        "opening"
      ],
      "why": "Mind + -ing."
    },
    {
      "type": "type",
      "q": "She's very good at ___ (draw).",
      "answer": [
        "drawing"
      ],
      "why": "Après la préposition at : -ing."
    },
    {
      "type": "order",
      "words": [
        "me",
        "my",
        "to",
        "want",
        "help",
        "parents",
        "them"
      ],
      "answer": "My parents want me to help them",
      "fr": "Mes parents veulent que je les aide.",
      "why": "Want + personne + to + base verbale."
    },
    {
      "type": "mcq",
      "q": "I called her ___ her a happy birthday.",
      "options": [
        "for wishing",
        "to wish",
        "for wish"
      ],
      "answer": 1,
      "why": "But (pour) : to + base verbale."
    }
  ],
  "cards": [
    {
      "fr": "J'évite de boire du café le soir.",
      "en": "I avoid drinking coffee in the evening."
    },
    {
      "fr": "Il a promis de m'appeler.",
      "en": "He promised to call me."
    },
    {
      "fr": "Je veux que tu m'écoutes.",
      "en": "I want you to listen to me."
    },
    {
      "fr": "Merci d'être venu.",
      "en": "Thanks for coming."
    },
    {
      "fr": "Elle apprend l'espagnol pour voyager en Amérique du Sud.",
      "en": "She's learning Spanish to travel in South America."
    }
  ]
});

window.HUB.lessons.push({
  "id": "b1-verb-preposition",
  "level": "B1",
  "module": "Verbes et constructions",
  "title": "Verbs and adjectives + prepositions",
  "fr": "Verbes et adjectifs + préposition",
  "murphy": "Unités 112–113",
  "minutes": 15,
  "goal": "Utiliser les bonnes prépositions après les verbes et les adjectifs courants.",
  "intro": [
    "En anglais, beaucoup de verbes et d'adjectifs sont suivis d'une <b>préposition fixe</b>, qu'il faut apprendre avec le mot : <em>listen to</em>, <em>wait for</em>, <em>good at</em>, <em>afraid of</em>. Souvent, ce n'est pas celle qu'on attendrait en traduisant du français.",
    "Plusieurs verbes prennent une préposition en anglais mais pas en français : <em>wait for</em> (attendre), <em>listen to</em> (écouter), <em>look at</em> (regarder), <em>look for</em> (chercher), <em>pay for</em> (payer quelque chose), <em>ask for</em> (demander quelque chose). À l'inverse, certains n'en prennent pas alors que le français en a une : <em>enter a room</em> (entrer dans), <em>answer a question</em> (répondre à), <em>phone someone</em> (téléphoner à).",
    "Pour les adjectifs, retiens des familles : les émotions (<em>afraid of, scared of, proud of, tired of</em>), les compétences (<em>good at, bad at</em>), l'intérêt (<em>interested in</em>). Et si un verbe suit la préposition, il prend <em>-ing</em> : <em>I'm tired of waiting</em>."
  ],
  "formulas": [
    {
      "label": "Verbe + préposition",
      "value": "<b>listen to</b> / <b>wait for</b> / <b>depend on</b> + nom ou pronom"
    },
    {
      "label": "Adjectif + préposition",
      "value": "<b>be good at</b> / <b>afraid of</b> / <b>interested in</b> + nom"
    },
    {
      "label": "Préposition + verbe",
      "value": "adjectif ou verbe + préposition + verbe-<b>ing</b>"
    },
    {
      "label": "Question",
      "value": "Who are you <b>waiting for</b>? (préposition à la fin)"
    }
  ],
  "uses": [
    {
      "title": "Verbe + préposition obligatoire",
      "desc": "La préposition fait partie du verbe.",
      "en": "Can you wait for me outside?",
      "fr": "Tu peux m'attendre dehors ?"
    },
    {
      "title": "Adjectif + préposition",
      "desc": "Pour exprimer un sentiment, une compétence, un intérêt.",
      "en": "She's really interested in astronomy.",
      "fr": "Elle s'intéresse beaucoup à l'astronomie."
    },
    {
      "title": "Préposition suivie d'un verbe",
      "desc": "Le verbe prend -ing après la préposition.",
      "en": "I'm tired of hearing the same excuses.",
      "fr": "J'en ai assez d'entendre les mêmes excuses."
    },
    {
      "title": "Question avec préposition finale",
      "desc": "À l'oral, la préposition reste à la fin de la question.",
      "en": "What are you looking at?",
      "fr": "Qu'est-ce que tu regardes ?"
    }
  ],
  "examples": [
    {
      "en": "I'm listening to a podcast about history.",
      "fr": "J'écoute un podcast sur l'histoire.",
      "note": ""
    },
    {
      "en": "It depends on the weather.",
      "fr": "Ça dépend du temps.",
      "note": ""
    },
    {
      "en": "He's very good at maths but bad at sport.",
      "fr": "Il est très bon en maths mais nul en sport.",
      "note": ""
    },
    {
      "en": "Are you afraid of spiders?",
      "fr": "Tu as peur des araignées ?",
      "note": ""
    },
    {
      "en": "Who's going to look after the dog while we're away?",
      "fr": "Qui va s'occuper du chien pendant notre absence ?",
      "note": ""
    },
    {
      "en": "I'm looking for my glasses. Have you seen them?",
      "fr": "Je cherche mes lunettes. Tu les as vues ?",
      "note": ""
    },
    {
      "en": "She's married to a Scottish musician.",
      "fr": "Elle est mariée à un musicien écossais.",
      "note": "Married to, pas married with."
    },
    {
      "en": "Don't worry about the exam. You'll be fine.",
      "fr": "Ne t'inquiète pas pour l'examen. Ça va aller.",
      "note": ""
    },
    {
      "en": "I paid for the tickets online.",
      "fr": "J'ai payé les billets en ligne.",
      "note": ""
    },
    {
      "en": "We're proud of you for passing your driving test.",
      "fr": "On est fiers de toi parce que tu as eu ton permis.",
      "note": ""
    }
  ],
  "table": {
    "caption": "Prépositions à apprendre par cœur",
    "head": [
      "Anglais",
      "Français",
      "Piège"
    ],
    "rows": [
      [
        "wait for",
        "attendre",
        "pas de préposition en français"
      ],
      [
        "listen to",
        "écouter",
        "pas de préposition en français"
      ],
      [
        "look at / look for",
        "regarder / chercher",
        "look for = chercher"
      ],
      [
        "pay for something",
        "payer quelque chose",
        "mais pay the bill (sans for)"
      ],
      [
        "depend on",
        "dépendre de",
        "on, pas of"
      ],
      [
        "good at / bad at",
        "bon en / nul en",
        "at, pas in"
      ],
      [
        "interested in",
        "intéressé par",
        "in, pas by"
      ],
      [
        "afraid of",
        "avoir peur de",
        "be afraid, pas have fear"
      ],
      [
        "married to",
        "marié à",
        "to, pas with"
      ],
      [
        "enter / answer / phone",
        "entrer dans / répondre à / téléphoner à",
        "pas de préposition en anglais"
      ]
    ]
  },
  "compare": null,
  "errors": [
    {
      "bad": "I'm waiting the bus.",
      "good": "I'm waiting for the bus.",
      "why": "Wait se construit avec for : wait for something, wait for someone."
    },
    {
      "bad": "It depends of you.",
      "good": "It depends on you.",
      "why": "Depend est suivi de on, pas of."
    },
    {
      "bad": "She entered in the classroom.",
      "good": "She entered the classroom.",
      "why": "Enter n'a pas de préposition (ou alors on dit go into the classroom)."
    },
    {
      "bad": "I'm good in English.",
      "good": "I'm good at English.",
      "why": "Pour une compétence : good at, bad at."
    }
  ],
  "tip": "Ne traduis jamais une préposition mot à mot. Note chaque verbe ou adjectif avec sa préposition, dans une petite phrase : « wait for the bus », « good at sport ». C'est le bloc entier que ton cerveau doit retenir.",
  "exercises": [
    {
      "type": "mcq",
      "q": "I've been waiting ___ you for an hour!",
      "options": [
        "for",
        "to",
        "after"
      ],
      "answer": 0,
      "why": "Wait for = attendre."
    },
    {
      "type": "mcq",
      "q": "She's very interested ___ politics.",
      "options": [
        "by",
        "in",
        "for"
      ],
      "answer": 1,
      "why": "Interested in = intéressé par."
    },
    {
      "type": "type",
      "q": "What are you listening ___? It sounds great. (préposition)",
      "answer": [
        "to"
      ],
      "why": "Listen to = écouter."
    },
    {
      "type": "type",
      "q": "I'm tired of ___ (do) the same thing every day.",
      "answer": [
        "doing"
      ],
      "why": "Après la préposition of, le verbe prend -ing."
    },
    {
      "type": "order",
      "words": [
        "on",
        "it",
        "weather",
        "the",
        "depends"
      ],
      "answer": "It depends on the weather",
      "fr": "Ça dépend du temps.",
      "why": "Depend on + nom."
    },
    {
      "type": "mcq",
      "q": "Can you ___ my cat this weekend?",
      "options": [
        "look for",
        "look after",
        "look at"
      ],
      "answer": 1,
      "why": "Look after = s'occuper de."
    }
  ],
  "cards": [
    {
      "fr": "Qu'est-ce que tu cherches ?",
      "en": "What are you looking for?"
    },
    {
      "fr": "Elle a peur du noir.",
      "en": "She's afraid of the dark."
    },
    {
      "fr": "Je suis nul en dessin.",
      "en": "I'm bad at drawing."
    },
    {
      "fr": "Qui va payer le repas ?",
      "en": "Who's going to pay for the meal?"
    },
    {
      "fr": "Ça dépend de toi.",
      "en": "It depends on you."
    }
  ]
});
