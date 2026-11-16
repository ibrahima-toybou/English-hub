window.HUB = window.HUB || { lessons: [], vocab: [], extras: {} };
var HUB = window.HUB;

/* ============================== A2 ============================== */

HUB.vocab.push({
  id: "a2-voc-home", level: "A2",
  title: "La maison et le quotidien",
  en: "Home and daily life",
  words: [
    { en: "to wake up", fr: "se réveiller", pos: "verbe à particule", ex: "I wake up at 6:30 on school days.", exFr: "Je me réveille à 6h30 les jours d'école." },
    { en: "to get dressed", fr: "s'habiller", pos: "expression", ex: "She gets dressed quickly and leaves without breakfast.", exFr: "Elle s'habille vite et part sans prendre de petit-déjeuner." },
    { en: "to do the washing-up", fr: "faire la vaisselle", pos: "expression", ex: "It's your turn to do the washing-up tonight.", exFr: "C'est ton tour de faire la vaisselle ce soir." },
    { en: "to tidy (up)", fr: "ranger", pos: "verbe", ex: "Can you tidy your room before your grandparents arrive?", exFr: "Tu peux ranger ta chambre avant l'arrivée de tes grands-parents ?" },
    { en: "a flat", fr: "un appartement (US : an apartment)", pos: "nom", ex: "We live in a small flat on the third floor.", exFr: "Nous habitons un petit appartement au troisième étage." },
    { en: "the rent", fr: "le loyer", pos: "nom", ex: "The rent is due on the first of every month.", exFr: "Le loyer est à payer le premier de chaque mois." },
    { en: "a neighbour", fr: "un voisin, une voisine", pos: "nom", ex: "Our neighbours are very quiet and friendly.", exFr: "Nos voisins sont très calmes et sympathiques." },
    { en: "a chore", fr: "une tâche ménagère", pos: "nom", ex: "Cleaning the bathroom is my least favourite chore.", exFr: "Nettoyer la salle de bains est la tâche ménagère que j'aime le moins." },
    { en: "the washing machine", fr: "la machine à laver", pos: "nom", ex: "Don't forget to empty the washing machine.", exFr: "N'oublie pas de vider la machine à laver." },
    { en: "to take out the rubbish", fr: "sortir les poubelles (US : the trash)", pos: "expression", ex: "My dad takes out the rubbish every Tuesday evening.", exFr: "Mon père sort les poubelles tous les mardis soir." },
    { en: "to vacuum", fr: "passer l'aspirateur", pos: "verbe", ex: "I vacuum the living room on Saturdays.", exFr: "Je passe l'aspirateur dans le salon le samedi." },
    { en: "to lock", fr: "fermer à clé", pos: "verbe", ex: "Did you lock the front door?", exFr: "Tu as fermé la porte d'entrée à clé ?" },
    { en: "upstairs / downstairs", fr: "en haut, à l'étage / en bas", pos: "adverbe", ex: "The bathroom is upstairs, next to my bedroom.", exFr: "La salle de bains est en haut, à côté de ma chambre." },
    { en: "to be in a hurry", fr: "être pressé", pos: "expression", ex: "Sorry, I can't talk now, I'm in a hurry.", exFr: "Désolé, je ne peux pas parler maintenant, je suis pressé." }
  ]
});

