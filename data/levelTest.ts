export interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

export interface Level {
  name: string;
  description: string;
}

export const testLanguages = ['English', 'German', 'French'] as const;

export type TestLanguage = (typeof testLanguages)[number];

export const nativeNames: Record<TestLanguage, string> = {
  English: 'English',
  German: 'Deutsch',
  French: 'Français',
};

export const questionsByLanguage: Record<TestLanguage, Question[]> = {
  English: [
    {
      id: 1,
      text: 'She ___ a teacher.',
      options: ['am', 'are', 'be', 'is'],
      correct: 3,
    },
    {
      id: 2,
      text: 'We ___ from Ukraine.',
      options: ['is', 'am', 'are', 'be'],
      correct: 2,
    },
    {
      id: 3,
      text: 'I ___ to the cinema yesterday.',
      options: ['go', 'went', 'goes', 'gone'],
      correct: 1,
    },
    {
      id: 4,
      text: "There isn't ___ milk in the fridge.",
      options: ['some', 'any', 'a', 'an'],
      correct: 1,
    },
    {
      id: 5,
      text: 'If it rains tomorrow, we ___ at home.',
      options: ['stay', 'would stay', 'stayed', 'will stay'],
      correct: 3,
    },
    {
      id: 6,
      text: 'I have lived here ___ 2019.',
      options: ['for', 'since', 'from', 'during'],
      correct: 1,
    },
    {
      id: 7,
      text: 'She asked me where ___.',
      options: ['did I live', 'do I live', 'I lived', 'lived I'],
      correct: 2,
    },
    {
      id: 8,
      text: 'By the time we arrived, the film ___.',
      options: [
        'had already started',
        'already started',
        'has already started',
        'was already starting',
      ],
      correct: 0,
    },
    {
      id: 9,
      text: 'I wish I ___ more time to prepare for the exam last week.',
      options: ['have', 'had', 'would have', 'had had'],
      correct: 3,
    },
    {
      id: 10,
      text: 'The manager insisted that the report ___ by Friday.',
      options: [
        'be submitted',
        'is submitted',
        'was submitted',
        'will be submitted',
      ],
      correct: 0,
    },
    {
      id: 11,
      text: 'The new policy has been criticised as ___, since it benefits only a small group.',
      options: ['egalitarian', 'altruistic', 'elitist', 'impartial'],
      correct: 2,
    },
    {
      id: 12,
      text: 'Scarcely had the meeting begun ___ the fire alarm went off.',
      options: ['than', 'then', 'while', 'when'],
      correct: 3,
    },
  ],
  German: [
    {
      id: 1,
      text: 'Ich ___ Anna.',
      options: ['bist', 'ist', 'sind', 'bin'],
      correct: 3,
    },
    {
      id: 2,
      text: 'Er ___ in Berlin.',
      options: ['wohne', 'wohnst', 'wohnt', 'wohnen'],
      correct: 2,
    },
    {
      id: 3,
      text: 'Gestern ___ ich ins Kino gegangen.',
      options: ['habe', 'bin', 'war', 'wurde'],
      correct: 1,
    },
    {
      id: 4,
      text: 'Ich warte ___ den Bus.',
      options: ['für', 'auf', 'an', 'bei'],
      correct: 1,
    },
    {
      id: 5,
      text: 'Wenn ich mehr Geld ___, würde ich ein Auto kaufen.',
      options: ['habe', 'hatte', 'haben', 'hätte'],
      correct: 3,
    },
    {
      id: 6,
      text: 'Das ist der Mann, ___ ich gestern geholfen habe.',
      options: ['der', 'den', 'dem', 'dessen'],
      correct: 2,
    },
    {
      id: 7,
      text: 'Er tut so, ___ er alles wüsste.',
      options: ['wie', 'dass', 'damit', 'als ob'],
      correct: 3,
    },
    {
      id: 8,
      text: 'Die Hausaufgaben müssen bis morgen ___ werden.',
      options: ['erledigen', 'erledigt', 'erledigte', 'zu erledigen'],
      correct: 1,
    },
    {
      id: 9,
      text: 'Hätte ich das gewusst, ___ ich anders entschieden.',
      options: ['hätte', 'habe', 'hatte', 'würde'],
      correct: 0,
    },
    {
      id: 10,
      text: 'Die Verhandlungen scheiterten ___ mangelnder Kompromissbereitschaft.',
      options: ['bei', 'mit', 'an', 'von'],
      correct: 2,
    },
    {
      id: 11,
      text: 'Die Behörde lehnte den Antrag mit der ___ ab, die Unterlagen seien unvollständig.',
      options: ['Gründung', 'Gründlichkeit', 'Begründer', 'Begründung'],
      correct: 3,
    },
    {
      id: 12,
      text: 'Es steht außer ___, dass er das Geld veruntreut hat.',
      options: ['Acht', 'Sicht', 'Zweifel', 'Kontrolle'],
      correct: 2,
    },
  ],
  French: [
    {
      id: 1,
      text: 'Je ___ étudiant.',
      options: ['es', 'est', 'suis', 'êtes'],
      correct: 2,
    },
    {
      id: 2,
      text: 'Nous ___ au café.',
      options: ['allez', 'allons', 'vont', 'vais'],
      correct: 1,
    },
    {
      id: 3,
      text: 'Hier, je ___ au cinéma.',
      options: ['vais', 'ai allé', 'allais', 'suis allé'],
      correct: 3,
    },
    {
      id: 4,
      text: "Je voudrais ___ eau, s'il vous plaît.",
      options: ['du', 'de la', "de l'", 'des'],
      correct: 2,
    },
    {
      id: 5,
      text: "Si j'avais plus de temps, je ___ voyager.",
      options: ['peux', 'pourrai', 'pouvais', 'pourrais'],
      correct: 3,
    },
    {
      id: 6,
      text: "C'est le livre ___ je t'ai parlé.",
      options: ['que', 'qui', 'dont', 'où'],
      correct: 2,
    },
    {
      id: 7,
      text: "Il faut que tu ___ à l'heure.",
      options: ['sois', 'es', 'seras', 'étais'],
      correct: 0,
    },
    {
      id: 8,
      text: "Je ne pense pas qu'il ___ raison.",
      options: ['a', 'avait', 'aura', 'ait'],
      correct: 3,
    },
    {
      id: 9,
      text: "Bien qu'il ___ fatigué, il a continué à travailler.",
      options: ['est', 'soit', 'était', 'sera'],
      correct: 1,
    },
    {
      id: 10,
      text: "Si j'avais su, je ne ___ pas venu.",
      options: ['suis', 'étais', 'serai', 'serais'],
      correct: 3,
    },
    {
      id: 11,
      text: 'Il a réussi ___ toute attente.',
      options: ['malgré', 'sans', 'contre', 'sur'],
      correct: 2,
    },
    {
      id: 12,
      text: "Quoi qu'il ___, je ne changerai pas d'avis.",
      options: ['arrive', 'arrivera', 'arrivait', 'arriverait'],
      correct: 0,
    },
  ],
};