HUB.vocab.push({
  id: "a2-voc-food", level: "A2",
  title: "Nourriture et restaurant",
  en: "Food and eating out",
  words: [
    { en: "to book a table", fr: "réserver une table", pos: "expression", ex: "I'd like to book a table for four at eight o'clock.", exFr: "Je voudrais réserver une table pour quatre à vingt heures." },
    { en: "the menu", fr: "la carte (au restaurant)", pos: "nom", ex: "Could we see the menu, please?", exFr: "Pourrions-nous voir la carte, s'il vous plaît ?" },
    { en: "a starter", fr: "une entrée (US : an appetizer)", pos: "nom", ex: "For a starter, I'll have the tomato soup.", exFr: "En entrée, je prendrai la soupe de tomates." },
    { en: "the main course", fr: "le plat principal", pos: "nom", ex: "The main course comes with chips or salad.", exFr: "Le plat principal est servi avec des frites ou de la salade." },
    { en: "the bill", fr: "l'addition (US : the check)", pos: "nom", ex: "Excuse me, can we have the bill, please?", exFr: "Excusez-moi, on peut avoir l'addition, s'il vous plaît ?" },
    { en: "a tip", fr: "un pourboire", pos: "nom", ex: "We left a ten percent tip because the service was great.", exFr: "Nous avons laissé dix pour cent de pourboire car le service était excellent." },
    { en: "to order", fr: "commander", pos: "verbe", ex: "Are you ready to order?", exFr: "Vous êtes prêts à commander ?" },
    { en: "spicy", fr: "épicé, pimenté", pos: "adjectif", ex: "This curry is too spicy for me.", exFr: "Ce curry est trop épicé pour moi." },
    { en: "tasty", fr: "savoureux, bon", pos: "adjectif", ex: "Your homemade pizza is really tasty!", exFr: "Ta pizza maison est vraiment bonne !" },
    { en: "to taste", fr: "goûter ; avoir le goût de", pos: "verbe", ex: "Taste this sauce and tell me if it needs more salt.", exFr: "Goûte cette sauce et dis-moi s'il faut plus de sel." },
    { en: "a vegetarian", fr: "un végétarien, une végétarienne", pos: "nom", ex: "Is there anything on the menu for vegetarians?", exFr: "Y a-t-il quelque chose sur la carte pour les végétariens ?" },
    { en: "to be starving", fr: "mourir de faim (familier)", pos: "expression", ex: "Let's eat now, I'm starving!", exFr: "Mangeons maintenant, je meurs de faim !" },
    { en: "a takeaway", fr: "un plat à emporter (US : takeout)", pos: "nom", ex: "We were too tired to cook, so we got a takeaway.", exFr: "Nous étions trop fatigués pour cuisiner, alors on a pris un plat à emporter." },
    { en: "to have a snack", fr: "grignoter, prendre un en-cas", pos: "expression", ex: "I usually have a snack after school.", exFr: "Je prends généralement un en-cas après l'école." }
  ]
});

HUB.vocab.push({
  id: "a2-voc-travel", level: "A2",
  title: "Voyages et transports",
  en: "Travel and transport",
  words: [
    { en: "a return ticket", fr: "un billet aller-retour (US : a round-trip ticket)", pos: "nom", ex: "A return ticket to London, please.", exFr: "Un aller-retour pour Londres, s'il vous plaît." },
    { en: "to catch (a bus, a train)", fr: "prendre, attraper (un bus, un train)", pos: "verbe", ex: "We have to hurry if we want to catch the 9:15 train.", exFr: "Il faut se dépêcher si on veut attraper le train de 9h15." },
    { en: "to miss", fr: "rater, manquer", pos: "verbe", ex: "I missed the bus and had to walk to school.", exFr: "J'ai raté le bus et j'ai dû aller à l'école à pied." },
    { en: "a platform", fr: "un quai (de gare)", pos: "nom", ex: "The train to Bristol leaves from platform 6.", exFr: "Le train pour Bristol part du quai 6." },
    { en: "delayed", fr: "retardé, en retard", pos: "adjectif", ex: "Our flight was delayed by two hours.", exFr: "Notre vol a été retardé de deux heures." },
    { en: "to check in", fr: "s'enregistrer (aéroport, hôtel)", pos: "verbe à particule", ex: "You must check in at least two hours before your flight.", exFr: "Tu dois t'enregistrer au moins deux heures avant ton vol." },
    { en: "luggage", fr: "les bagages (indénombrable)", pos: "nom", ex: "How much luggage are you taking?", exFr: "Combien de bagages emportes-tu ?" },
    { en: "a boarding pass", fr: "une carte d'embarquement", pos: "nom", ex: "Please have your passport and boarding pass ready.", exFr: "Veuillez préparer votre passeport et votre carte d'embarquement." },
    { en: "to get on / to get off", fr: "monter dans / descendre de (bus, train)", pos: "verbe à particule", ex: "Get off the bus at the third stop.", exFr: "Descends du bus au troisième arrêt." },
    { en: "a journey", fr: "un trajet, un voyage (faux ami : pas une journée)", pos: "nom", ex: "The journey from Paris to Lyon takes two hours by train.", exFr: "Le trajet de Paris à Lyon prend deux heures en train." },
    { en: "abroad", fr: "à l'étranger", pos: "adverbe", ex: "Have you ever travelled abroad on your own?", exFr: "As-tu déjà voyagé seul à l'étranger ?" },
    { en: "accommodation", fr: "l'hébergement, le logement", pos: "nom", ex: "We found cheap accommodation near the beach.", exFr: "Nous avons trouvé un hébergement bon marché près de la plage." },
    { en: "a traffic jam", fr: "un embouteillage", pos: "nom", ex: "We were stuck in a traffic jam for an hour.", exFr: "Nous sommes restés coincés dans un embouteillage pendant une heure." },
    { en: "sightseeing", fr: "la visite des sites touristiques", pos: "nom", ex: "We spent the afternoon sightseeing in Rome.", exFr: "Nous avons passé l'après-midi à visiter Rome." }
  ]
});

HUB.vocab.push({
  id: "a2-voc-school-work", level: "A2",
  title: "École et travail",
  en: "School and work",
  words: [
    { en: "a timetable", fr: "un emploi du temps (US : a schedule)", pos: "nom", ex: "According to my timetable, I have maths at nine.", exFr: "D'après mon emploi du temps, j'ai maths à neuf heures." },
    { en: "homework", fr: "les devoirs (indénombrable)", pos: "nom", ex: "I have a lot of homework this weekend.", exFr: "J'ai beaucoup de devoirs ce week-end." },
    { en: "to revise", fr: "réviser (US : to review)", pos: "verbe", ex: "I need to revise for my history test.", exFr: "Je dois réviser pour mon contrôle d'histoire." },
    { en: "to pass an exam", fr: "réussir un examen (pas « passer »)", pos: "expression", ex: "She was so happy when she passed her driving test.", exFr: "Elle était si contente quand elle a réussi son permis." },
    { en: "to fail", fr: "échouer à, rater", pos: "verbe", ex: "If you don't work, you'll fail the exam.", exFr: "Si tu ne travailles pas, tu vas rater l'examen." },
    { en: "a mark", fr: "une note (US : a grade)", pos: "nom", ex: "I got a good mark in English.", exFr: "J'ai eu une bonne note en anglais." },
    { en: "to take notes", fr: "prendre des notes", pos: "expression", ex: "Take notes during the lesson, it really helps.", exFr: "Prends des notes pendant le cours, ça aide vraiment." },
    { en: "a part-time job", fr: "un petit boulot, un emploi à temps partiel", pos: "nom", ex: "He has a part-time job in a café on Saturdays.", exFr: "Il a un petit boulot dans un café le samedi." },
    { en: "a colleague", fr: "un ou une collègue", pos: "nom", ex: "My colleagues are very helpful.", exFr: "Mes collègues sont très serviables." },
    { en: "to earn", fr: "gagner (de l'argent en travaillant)", pos: "verbe", ex: "How much do you earn per hour?", exFr: "Combien gagnes-tu de l'heure ?" },
    { en: "a boss", fr: "un ou une chef, un patron", pos: "nom", ex: "My boss lets me leave early on Fridays.", exFr: "Ma cheffe me laisse partir tôt le vendredi." },
    { en: "to apply for", fr: "postuler à, poser sa candidature pour", pos: "verbe à particule", ex: "I'm going to apply for a summer job at the supermarket.", exFr: "Je vais postuler pour un job d'été au supermarché." },
    { en: "a meeting", fr: "une réunion", pos: "nom", ex: "The meeting starts at ten, so don't be late.", exFr: "La réunion commence à dix heures, alors ne sois pas en retard." },
    { en: "to be good at", fr: "être doué en, être bon en", pos: "expression", ex: "I'm not very good at maths, but I love languages.", exFr: "Je ne suis pas très doué en maths, mais j'adore les langues." }
  ]
});