export const levels: Level[] = [
  {
    name: 'A1 Beginner',
    description:
      'You know basic words and simple phrases. A tutor can help you build a solid foundation from scratch.',
  },
  {
    name: 'A2 Elementary',
    description:
      'You can handle everyday situations and simple conversations. Time to expand your vocabulary and grammar.',
  },
  {
    name: 'B1 Intermediate',
    description:
      'You can talk about familiar topics and travel with confidence. Regular practice will help you speak more fluently.',
  },
  {
    name: 'B2 Upper-Intermediate',
    description:
      'You can follow complex texts and communicate fairly spontaneously. A tutor can polish accuracy and natural expression.',
  },
  {
    name: 'C1 Advanced',
    description:
      'You use the language flexibly for work and study. Fine-tune style, idioms and precision with an experienced tutor.',
  },
  {
    name: 'C2 Proficient',
    description:
      'You are close to a native-like command. A tutor can help with nuance, specialised vocabulary and exam preparation.',
  },
];

const THRESHOLDS = [3, 5, 7, 9, 11];

export function getLevel(score: number): Level {
  const index = THRESHOLDS.filter(threshold => score >= threshold).length;

  return levels[index];
}

export function combineLevels(grammar: Level, writingName: string): Level {
  const grammarIndex = levels.indexOf(grammar);
  const writingIndex = levels.findIndex(level => level.name === writingName);

  if (writingIndex === -1) return grammar;

  return levels[Math.floor((grammarIndex + writingIndex) / 2)];
}