HUB.vocab.push({
  id: "a2-voc-free-time", level: "A2",
  title: "Loisirs et sport",
  en: "Free time and sport",
  words: [
    { en: "to go out", fr: "sortir", pos: "verbe à particule", ex: "We usually go out on Friday nights.", exFr: "On sort généralement le vendredi soir." },
    { en: "to hang out (with)", fr: "traîner, passer du temps (avec)", pos: "verbe à particule", ex: "I hang out with my friends at the park after school.", exFr: "Je traîne avec mes amis au parc après l'école." },
    { en: "a hobby", fr: "un passe-temps", pos: "nom", ex: "Photography is my favourite hobby.", exFr: "La photographie est mon passe-temps préféré." },
    { en: "to be into something", fr: "être fan de, adorer quelque chose", pos: "expression", ex: "My brother is really into video games.", exFr: "Mon frère est à fond dans les jeux vidéo." },
    { en: "to join a club", fr: "s'inscrire dans un club", pos: "expression", ex: "I joined a climbing club last month.", exFr: "Je me suis inscrit dans un club d'escalade le mois dernier." },
    { en: "to score a goal", fr: "marquer un but", pos: "expression", ex: "He scored two goals in the last ten minutes.", exFr: "Il a marqué deux buts dans les dix dernières minutes." },
    { en: "to beat (someone)", fr: "battre (un adversaire)", pos: "verbe", ex: "We beat the other team 3–1, so we won the match.", exFr: "Nous avons battu l'autre équipe 3 à 1, donc nous avons gagné le match." },
    { en: "a draw", fr: "un match nul", pos: "nom", ex: "The match ended in a draw.", exFr: "Le match s'est terminé sur un match nul." },
    { en: "to work out", fr: "faire du sport, s'entraîner", pos: "verbe à particule", ex: "I work out at the gym three times a week.", exFr: "Je m'entraîne à la salle trois fois par semaine." },
    { en: "to go for a walk", fr: "aller se promener", pos: "expression", ex: "Let's go for a walk by the river.", exFr: "Allons nous promener au bord de la rivière." },
    { en: "a gig", fr: "un concert (de musique actuelle)", pos: "nom", ex: "We're going to a gig on Saturday.", exFr: "On va à un concert samedi." },
    { en: "to chill out", fr: "se détendre (familier)", pos: "verbe à particule", ex: "On Sundays I just chill out at home.", exFr: "Le dimanche, je me détends simplement à la maison." },
    { en: "a board game", fr: "un jeu de société", pos: "nom", ex: "We play board games with my cousins at Christmas.", exFr: "On joue à des jeux de société avec mes cousins à Noël." },
    { en: "to take up (a hobby)", fr: "se mettre à (une activité)", pos: "verbe à particule", ex: "I've just taken up the guitar.", exFr: "Je viens de me mettre à la guitare." }
  ]
});

HUB.vocab.push({
  id: "a2-voc-health", level: "A2",
  title: "Corps et santé",
  en: "Body and health",
  words: [
    { en: "to feel sick", fr: "avoir mal au cœur, avoir la nausée (US : être malade)", pos: "expression", ex: "I felt sick on the boat.", exFr: "J'avais mal au cœur sur le bateau." },
    { en: "a headache", fr: "un mal de tête", pos: "nom", ex: "I've got a terrible headache.", exFr: "J'ai un terrible mal de tête." },
    { en: "a sore throat", fr: "un mal de gorge", pos: "nom", ex: "Drink some hot tea with honey for your sore throat.", exFr: "Bois un thé chaud avec du miel pour ton mal de gorge." },
    { en: "to catch a cold", fr: "attraper un rhume", pos: "expression", ex: "I caught a cold after the football match in the rain.", exFr: "J'ai attrapé un rhume après le match de foot sous la pluie." },
    { en: "a temperature", fr: "de la fièvre", pos: "nom", ex: "She has a high temperature, so she's staying at home.", exFr: "Elle a beaucoup de fièvre, alors elle reste à la maison." },
    { en: "to hurt", fr: "faire mal ; se blesser", pos: "verbe", ex: "My back hurts when I sit for too long.", exFr: "J'ai mal au dos quand je reste assis trop longtemps." },
    { en: "to break (an arm, a leg)", fr: "se casser (un bras, une jambe)", pos: "verbe", ex: "He broke his arm skiing.", exFr: "Il s'est cassé le bras au ski." },
    { en: "an appointment", fr: "un rendez-vous (médical, officiel)", pos: "nom", ex: "I've got a dentist's appointment at four.", exFr: "J'ai rendez-vous chez le dentiste à seize heures." },
    { en: "a prescription", fr: "une ordonnance", pos: "nom", ex: "The doctor gave me a prescription for antibiotics.", exFr: "Le médecin m'a fait une ordonnance pour des antibiotiques." },
    { en: "a chemist's", fr: "une pharmacie (US : a pharmacy, a drugstore)", pos: "nom", ex: "You can buy that at the chemist's.", exFr: "Tu peux acheter ça à la pharmacie." },
    { en: "to get better", fr: "aller mieux, guérir", pos: "expression", ex: "Take this medicine and you'll get better soon.", exFr: "Prends ce médicament et tu iras vite mieux." },
    { en: "healthy", fr: "sain ; en bonne santé", pos: "adjectif", ex: "I'm trying to eat a healthier diet.", exFr: "J'essaie d'avoir une alimentation plus saine." },
    { en: "exhausted", fr: "épuisé", pos: "adjectif", ex: "I'm exhausted after that long walk.", exFr: "Je suis épuisé après cette longue marche." },
    { en: "to lie down", fr: "s'allonger", pos: "verbe à particule", ex: "If you feel dizzy, lie down for a few minutes.", exFr: "Si tu as la tête qui tourne, allonge-toi quelques minutes." }
  ]
});

/* ============================== B1 ============================== */

HUB.vocab.push({
  id: "b1-voc-feelings", level: "B1",
  title: "Émotions et personnalité",
  en: "Feelings and personality",
  words: [
    { en: "proud (of)", fr: "fier (de)", pos: "adjectif", ex: "My parents were really proud of me when I got my diploma.", exFr: "Mes parents étaient très fiers de moi quand j'ai eu mon diplôme." },
    { en: "embarrassed", fr: "gêné, mal à l'aise", pos: "adjectif", ex: "I was so embarrassed when I fell over in front of everyone.", exFr: "J'étais tellement gêné quand je suis tombé devant tout le monde." },
    { en: "worried (about)", fr: "inquiet (pour, au sujet de)", pos: "adjectif", ex: "She's worried about her exam results.", exFr: "Elle s'inquiète pour ses résultats d'examen." },
    { en: "disappointed", fr: "déçu", pos: "adjectif", ex: "I was disappointed with the end of the film.", exFr: "J'ai été déçu par la fin du film." },
    { en: "jealous", fr: "jaloux", pos: "adjectif", ex: "He gets jealous when his girlfriend talks to other boys.", exFr: "Il devient jaloux quand sa copine parle à d'autres garçons." },
    { en: "moody", fr: "lunatique, d'humeur changeante", pos: "adjectif", ex: "He's a bit moody in the morning.", exFr: "Il est un peu lunatique le matin." },
    { en: "shy", fr: "timide", pos: "adjectif", ex: "She's shy at first, but very funny once you know her.", exFr: "Elle est timide au début, mais très drôle une fois qu'on la connaît." },
    { en: "outgoing", fr: "sociable, extraverti", pos: "adjectif", ex: "My sister is very outgoing and makes friends easily.", exFr: "Ma sœur est très sociable et se fait facilement des amis." },
    { en: "reliable", fr: "fiable, sur qui on peut compter", pos: "adjectif", ex: "You can count on Tom, he's very reliable.", exFr: "Tu peux compter sur Tom, il est très fiable." },
    { en: "stubborn", fr: "têtu", pos: "adjectif", ex: "My grandfather is so stubborn that he never changes his mind.", exFr: "Mon grand-père est tellement têtu qu'il ne change jamais d'avis." },
    { en: "to cheer up", fr: "reprendre courage ; remonter le moral à", pos: "verbe à particule", ex: "Cheer up! It's not the end of the world.", exFr: "Courage ! Ce n'est pas la fin du monde." },
    { en: "to lose your temper", fr: "s'énerver, perdre son sang-froid", pos: "expression", ex: "He lost his temper and started shouting.", exFr: "Il s'est énervé et s'est mis à crier." },
    { en: "relieved", fr: "soulagé", pos: "adjectif", ex: "I was relieved to hear that everyone was safe.", exFr: "J'ai été soulagé d'apprendre que tout le monde était sain et sauf." },
    { en: "sensitive", fr: "sensible (faux ami : sensible = raisonnable)", pos: "adjectif", ex: "He's very sensitive, so be careful what you say.", exFr: "Il est très sensible, alors fais attention à ce que tu dis." }
  ]
});

HUB.vocab.push({
  id: "b1-voc-environment", level: "B1",
  title: "Environnement et météo",
  en: "Environment and weather",
  words: [
    { en: "climate change", fr: "le changement climatique", pos: "nom", ex: "Climate change is causing more extreme weather.", exFr: "Le changement climatique provoque des phénomènes météo plus extrêmes." },
    { en: "to recycle", fr: "recycler", pos: "verbe", ex: "We recycle all our glass and paper.", exFr: "Nous recyclons tout notre verre et notre papier." },
    { en: "waste", fr: "les déchets ; le gaspillage", pos: "nom", ex: "We should all reduce our food waste.", exFr: "Nous devrions tous réduire notre gaspillage alimentaire." },
    { en: "to throw away", fr: "jeter", pos: "verbe à particule", ex: "Don't throw away those bottles, we can reuse them.", exFr: "Ne jette pas ces bouteilles, on peut les réutiliser." },
    { en: "renewable energy", fr: "les énergies renouvelables", pos: "nom", ex: "The town gets most of its electricity from renewable energy.", exFr: "La ville tire la plupart de son électricité des énergies renouvelables." },
    { en: "a heatwave", fr: "une canicule, une vague de chaleur", pos: "nom", ex: "During the heatwave, temperatures reached 40 degrees.", exFr: "Pendant la canicule, les températures ont atteint 40 degrés." },
    { en: "a flood", fr: "une inondation", pos: "nom", ex: "The floods destroyed hundreds of homes.", exFr: "Les inondations ont détruit des centaines de maisons." },
    { en: "a drought", fr: "une sécheresse", pos: "nom", ex: "Farmers are suffering because of the drought.", exFr: "Les agriculteurs souffrent à cause de la sécheresse." },
    { en: "a storm", fr: "une tempête, un orage", pos: "nom", ex: "The storm knocked down several trees.", exFr: "La tempête a abattu plusieurs arbres." },
    { en: "foggy", fr: "brumeux (il y a du brouillard)", pos: "adjectif", ex: "Drive carefully, it's very foggy this morning.", exFr: "Conduis prudemment, il y a beaucoup de brouillard ce matin." },
    { en: "to protect", fr: "protéger", pos: "verbe", ex: "These laws protect the forest from developers.", exFr: "Ces lois protègent la forêt contre les promoteurs." },
    { en: "endangered", fr: "menacé (d'extinction)", pos: "adjectif", ex: "The tiger is an endangered species.", exFr: "Le tigre est une espèce menacée." },
    { en: "a carbon footprint", fr: "une empreinte carbone", pos: "nom", ex: "Taking the train instead of the plane reduces your carbon footprint.", exFr: "Prendre le train au lieu de l'avion réduit ton empreinte carbone." },
    { en: "to save energy", fr: "économiser l'énergie", pos: "expression", ex: "Turn off the lights when you leave a room to save energy.", exFr: "Éteins la lumière en quittant une pièce pour économiser l'énergie." }
  ]
});

HUB.vocab.push({
  id: "b1-voc-tech", level: "B1",
  title: "Technologie et internet",
  en: "Technology and the internet",
  words: [
    { en: "to download", fr: "télécharger", pos: "verbe", ex: "You can download the app for free.", exFr: "Tu peux télécharger l'application gratuitement." },
    { en: "to log in", fr: "se connecter (à un compte)", pos: "verbe à particule", ex: "I can't log in because I've forgotten my password.", exFr: "Je n'arrive pas à me connecter car j'ai oublié mon mot de passe." },
    { en: "to update", fr: "mettre à jour", pos: "verbe", ex: "You should update your phone regularly.", exFr: "Tu devrais mettre à jour ton téléphone régulièrement." },
    { en: "a device", fr: "un appareil", pos: "nom", ex: "How many devices are connected to the Wi-Fi?", exFr: "Combien d'appareils sont connectés au wifi ?" },
    { en: "screen time", fr: "le temps passé devant les écrans", pos: "nom", ex: "My parents want to limit my screen time.", exFr: "Mes parents veulent limiter mon temps d'écran." },
    { en: "to share", fr: "partager", pos: "verbe", ex: "Can you share the link with me?", exFr: "Tu peux partager le lien avec moi ?" },
    { en: "social media", fr: "les réseaux sociaux", pos: "nom", ex: "I've decided to spend less time on social media.", exFr: "J'ai décidé de passer moins de temps sur les réseaux sociaux." },
    { en: "to charge", fr: "recharger (une batterie)", pos: "verbe", ex: "My battery is low, I need to charge my phone.", exFr: "Ma batterie est faible, je dois recharger mon téléphone." },
    { en: "a file", fr: "un fichier", pos: "nom", ex: "Save the file before you close it.", exFr: "Enregistre le fichier avant de le fermer." },
    { en: "to back up", fr: "sauvegarder (des données)", pos: "verbe à particule", ex: "Always back up your photos in the cloud.", exFr: "Sauvegarde toujours tes photos dans le cloud." },
    { en: "to crash", fr: "planter (ordinateur, application)", pos: "verbe", ex: "My laptop crashed and I lost my essay.", exFr: "Mon ordinateur portable a planté et j'ai perdu ma dissertation." },
    { en: "a search engine", fr: "un moteur de recherche", pos: "nom", ex: "Type the question into a search engine.", exFr: "Tape la question dans un moteur de recherche." },
    { en: "to subscribe (to)", fr: "s'abonner (à)", pos: "verbe", ex: "I subscribed to a podcast about history.", exFr: "Je me suis abonné à un podcast sur l'histoire." },
    { en: "to scroll", fr: "faire défiler", pos: "verbe", ex: "I spent an hour scrolling through videos instead of studying.", exFr: "J'ai passé une heure à faire défiler des vidéos au lieu de travailler." }
  ]
});

HUB.vocab.push({
  id: "b1-voc-money", level: "B1",
  title: "Argent et achats",
  en: "Money and shopping",
  words: [
    { en: "to afford", fr: "avoir les moyens de (s'offrir)", pos: "verbe", ex: "I can't afford a new phone right now.", exFr: "Je n'ai pas les moyens de m'acheter un nouveau téléphone en ce moment." },
    { en: "to save up (for)", fr: "économiser (pour)", pos: "verbe à particule", ex: "I'm saving up for a trip to Canada.", exFr: "J'économise pour un voyage au Canada." },
    { en: "a bargain", fr: "une bonne affaire", pos: "nom", ex: "These shoes were only 20 euros, a real bargain!", exFr: "Ces chaussures n'ont coûté que 20 euros, une vraie affaire !" },
    { en: "a receipt", fr: "un ticket de caisse, un reçu", pos: "nom", ex: "Keep the receipt in case you want to take it back.", exFr: "Garde le ticket au cas où tu voudrais le rapporter." },
    { en: "a refund", fr: "un remboursement", pos: "nom", ex: "The shop gave me a full refund.", exFr: "Le magasin m'a remboursé intégralement." },
    { en: "to lend / to borrow", fr: "prêter / emprunter", pos: "verbe", ex: "I borrowed a book from the library, and my friend lent me her notes.", exFr: "J'ai emprunté un livre à la bibliothèque, et mon amie m'a prêté ses notes." },
    { en: "to pay back", fr: "rembourser (quelqu'un)", pos: "verbe à particule", ex: "I'll pay you back as soon as I get my salary.", exFr: "Je te rembourserai dès que je toucherai mon salaire." },
    { en: "a discount", fr: "une réduction, une remise", pos: "nom", ex: "Students get a 10% discount.", exFr: "Les étudiants ont une réduction de 10 %." },
    { en: "on sale", fr: "en solde (UK) ; en vente", pos: "expression", ex: "This jacket is on sale, it's half price.", exFr: "Cette veste est en solde, elle est à moitié prix." },
    { en: "to spend (money on)", fr: "dépenser (de l'argent en, pour)", pos: "verbe", ex: "He spends all his money on clothes.", exFr: "Il dépense tout son argent en vêtements." },
    { en: "a bank account", fr: "un compte bancaire", pos: "nom", ex: "You need a bank account to get paid.", exFr: "Tu as besoin d'un compte bancaire pour être payé." },
    { en: "to withdraw (money)", fr: "retirer (de l'argent)", pos: "verbe", ex: "I need to withdraw some cash from the machine.", exFr: "Je dois retirer du liquide au distributeur." },
    { en: "to be broke", fr: "être fauché (familier)", pos: "expression", ex: "I can't come to the cinema, I'm broke until Friday.", exFr: "Je ne peux pas venir au ciné, je suis fauché jusqu'à vendredi." },
    { en: "overpriced", fr: "hors de prix, trop cher pour ce que c'est", pos: "adjectif", ex: "The drinks at the festival were really overpriced.", exFr: "Les boissons au festival étaient vraiment hors de prix." }
  ]
});

HUB.vocab.push({
  id: "b1-voc-relationships", level: "B1",
  title: "Relations et famille",
  en: "Relationships and family",
  words: [
    { en: "to get on (well) with", fr: "bien s'entendre avec", pos: "verbe à particule", ex: "I get on really well with my stepbrother.", exFr: "Je m'entends très bien avec mon demi-frère." },
    { en: "to fall out (with)", fr: "se brouiller, se fâcher (avec)", pos: "verbe à particule", ex: "They fell out over money and haven't spoken since.", exFr: "Ils se sont brouillés pour une histoire d'argent et ne se parlent plus depuis." },
    { en: "to make up", fr: "se réconcilier", pos: "verbe à particule", ex: "They had an argument but made up the next day.", exFr: "Ils se sont disputés mais se sont réconciliés le lendemain." },
    { en: "an argument", fr: "une dispute (faux ami : pas seulement un argument)", pos: "nom", ex: "My parents had an argument about the holidays.", exFr: "Mes parents se sont disputés au sujet des vacances." },
    { en: "to break up (with)", fr: "rompre (avec)", pos: "verbe à particule", ex: "She broke up with her boyfriend last week.", exFr: "Elle a rompu avec son copain la semaine dernière." },
    { en: "to go out with", fr: "sortir avec (quelqu'un)", pos: "verbe à particule", ex: "How long have you been going out with Emma?", exFr: "Depuis combien de temps tu sors avec Emma ?" },
    { en: "a stepmother", fr: "une belle-mère (nouvelle épouse du père)", pos: "nom", ex: "My stepmother is really kind to me.", exFr: "Ma belle-mère est vraiment gentille avec moi." },
    { en: "an only child", fr: "un enfant unique", pos: "nom", ex: "As an only child, I always wanted a brother.", exFr: "Étant enfant unique, j'ai toujours voulu un frère." },
    { en: "to bring up", fr: "élever (un enfant)", pos: "verbe à particule", ex: "She was brought up by her grandparents.", exFr: "Elle a été élevée par ses grands-parents." },
    { en: "to look after", fr: "s'occuper de, garder", pos: "verbe à particule", ex: "I look after my little sister on Wednesdays.", exFr: "Je m'occupe de ma petite sœur le mercredi." },
    { en: "to rely on", fr: "compter sur", pos: "verbe à particule", ex: "You can always rely on your real friends.", exFr: "Tu peux toujours compter sur tes vrais amis." },
    { en: "to keep in touch", fr: "rester en contact", pos: "expression", ex: "We moved away, but we still keep in touch.", exFr: "Nous avons déménagé, mais nous restons en contact." },
    { en: "a close friend", fr: "un ami proche", pos: "nom", ex: "Only my close friends know about it.", exFr: "Seuls mes amis proches sont au courant." },
    { en: "to trust", fr: "faire confiance à", pos: "verbe", ex: "I trust her completely.", exFr: "Je lui fais entièrement confiance." }
  ]
});

HUB.vocab.push({
  id: "b1-voc-media", level: "B1",
  title: "Médias et divertissement",
  en: "Media and entertainment",
  words: [
    { en: "a series", fr: "une série (même forme au pluriel)", pos: "nom", ex: "The series has three seasons of ten episodes.", exFr: "La série compte trois saisons de dix épisodes." },
    { en: "to binge-watch", fr: "regarder en rafale, enchaîner les épisodes", pos: "verbe", ex: "We binge-watched the whole first season in one weekend.", exFr: "On a enchaîné toute la première saison en un week-end." },
    { en: "the headlines", fr: "les gros titres", pos: "nom", ex: "I only read the headlines this morning.", exFr: "Je n'ai lu que les gros titres ce matin." },
    { en: "a review", fr: "une critique, un avis", pos: "nom", ex: "The film got great reviews.", exFr: "Le film a reçu d'excellentes critiques." },
    { en: "the plot", fr: "l'intrigue", pos: "nom", ex: "The plot was so complicated that I got lost.", exFr: "L'intrigue était si compliquée que je me suis perdu." },
    { en: "a spoiler", fr: "un divulgâcheur, un spoiler", pos: "nom", ex: "Don't tell me the ending, no spoilers!", exFr: "Ne me dis pas la fin, pas de spoilers !" },
    { en: "the cast", fr: "la distribution, les acteurs", pos: "nom", ex: "The cast includes several famous actors.", exFr: "La distribution compte plusieurs acteurs célèbres." },
    { en: "subtitles", fr: "les sous-titres", pos: "nom", ex: "I watch English films with English subtitles.", exFr: "Je regarde les films anglais avec les sous-titres en anglais." },
    { en: "dubbed", fr: "doublé", pos: "adjectif", ex: "I prefer the original version to the dubbed one.", exFr: "Je préfère la version originale à la version doublée." },
    { en: "a channel", fr: "une chaîne (télé, vidéo)", pos: "nom", ex: "She has a YouTube channel about cooking.", exFr: "Elle a une chaîne YouTube sur la cuisine." },
    { en: "to go viral", fr: "devenir viral, faire le buzz", pos: "expression", ex: "His video went viral overnight.", exFr: "Sa vidéo a fait le buzz du jour au lendemain." },
    { en: "fake news", fr: "les fausses informations, les infox", pos: "nom", ex: "Always check the source to avoid spreading fake news.", exFr: "Vérifie toujours la source pour éviter de propager de fausses informations." },
    { en: "to broadcast", fr: "diffuser, retransmettre", pos: "verbe", ex: "The match will be broadcast live on TV.", exFr: "Le match sera retransmis en direct à la télé." },
    { en: "an ad", fr: "une pub, une annonce (UK aussi : an advert)", pos: "nom", ex: "There are too many ads on this website.", exFr: "Il y a trop de pubs sur ce site." }
  ]
});
