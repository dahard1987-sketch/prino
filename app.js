const PLAYER_NAMES = [
  '박범준', '배승우', '윤해든', '이룩', '이수민', '이우진', '이은수', '이지우',
  '임윤아', '채범기', '한지아', '김경민', '김시아', '이은성',
  '강용제', '김예승', '김재윤', '김하준', '박시현', '박이환', '백시율', '이해원',
  '조현우', '지수연', '황은찬', '김소이', '홍경서', '박정준', '임지율', '장재희', '차예주'
].sort((a, b) => a.localeCompare(b, 'ko'));

const HEPTA_PLAYER_NAMES = [
  ['강해솔', 'Aurora'], ['고윤서', 'Andy'], ['김세윤', 'Irene'], ['김연재', 'Ella'],
  ['김윤슬', 'Suri'], ['김하윤', 'Julia'], ['유예빛', 'Bella'], ['이지유', 'Jenny'],
  ['한대윤', 'Danny'], ['김도윤', 'Yoon'], ['노연호', 'Steve'], ['박선율', 'Sunny'],
  ['박율', 'Amy'], ['손종현', 'Jonghyun'], ['윤지한', 'Jihan'], ['장세아', 'Se A'],
  ['정연서', 'Mia'], ['정이안', 'Ian']
].sort((a, b) => a[0].localeCompare(b[0], 'ko'))
  .map(([koreanName, englishName]) => `${koreanName}(${englishName})`);

const VERBS = [
  ...['enjoy', 'finish', 'keep', 'stop', 'avoid', 'give up', 'deny', 'mind', 'consider', 'put off'].map(verb => ({ verb, category: 'gerund' })),
  ...['want', 'decide', 'hope', 'expect', 'plan', 'agree', 'ask', 'promise', 'refuse'].map(verb => ({ verb, category: 'infinitive' })),
  ...['like', 'love', 'hate', 'begin', 'dislike', 'start', 'continue','prefer'].map(verb => ({ verb, category: 'both-same' })),
  ...['remember', 'forget', 'try', 'regret'].map(verb => ({ verb, category: 'both-different' }))
];
const VERB_COOLDOWN = 8;

const CATEGORY_LABELS = {
  gerund: '동명사',
  infinitive: 'to 부정사',
  'both-same': '둘 다 (의미 차이 X)',
  'both-different': '둘 다 (의미 차이 O)'
};

const ACTIVITY_LABELS = {
  prime: '소수 판별',
  grammar: '동사의 목적어',
  ing: '동명사 / 현재분사',
  'sentence-error': '문장 오류 찾기',
  'to-infinitive-i': 'to v. 용법 구분 I',
  'to-infinitive-ii': 'to v. 용법 구분 II',
  'participle-preposition': '분사 + 전치사',
  'sentence-building': '(Hepta) 문장 완성'
};
const STUDY_ACTIVITY_KEYS = new Set([
  'grammar',
  'ing',
  'sentence-error',
  'to-infinitive-i',
  'to-infinitive-ii',
  'participle-preposition',
  'sentence-building'
]);
const ROUND_OVER_TITLES = [
  '아쉬워요!',
  '아쉽구만',
  '아쉽다~',
  '아쉬워라',
  'ㄲㅂ',
  '와 아쉬워',
  '너무 아쉽다',
  '이렇게 아쉬울 수가'
];
const BUILDER_CORRECT_MESSAGES = [
  '정말 잘했어요!',
  '멋지게 해냈어요!',
  '차근차근 잘했어요!',
  '와, 문장을 딱 맞췄네요!',
  '집중력이 정말 멋져요!',
  '오늘도 한 뼘 자랐네요!',
  '최고에요!',
  '아주 훌륭해요!',
  '해낼 줄 알았어요!',
  '너무 잘 했어요!',
  '끝까지 잘 생각했네요!',
  '멋진 선택이었어요!',
  '대단해, 또 해냈어요!',
  '정답을 쏙 찾았네요!',
  '아주 야무지게 잘했어요!',
  '한 번에 척척!',
  '좋아, 정말 잘하고 있어요!',
  '실력이 쑥쑥 자라고 있어요!',
  '친구들에게 자랑하세요!',
  '너무 멋있어요!',
  '포기하지 않고 잘 해냈어요!'
];

const ACHIEVEMENT_RESULT_MESSAGES = [
  value => `${value}\uAC1C\uB294 \uC880 \uB300\uB2E8\uD55C\uB370\uC694?`,
  value => `${value}\uAC1C\uB294 \uAD49\uC7A5\uD788 \uC798\uD588\uB124.`,
  value => `${value}\uAC1C...?`
];

const USAGE_NOTES = {
  stop: 'stop + 동명사: 하던 일을 멈추다\nstop + to 부정사: ... 하려고 멈추다\n\n※ to 부정사도 쓸 수 있지만 이때는 목적어가 아니라 부사(목적)입니다.',
  dislike: 'dislike는 동명사와 to 부정사를 모두 목적어로 쓸 수 있지만 주로 동명사를 사용합니다.',
  remember: 'remember + 동명사: ...했던 것을 기억하다\nremember + to 부정사: ...할 것을 기억하다',
  forget: 'forget + 동명사: ...했던 것을 잊다\nforget + to 부정사: ...할 것을 잊다',
  try: 'try + 동명사: 시험 삼아 한번 해 보다\ntry + to 부정사: ...하려고 노력하다',
  regret: 'regret + 동명사: ...했던 것을 후회하다\nregret + to 부정사: ...하게 되어 유감이다'
};

const ING_QUESTIONS = Array.isArray(window.ING_ITEMS) ? window.ING_ITEMS : [];
const ING_COOLDOWN = 3;
const ING_TIME_LIMIT = 7000;
const SENTENCE_ERROR_TIME_LIMIT = 10000;
const SENTENCE_ERROR_COOLDOWN = 4;
const SENTENCE_ERROR_VARIANTS = new Set(['incorrect', 'correct']);
const SENTENCE_ERROR_DIFF_TYPES = new Set(['same', 'delete', 'insert']);
const SENTENCE_ERROR_ITEMS = validateSentenceErrorItems(window.SENTENCE_ERROR_ITEMS);
const TO_INFINITIVE_I_ITEMS = Array.isArray(window.TO_INFINITIVE_I_ITEMS) ? window.TO_INFINITIVE_I_ITEMS : [];
const TO_INFINITIVE_II_ITEMS = Array.isArray(window.TO_INFINITIVE_II_ITEMS) ? window.TO_INFINITIVE_II_ITEMS : [];
const PARTICIPLE_PREPOSITION_ITEMS = validateParticiplePrepositionItems(window.PARTICIPLE_PREPOSITION_ITEMS);
const PARTICIPLE_PREPOSITION_COOLDOWN = 4;
const PARTICIPLE_PREPOSITION_TIME_LIMIT = 10000;
const SENTENCE_BUILDING_ITEMS = Array.isArray(window.SENTENCE_BUILDING_ITEMS) ? window.SENTENCE_BUILDING_ITEMS : [];
const SENTENCE_BUILDING_COOLDOWN = 3;
const SENTENCE_BUILDING_PUNCTUATION_REMOVAL_SCORE = 20;
const SENTENCE_BUILDING_CAPITAL_HINT_REMOVAL_SCORE = 30;
const SENTENCE_BUILDING_INTENSE_BGM_THRESHOLD = 30;
const SENTENCE_BUILDING_BGM_VOLUME = .17;
const SENTENCE_BUILDING_FEEDBACK_BGM_VOLUME = .055;
const SENTENCE_BUILDING_BGM_FADE_DURATION = 1600;
const SENTENCE_BUILDING_LOWERCASE_STARTS = new Set([
  'the', 'he', 'they', 'we', 'everyone', 'it', 'six', 'raindrops', 'stop'
]);
const TO_INFINITIVE_COOLDOWN = 3;
const TO_INFINITIVE_I_TIME_LIMIT = 10000;
const TO_INFINITIVE_II_TIME_LIMIT = 15000;
// 무한히 늘어지는 복습 간격은 55문제로 상한한다.
const STUDY_REVIEW_INTERVALS = [1, 2, 3, 5, 8, 13, 21, 34, 55];
const ING_ANSWER_LABELS = {
  gerund: '동명사(Gerund)',
  participle: '현재분사(Participle)'
};
const SENTENCE_ERROR_ANSWER_LABELS = {
  correct: '맞음',
  incorrect: '틀림'
};
const TO_INFINITIVE_I_ANSWER_LABELS = {
  noun: '명사적 용법',
  adjective: '형용사적 용법',
  adverb: '부사적 용법'
};
const TO_INFINITIVE_II_ANSWER_LABELS = {
  purpose: '목적',
  emotion: '감정의 원인',
  judgment: '판단의 근거',
  result: '결과',
  'adjective-modifier': '형용사 수식',
  condition: '조건'
};

const FEEDBACK_TONES = {
  correct: [
    { frequency: 587.33, delay: 0, duration: .11, volume: .22, wave: 'triangle' },
    { frequency: 739.99, delay: .085, duration: .12, volume: .22, wave: 'triangle' },
    { frequency: 880, delay: .17, duration: .19, volume: .2, wave: 'triangle' }
  ],
  wrong: [
    { frequency: 880, delay: 0, duration: .12, volume: .18, wave: 'triangle' },
    { frequency: 739.99, delay: .095, duration: .15, volume: .17, wave: 'triangle' },
    { frequency: 587.33, endFrequency: 440, delay: .21, duration: .32, volume: .17, wave: 'triangle' }
  ],
  'builder-correct': [
    { frequency: 523.25, delay: 0, duration: .13, volume: .3, wave: 'sine' },
    { frequency: 659.25, delay: .09, duration: .15, volume: .28, wave: 'sine' },
    { frequency: 783.99, delay: .19, duration: .24, volume: .27, wave: 'sine' }
  ],
  'builder-wrong': [
    { frequency: 392, delay: 0, duration: .16, volume: .27, wave: 'square' },
    { frequency: 293.66, delay: .14, duration: .28, volume: .24, wave: 'square' }
  ],
  'builder-tick': [
    { frequency: 1320, endFrequency: 980, delay: 0, duration: .042, volume: .07, wave: 'triangle', attack: .003 },
    { frequency: 2200, endFrequency: 1760, delay: .004, duration: .022, volume: .035, wave: 'sine', attack: .002 }
  ],
  tick: [{ frequency: 1046.5, delay: 0, duration: .045, volume: .075, wave: 'triangle' }]
};
const SENTENCE_ERROR_CORRECT_KEYS = new Set(['ArrowDown', 'ArrowRight', '2']);
const SENTENCE_ERROR_INCORRECT_KEYS = new Set(['ArrowUp', 'ArrowLeft', '1']);
const GRAMMAR_KEY_ANSWERS = {
  '1': 'gerund',
  '2': 'infinitive',
  '3': 'both-same',
  '4': 'both-different'
};
const TO_INFINITIVE_I_KEY_ANSWERS = { '1': 'noun', '2': 'adjective', '3': 'adverb' };
const TO_INFINITIVE_II_KEY_ANSWERS = {
  '1': 'purpose',
  '2': 'emotion',
  '3': 'judgment',
  '4': 'result',
  '5': 'adjective-modifier',
  '6': 'condition'
};

const screens = [...document.querySelectorAll('.screen')];
const welcomeScreen = document.querySelector('#welcome-screen');
const menuScreen = document.querySelector('#menu-screen');
const backToActivitiesButton = document.querySelector('#back-to-activities');
const primeScreen = document.querySelector('#prime-screen');
const grammarScreen = document.querySelector('#grammar-screen');
const ingScreen = document.querySelector('#ing-screen');
const sentenceErrorScreen = document.querySelector('#sentence-error-screen');
const toInfinitiveIScreen = document.querySelector('#to-infinitive-i-screen');
const toInfinitiveIIScreen = document.querySelector('#to-infinitive-ii-screen');
const participlePrepositionScreen = document.querySelector('#participle-preposition-screen');
const sentenceBuildingScreen = document.querySelector('#sentence-building-screen');
const sentenceErrorStartButton = document.querySelector('#sentence-error-start');
const prepositionStartButton = document.querySelector('#preposition-start');
const nameForm = document.querySelector('#name-form');
const nameSelect = document.querySelector('#name-select');
const customNameInput = document.querySelector('#custom-name');
const selectedActivityLabel = document.querySelector('#selected-activity-label');
const studyModeOption = document.querySelector('#study-mode-option');
const studyModeInput = document.querySelector('#study-mode-input');
const numberEl = document.querySelector('#number');
const verbEl = document.querySelector('#verb');
const ingSentenceEl = document.querySelector('#ing-sentence');
const sentenceErrorSentenceEl = document.querySelector('#sentence-error-sentence');
const toInfinitiveISentenceEl = document.querySelector('#to-i-sentence');
const toInfinitiveIISentenceEl = document.querySelector('#to-ii-sentence');
const prepositionSentenceEl = document.querySelector('#preposition-sentence');
const prepositionChoicesEl = document.querySelector('#preposition-choices');
const builderAnswerEl = document.querySelector('#builder-answer');
const builderBankEl = document.querySelector('#builder-bank');
const builderBoardEl = document.querySelector('.builder-board');
const builderUndoButton = document.querySelector('#builder-undo');
const builderResetButton = document.querySelector('#builder-reset');
const builderBgmEl = document.querySelector('#builder-bgm');
const builderIntenseBgmEl = document.querySelector('#builder-bgm-intense');
const sentenceErrorEmptyEl = document.querySelector('#sentence-error-empty');
const sentenceErrorEmptyBackButton = document.querySelector('#sentence-error-empty-back');
const primeScoreEl = document.querySelector('#prime-score');
const grammarScoreEl = document.querySelector('#grammar-score');
const ingScoreEl = document.querySelector('#ing-score');
const sentenceErrorScoreEl = document.querySelector('#sentence-error-score');
const toInfinitiveIScoreEl = document.querySelector('#to-i-score');
const toInfinitiveIIScoreEl = document.querySelector('#to-ii-score');
const prepositionScoreEl = document.querySelector('#preposition-score');
const builderScoreEl = document.querySelector('#builder-score');
const grammarScoreLabelEl = document.querySelector('#grammar-score-label');
const ingScoreLabelEl = document.querySelector('#ing-score-label');
const sentenceErrorScoreLabelEl = document.querySelector('#sentence-error-score-label');
const toInfinitiveIScoreLabelEl = document.querySelector('#to-i-score-label');
const toInfinitiveIIScoreLabelEl = document.querySelector('#to-ii-score-label');
const prepositionScoreLabelEl = document.querySelector('#preposition-score-label');
const builderScoreLabelEl = document.querySelector('#builder-score-label');
const primeBestEl = document.querySelector('#prime-best');
const grammarBestEl = document.querySelector('#grammar-best');
const ingBestEl = document.querySelector('#ing-best');
const sentenceErrorBestEl = document.querySelector('#sentence-error-best');
const toInfinitiveIBestEl = document.querySelector('#to-i-best');
const toInfinitiveIIBestEl = document.querySelector('#to-ii-best');
const prepositionBestEl = document.querySelector('#preposition-best');
const builderBestEl = document.querySelector('#builder-best');
const grammarBestLabelEl = document.querySelector('#grammar-best-label');
const ingBestLabelEl = document.querySelector('#ing-best-label');
const sentenceErrorBestLabelEl = document.querySelector('#sentence-error-best-label');
const toInfinitiveIBestLabelEl = document.querySelector('#to-i-best-label');
const toInfinitiveIIBestLabelEl = document.querySelector('#to-ii-best-label');
const prepositionBestLabelEl = document.querySelector('#preposition-best-label');
const builderBestLabelEl = document.querySelector('#builder-best-label');
const primeFlashEl = document.querySelector('#prime-flash');
const grammarFlashEl = document.querySelector('#grammar-flash');
const ingFlashEl = document.querySelector('#ing-flash');
const sentenceErrorFlashEl = document.querySelector('#sentence-error-flash');
const toInfinitiveIFlashEl = document.querySelector('#to-i-flash');
const toInfinitiveIIFlashEl = document.querySelector('#to-ii-flash');
const prepositionFlashEl = document.querySelector('#preposition-flash');
const builderFlashEl = document.querySelector('#builder-flash');
const primeTimerEl = document.querySelector('#prime-timer');
const primeTimerLabelEl = document.querySelector('#prime-timer-label');
const primeTimerBarEl = document.querySelector('#prime-timer-bar');
const grammarTimerEl = document.querySelector('#grammar-timer');
const grammarTimerLabelEl = document.querySelector('#grammar-timer-label');
const grammarTimerBarEl = document.querySelector('#grammar-timer-bar');
const ingTimerEl = document.querySelector('#ing-timer');
const ingTimerLabelEl = document.querySelector('#ing-timer-label');
const ingTimerBarEl = document.querySelector('#ing-timer-bar');
const sentenceErrorTimerEl = document.querySelector('#sentence-error-timer');
const sentenceErrorTimerLabelEl = document.querySelector('#sentence-error-timer-label');
const sentenceErrorTimerBarEl = document.querySelector('#sentence-error-timer-bar');
const toInfinitiveITimerEl = document.querySelector('#to-i-timer');
const toInfinitiveITimerLabelEl = document.querySelector('#to-i-timer-label');
const toInfinitiveITimerBarEl = document.querySelector('#to-i-timer-bar');
const toInfinitiveIITimerEl = document.querySelector('#to-ii-timer');
const toInfinitiveIITimerLabelEl = document.querySelector('#to-ii-timer-label');
const toInfinitiveIITimerBarEl = document.querySelector('#to-ii-timer-bar');
const prepositionTimerEl = document.querySelector('#preposition-timer');
const prepositionTimerLabelEl = document.querySelector('#preposition-timer-label');
const prepositionTimerBarEl = document.querySelector('#preposition-timer-bar');
const builderTimerEl = document.querySelector('#builder-timer');
const builderTimerLabelEl = document.querySelector('#builder-timer-label');
const builderTimerBarEl = document.querySelector('#builder-timer-bar');
const primeFeedbackEl = document.querySelector('#prime-feedback');
const grammarFeedbackEl = document.querySelector('#grammar-feedback');
const ingFeedbackEl = document.querySelector('#ing-feedback');
const sentenceErrorFeedbackEl = document.querySelector('#sentence-error-feedback');
const toInfinitiveIFeedbackEl = document.querySelector('#to-i-feedback');
const toInfinitiveIIFeedbackEl = document.querySelector('#to-ii-feedback');
const prepositionFeedbackEl = document.querySelector('#preposition-feedback');
const builderFeedbackEl = document.querySelector('#builder-feedback');
const streakCelebrationEl = document.querySelector('#streak-celebration');
const streakCelebrationScoreEl = document.querySelector('#streak-celebration-score');
const streakCelebrationParticlesEl = document.querySelector('#streak-celebration-particles');
const infoModal = document.querySelector('#info-modal');
const infoTitleEl = document.querySelector('#info-title');
const infoMessageEl = document.querySelector('#info-message');
const hideWordNoteInput = document.querySelector('#hide-word-note');
const infoContinueButton = document.querySelector('#info-continue');
const studyExplanationModal = document.querySelector('#study-explanation-modal');
const studyExplanationMessageEl = document.querySelector('#study-explanation-message');
const studyExplanationContinueButton = document.querySelector('#study-explanation-continue');
const resultModal = document.querySelector('#result-modal');
const resultScrollContentEl = document.querySelector('#result-scroll-content');
const resultTitleEl = document.querySelector('#result-title');
const resultMessageEl = document.querySelector('#result-message');
const finalScoreEl = document.querySelector('#final-score');
const finalBestEl = document.querySelector('#final-best');
const leaderboardTitleEl = document.querySelector('#leaderboard-title');
const leaderboardListEl = document.querySelector('#leaderboard-list');
const restartButton = document.querySelector('#restart');
const changeResultPlayerButton = document.querySelector('#change-result-player');
const resultBackMenuButton = document.querySelector('#result-back-menu');
const resetLeaderboardButton = document.querySelector('#reset-leaderboard');
const ACTIVITY_SCREENS = {
  prime: primeScreen,
  grammar: grammarScreen,
  ing: ingScreen,
  'sentence-error': sentenceErrorScreen,
  'to-infinitive-i': toInfinitiveIScreen,
  'to-infinitive-ii': toInfinitiveIIScreen,
  'participle-preposition': participlePrepositionScreen,
  'sentence-building': sentenceBuildingScreen
};
const ACTIVITY_FEEDBACK = {
  prime: primeFeedbackEl,
  grammar: grammarFeedbackEl,
  ing: ingFeedbackEl,
  'sentence-error': sentenceErrorFeedbackEl,
  'to-infinitive-i': toInfinitiveIFeedbackEl,
  'to-infinitive-ii': toInfinitiveIIFeedbackEl,
  'participle-preposition': prepositionFeedbackEl,
  'sentence-building': builderFeedbackEl
};
const ACTIVITY_ANSWER_ATTRIBUTES = {
  prime: 'data-prime-answer',
  grammar: 'data-grammar-answer',
  ing: 'data-ing-answer',
  'sentence-error': 'data-sentence-error-answer',
  'to-infinitive-i': 'data-to-i-answer',
  'to-infinitive-ii': 'data-to-ii-answer',
  'participle-preposition': 'data-preposition-answer'
};
const ACTIVITY_SCORE_UI = {
  grammar: { score: grammarScoreEl, scoreLabel: grammarScoreLabelEl, best: grammarBestEl, bestLabel: grammarBestLabelEl },
  ing: { score: ingScoreEl, scoreLabel: ingScoreLabelEl, best: ingBestEl, bestLabel: ingBestLabelEl },
  'sentence-error': {
    score: sentenceErrorScoreEl,
    scoreLabel: sentenceErrorScoreLabelEl,
    best: sentenceErrorBestEl,
    bestLabel: sentenceErrorBestLabelEl
  },
  'to-infinitive-i': { score: toInfinitiveIScoreEl, scoreLabel: toInfinitiveIScoreLabelEl, best: toInfinitiveIBestEl, bestLabel: toInfinitiveIBestLabelEl },
  'to-infinitive-ii': { score: toInfinitiveIIScoreEl, scoreLabel: toInfinitiveIIScoreLabelEl, best: toInfinitiveIIBestEl, bestLabel: toInfinitiveIIBestLabelEl },
  'participle-preposition': { score: prepositionScoreEl, scoreLabel: prepositionScoreLabelEl, best: prepositionBestEl, bestLabel: prepositionBestLabelEl },
  'sentence-building': { score: builderScoreEl, scoreLabel: builderScoreLabelEl, best: builderBestEl, bestLabel: builderBestLabelEl }
};

let playerName = '';
let activeActivity = '';
let score = 0;
let currentNumber = 2;
let currentVerb = VERBS[0];
let currentIngItem = ING_QUESTIONS[0];
let currentSentenceErrorItem = SENTENCE_ERROR_ITEMS[0];
let currentSentenceErrorVariant = 'incorrect';
let currentToInfinitiveIItem = TO_INFINITIVE_I_ITEMS[0];
let currentToInfinitiveIIItem = TO_INFINITIVE_II_ITEMS[0];
let currentParticiplePrepositionItem = PARTICIPLE_PREPOSITION_ITEMS[0];
let currentSentenceBuildingItem = SENTENCE_BUILDING_ITEMS[0];
let currentBuilderSelection = [];
let recentVerbs = [];
let recentIngIndexes = [];
let recentSentenceErrorIds = [];
let recentSentenceErrorVerdicts = [];
let lastSentenceErrorCorrect = '';
let recentToInfinitiveIIds = [];
let recentToInfinitiveIIIds = [];
let recentParticiplePrepositionIds = [];
let lastPrepositionCorrectSlot = -1;
let recentSentenceBuildingIds = [];
const sentenceErrorLastVariantById = new Map();
let sentenceErrorPracticeState = { rounds: 0, reviews: {}, lastWrongKey: '' };
let sentenceErrorRetryQuestionKey = '';
let currentSentenceErrorQuestionKey = '';
let currentIngIndex = 0;
let studyMode = false;
let studyState = { rounds: 0, reviews: {} };
let currentStudyItemId = '';
let currentStudyItemIsReview = false;
let lastRoundOverTitle = '';
let acceptingInput = false;
let activitySessionId = 0;
let audioContext = null;
let activeBuilderBgmEl = builderBgmEl;
let sentenceBuildingBgmFadeAnimationId = null;
let sentenceBuildingBgmMix = null;
let sentenceBuildingBgmDucked = false;
let primeTimeoutId = null;
let primeTickIntervalId = null;
let primeTimerAnimationId = null;
let primeDeadline = 0;
let primeTimeLimit = 0;
let grammarTimeoutId = null;
let grammarTickIntervalId = null;
let grammarTimerAnimationId = null;
let grammarDeadline = 0;
let ingTimeoutId = null;
let ingTickIntervalId = null;
let ingTimerAnimationId = null;
let ingDeadline = 0;
let sentenceErrorTimeoutId = null;
let sentenceErrorTickIntervalId = null;
let sentenceErrorTimerAnimationId = null;
let sentenceErrorDeadline = 0;
let toInfinitiveTimeoutId = null;
let toInfinitiveTickIntervalId = null;
let toInfinitiveTimerAnimationId = null;
let toInfinitiveDeadline = 0;
let prepositionTimeoutId = null;
let prepositionTickIntervalId = null;
let prepositionTimerAnimationId = null;
let prepositionDeadline = 0;
let sentenceBuildingTimeoutId = null;
let sentenceBuildingTickIntervalId = null;
let sentenceBuildingTimerAnimationId = null;
let sentenceBuildingDeadline = 0;
let sentenceBuildingTimeLimit = 15000;
let sentenceBuildingFeedbackVolumeTimeoutId = null;
let lastBuilderCorrectMessage = '';
let streakCelebrationTimeoutId = null;
let confettiAppearanceCount = 0;
const suppressedUsageNotes = new Set();

function showScreen(screen) {
  screens.forEach(item => item.classList.toggle('active', item === screen));
}

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // Storage may be unavailable in private or restricted browser contexts.
  }
}

function invalidateActivitySession() {
  activitySessionId += 1;
}

function scheduleActivityTask(callback, delay) {
  const scheduledSessionId = activitySessionId;
  return window.setTimeout(() => {
    if (scheduledSessionId === activitySessionId) callback();
  }, delay);
}

function getPolygonArea(points) {
  let sum = 0;
  points.forEach((point, index) => {
    const next = points[(index + 1) % points.length];
    sum += point.x * next.y - next.x * point.y;
  });
  return Math.abs(sum) / 2;
}

function getPolygonCentroid(points) {
  let crossSum = 0;
  let xSum = 0;
  let ySum = 0;
  points.forEach((point, index) => {
    const next = points[(index + 1) % points.length];
    const cross = point.x * next.y - next.x * point.y;
    crossSum += cross;
    xSum += (point.x + next.x) * cross;
    ySum += (point.y + next.y) * cross;
  });
  if (Math.abs(crossSum) < .001) {
    return points.reduce((sum, point) => ({ x: sum.x + point.x / points.length, y: sum.y + point.y / points.length }), { x: 0, y: 0 });
  }
  return { x: xSum / (3 * crossSum), y: ySum / (3 * crossSum) };
}

function isPointInsidePolygon(point, polygon) {
  let inside = false;
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index, index += 1) {
    const currentPoint = polygon[index];
    const previousPoint = polygon[previous];
    const crosses = (currentPoint.y > point.y) !== (previousPoint.y > point.y)
      && point.x < (previousPoint.x - currentPoint.x) * (point.y - currentPoint.y)
        / (previousPoint.y - currentPoint.y) + currentPoint.x;
    if (crosses) inside = !inside;
  }
  return inside;
}

function createEqualAreaRadialGeometry(width, height, count) {
  // 6분할은 정확한 중앙을 사용해 좌우 경계가 언제나 하나의 수평선이 되게 한다.
  const center = { x: width * .5, y: height * (count === 6 ? .5 : .52) };
  const perimeter = [
    { x: width * .5, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
    { x: 0, y: 0 },
    { x: width * .5, y: 0 }
  ];
  const segmentAreas = perimeter.slice(0, -1).map((point, index) => {
    const next = perimeter[index + 1];
    return Math.abs(
      (point.x - center.x) * (next.y - center.y)
      - (point.y - center.y) * (next.x - center.x)
    ) / 2;
  });
  const cumulativeAreas = [0];
  segmentAreas.forEach(area => cumulativeAreas.push(cumulativeAreas.at(-1) + area));
  const totalArea = cumulativeAreas.at(-1);
  const sectorArea = totalArea / count;
  const startArea = totalArea - sectorArea / 2;
  const normalizeArea = area => ((area % totalArea) + totalArea) % totalArea;

  const pointAtArea = rawArea => {
    const area = normalizeArea(rawArea);
    let segmentIndex = segmentAreas.findIndex((segmentArea, index) => area <= cumulativeAreas[index + 1] + .0001);
    if (segmentIndex < 0) segmentIndex = segmentAreas.length - 1;
    const segmentArea = segmentAreas[segmentIndex];
    const progress = segmentArea ? (area - cumulativeAreas[segmentIndex]) / segmentArea : 0;
    const start = perimeter[segmentIndex];
    const end = perimeter[segmentIndex + 1];
    return {
      x: start.x + (end.x - start.x) * Math.max(0, Math.min(1, progress)),
      y: start.y + (end.y - start.y) * Math.max(0, Math.min(1, progress))
    };
  };

  const getPerimeterPoints = (fromArea, toArea) => {
    const points = [pointAtArea(fromArea)];
    const firstLap = Math.floor(fromArea / totalArea) - 1;
    const lastLap = Math.floor(toArea / totalArea) + 1;
    for (let lap = firstLap; lap <= lastLap; lap += 1) {
      cumulativeAreas.slice(1).forEach((area, index) => {
        const unwrappedArea = lap * totalArea + area;
        if (unwrappedArea > fromArea + .0001 && unwrappedArea < toArea - .0001) {
          points.push(perimeter[index + 1]);
        }
      });
    }
    points.push(pointAtArea(toArea));
    return points;
  };

  const polygons = Array.from({ length: count }, (_, index) => {
    const fromArea = startArea + index * sectorArea;
    return [center, ...getPerimeterPoints(fromArea, fromArea + sectorArea)];
  });
  return { center, polygons, sectorArea };
}

function positionRadialLabels(screen, polygons, center) {
  const screenRect = screen.getBoundingClientRect();
  const baseObstacles = [
    ...screen.querySelectorAll('.topbar > *'),
    screen.querySelector('.radial-timer'),
    screen.querySelector('.to-infinitive-sentence')
  ].filter(Boolean).map(element => {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left - screenRect.left,
      right: rect.right - screenRect.left,
      top: rect.top - screenRect.top,
      bottom: rect.bottom - screenRect.top
    };
  });
  const placedLabelRects = [];

  screen.querySelectorAll('.radial-choice__label').forEach((label, index) => {
    const centroid = getPolygonCentroid(polygons[index]);
    let x = centroid.x;
    let y = centroid.y;
    label.style.left = `${x}px`;
    label.style.top = `${y}px`;
    const labelRect = label.getBoundingClientRect();
    const halfWidth = labelRect.width / 2;
    const halfHeight = labelRect.height / 2;
    const margin = 12;
    const clampPoint = point => ({
      x: Math.max(margin + halfWidth, Math.min(screenRect.width - margin - halfWidth, point.x)),
      y: Math.max(margin + halfHeight, Math.min(screenRect.height - margin - halfHeight, point.y))
    });
    ({ x, y } = clampPoint({ x, y }));
    const getLabelBounds = point => ({
      left: point.x - halfWidth,
      right: point.x + halfWidth,
      top: point.y - halfHeight,
      bottom: point.y + halfHeight
    });
    const intersects = (first, second, gap = 3) => (
      first.right > second.left - gap
      && first.left < second.right + gap
      && first.bottom > second.top - gap
      && first.top < second.bottom + gap
    );

    for (let attempt = 0; attempt < 12; attempt += 1) {
      const current = getLabelBounds({ x, y });
      const obstacles = [...baseObstacles, ...placedLabelRects];
      const obstacle = obstacles.find(rect => intersects(current, rect));
      if (!obstacle) break;
      const candidates = [
        { x: obstacle.left - 12 - halfWidth, y },
        { x: obstacle.right + 12 + halfWidth, y },
        { x, y: obstacle.top - 12 - halfHeight },
        { x, y: obstacle.bottom + 12 + halfHeight }
      ].map(clampPoint).filter((candidate, candidateIndex, allCandidates) => (
        Math.hypot(candidate.x - x, candidate.y - y) > .5
        && isPointInsidePolygon(candidate, polygons[index])
        && !obstacles.some(other => intersects(getLabelBounds(candidate), other))
        && allCandidates.findIndex(other => Math.abs(other.x - candidate.x) < .1 && Math.abs(other.y - candidate.y) < .1) === candidateIndex
      )).sort((first, second) => (
        Math.hypot(first.x - x, first.y - y) - Math.hypot(second.x - x, second.y - y)
      ));
      if (!candidates.length) break;
      ({ x, y } = candidates[0]);
    }
    const finalObstacles = [...baseObstacles, ...placedLabelRects];
    if (finalObstacles.some(obstacle => intersects(getLabelBounds({ x, y }), obstacle))) {
      const step = Math.max(10, Math.min(screenRect.width, screenRect.height) / 30);
      const openPositions = [];
      for (let candidateY = margin + halfHeight; candidateY <= screenRect.height - margin - halfHeight; candidateY += step) {
        for (let candidateX = margin + halfWidth; candidateX <= screenRect.width - margin - halfWidth; candidateX += step) {
          const candidate = { x: candidateX, y: candidateY };
          if (!isPointInsidePolygon(candidate, polygons[index])) continue;
          if (finalObstacles.some(obstacle => intersects(getLabelBounds(candidate), obstacle))) continue;
          openPositions.push(candidate);
        }
      }
      if (openPositions.length) {
        openPositions.sort((first, second) => (
          Math.hypot(first.x - centroid.x, first.y - centroid.y)
          - Math.hypot(second.x - centroid.x, second.y - centroid.y)
        ));
        ({ x, y } = openPositions[0]);
      }
    }
    label.style.left = `${x}px`;
    label.style.top = `${y}px`;
    placedLabelRects.push(getLabelBounds({ x, y }));
  });
}

function layoutRadialActivity(screen, count) {
  if (!screen?.classList.contains('active')) return;
  const width = screen.clientWidth;
  const height = screen.clientHeight;
  if (!width || !height) return;
  const { center, polygons, sectorArea } = createEqualAreaRadialGeometry(width, height, count);
  const choices = [...screen.querySelectorAll('.radial-choice')];
  choices.forEach((choice, index) => {
    const polygon = polygons[index];
    choice.style.clipPath = `polygon(${polygon.map(point => `${point.x.toFixed(3)}px ${point.y.toFixed(3)}px`).join(', ')})`;
    choice.dataset.areaRatio = (getPolygonArea(polygon) / sectorArea).toFixed(6);
  });
  const seams = screen.querySelector('.radial-seams');
  seams.setAttribute('viewBox', `0 0 ${width} ${height}`);
  seams.querySelectorAll('line').forEach((line, index) => {
    const boundary = polygons[index][1];
    line.setAttribute('x1', center.x);
    line.setAttribute('y1', center.y);
    line.setAttribute('x2', boundary.x);
    line.setAttribute('y2', boundary.y);
  });
  positionRadialLabels(screen, polygons, center);
}

let radialLayoutAnimationId = null;
function scheduleRadialLayout() {
  window.cancelAnimationFrame(radialLayoutAnimationId);
  radialLayoutAnimationId = window.requestAnimationFrame(() => {
    if (activeActivity === 'to-infinitive-i') layoutRadialActivity(toInfinitiveIScreen, 3);
    if (activeActivity === 'to-infinitive-ii') layoutRadialActivity(toInfinitiveIIScreen, 6);
  });
}
window.addEventListener('resize', scheduleRadialLayout);
window.visualViewport?.addEventListener('resize', scheduleRadialLayout);

function tokenizeSentenceForDiff(sentence) {
  return sentence.match(/\s+|[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*|[^\s\p{L}\p{N}]/gu) || [];
}

function mergeSentenceDiffSegments(segments) {
  return segments.reduce((merged, segment) => {
    const previous = merged.at(-1);
    if (previous?.type === segment.type) previous.text += segment.text;
    else merged.push({ type: segment.type, text: segment.text });
    return merged;
  }, []);
}

function refineSentenceReplacements(segments) {
  const refined = [];
  for (let index = 0; index < segments.length; index += 1) {
    const first = segments[index];
    const second = segments[index + 1];
    const replacement = first?.type === 'delete' && second?.type === 'insert'
      ? { deleted: first.text, inserted: second.text }
      : first?.type === 'insert' && second?.type === 'delete'
        ? { deleted: second.text, inserted: first.text }
        : null;

    if (!replacement || /\s/u.test(replacement.deleted) || /\s/u.test(replacement.inserted)) {
      refined.push(first);
      continue;
    }

    let prefixLength = 0;
    const maxPrefixLength = Math.min(replacement.deleted.length, replacement.inserted.length);
    while (
      prefixLength < maxPrefixLength
      && replacement.deleted[prefixLength] === replacement.inserted[prefixLength]
    ) {
      prefixLength += 1;
    }

    if (!prefixLength) {
      refined.push(first);
      continue;
    }

    refined.push({ type: 'same', text: replacement.deleted.slice(0, prefixLength) });
    const deletedRemainder = replacement.deleted.slice(prefixLength);
    const insertedRemainder = replacement.inserted.slice(prefixLength);
    if (deletedRemainder) refined.push({ type: 'delete', text: deletedRemainder });
    if (insertedRemainder) refined.push({ type: 'insert', text: insertedRemainder });
    index += 1;
  }
  return mergeSentenceDiffSegments(refined);
}

function generateSentenceDiff(incorrect, correct) {
  const before = tokenizeSentenceForDiff(incorrect);
  const after = tokenizeSentenceForDiff(correct);
  const table = Array.from({ length: before.length + 1 }, () => Array(after.length + 1).fill(0));

  for (let left = before.length - 1; left >= 0; left -= 1) {
    for (let right = after.length - 1; right >= 0; right -= 1) {
      table[left][right] = before[left] === after[right]
        ? table[left + 1][right + 1] + 1
        : Math.max(table[left + 1][right], table[left][right + 1]);
    }
  }

  const segments = [];
  let left = 0;
  let right = 0;
  while (left < before.length && right < after.length) {
    if (
      before[left] === after[right]
      && table[left + 1][right] === table[left][right]
    ) {
      segments.push({ type: 'delete', text: before[left] });
      left += 1;
    } else if (before[left] === after[right]) {
      segments.push({ type: 'same', text: before[left] });
      left += 1;
      right += 1;
    } else if (table[left + 1][right] >= table[left][right + 1]) {
      segments.push({ type: 'delete', text: before[left] });
      left += 1;
    } else {
      segments.push({ type: 'insert', text: after[right] });
      right += 1;
    }
  }
  while (left < before.length) segments.push({ type: 'delete', text: before[left++] });
  while (right < after.length) segments.push({ type: 'insert', text: after[right++] });
  return refineSentenceReplacements(mergeSentenceDiffSegments(segments));
}

function validateSentenceErrorItems(rawItems) {
  if (!Array.isArray(rawItems)) {
    console.warn('[문장 오류 찾기] SENTENCE_ERROR_ITEMS 배열을 찾을 수 없습니다.');
    return [];
  }

  const seenIds = new Set();
  const validItems = [];
  rawItems.forEach((rawItem, index) => {
    const id = typeof rawItem?.id === 'string' ? rawItem.id.trim() : '';
    const incorrect = typeof rawItem?.incorrect === 'string' ? rawItem.incorrect.trim() : '';
    const correct = typeof rawItem?.correct === 'string' ? rawItem.correct.trim() : '';
    const reason = typeof rawItem?.reason === 'string'
      ? rawItem.reason.trim()
      : typeof rawItem?.explanation === 'string'
        ? rawItem.explanation.trim()
        : '';
    const warningPrefix = `[문장 오류 찾기] ${id || `항목 ${index + 1}`}`;

    if (!id || seenIds.has(id)) {
      console.warn(`${warningPrefix}: 비어 있거나 중복된 ID라서 제외했습니다.`);
      return;
    }
    seenIds.add(id);
    if (!incorrect || !correct || incorrect === correct || !reason) {
      console.warn(`${warningPrefix}: 필수 문장·이유가 없거나 두 문장이 같아서 제외했습니다.`);
      return;
    }

    let diff = null;
    if (rawItem.diff != null) {
      if (!Array.isArray(rawItem.diff) || rawItem.diff.some(segment => (
        !segment || !SENTENCE_ERROR_DIFF_TYPES.has(segment.type) || typeof segment.text !== 'string'
      ))) {
        console.warn(`${warningPrefix}: 지원하지 않는 diff 형식이라서 항목을 제외했습니다.`);
        return;
      }
      const explicitDiff = rawItem.diff.map(segment => ({ type: segment.type, text: segment.text }));
      const rebuiltIncorrect = explicitDiff
        .filter(segment => segment.type !== 'insert')
        .map(segment => segment.text)
        .join('');
      const rebuiltCorrect = explicitDiff
        .filter(segment => segment.type !== 'delete')
        .map(segment => segment.text)
        .join('');
      if (rebuiltIncorrect === incorrect && rebuiltCorrect === correct) diff = explicitDiff;
      else console.warn(`${warningPrefix}: 명시적 diff가 문장을 재현하지 못해 자동 diff로 대체했습니다.`);
    }

    const variants = Array.isArray(rawItem.variants)
      ? [...new Set(rawItem.variants.filter(variant => SENTENCE_ERROR_VARIANTS.has(variant)))]
      : ['incorrect', 'correct'];
    validItems.push({
      id,
      incorrect,
      correct,
      reason,
      translation: typeof rawItem.translation === 'string' ? rawItem.translation.trim() : '',
      category: typeof rawItem.category === 'string' ? rawItem.category : '',
      level: typeof rawItem.level === 'string' ? rawItem.level : '',
      tags: Array.isArray(rawItem.tags) ? rawItem.tags.filter(tag => typeof tag === 'string') : [],
      weight: Number.isFinite(Number(rawItem.weight)) && Number(rawItem.weight) > 0 ? Number(rawItem.weight) : 1,
      variants: variants.length ? variants : ['incorrect', 'correct'],
      diff: diff || generateSentenceDiff(incorrect, correct)
    });
  });
  return validItems;
}

function validateParticiplePrepositionItems(rawItems) {
  if (!Array.isArray(rawItems)) {
    console.warn('[분사 + 전치사] PARTICIPLE_PREPOSITION_ITEMS 배열을 찾을 수 없습니다.');
    return [];
  }

  const seenIds = new Set();
  return rawItems.filter((item, index) => {
    const label = item?.id || `항목 ${index + 1}`;
    const choices = Array.isArray(item?.choices) ? item.choices : [];
    const accepted = Array.isArray(item?.acceptedPrepositions) ? item.acceptedPrepositions : [];
    const blankCount = typeof item?.sentence === 'string'
      ? (item.sentence.match(/___/g) || []).length
      : 0;
    const isValid = (
      typeof item?.id === 'string'
      && item.id.length > 0
      && !seenIds.has(item.id)
      && typeof item?.participle === 'string'
      && item.participle.length > 0
      && typeof item?.targetPreposition === 'string'
      && typeof item?.meaning === 'string'
      && item.meaning.length > 0
      && blankCount === 1
      && choices.length === 4
      && new Set(choices).size === 4
      && choices.every(choice => typeof choice === 'string' && choice.length > 0)
      && choices.includes(item.targetPreposition)
      && accepted.length === 1
      && accepted[0] === item.targetPreposition
    );
    if (!isValid) {
      console.warn(`[분사 + 전치사] ${label}: 4지선다 또는 단일 정답 형식이 올바르지 않아 제외했습니다.`);
      return false;
    }
    seenIds.add(item.id);
    return true;
  });
}

function getLastPlayerStorageKey(activity = activeActivity) {
  return activity === 'sentence-building'
    ? 'quick-tap-last-player-hepta'
    : 'quick-tap-last-player';
}

function populateNames(activity = activeActivity) {
  const names = activity === 'sentence-building' ? HEPTA_PLAYER_NAMES : PLAYER_NAMES;
  nameSelect.replaceChildren();
  const placeholder = new Option('이름을 선택하세요', '', true, true);
  placeholder.disabled = true;
  nameSelect.add(placeholder);
  names.forEach(name => nameSelect.add(new Option(name, name)));
  if (activity !== 'sentence-building') nameSelect.add(new Option('직접 입력', '__custom__'));
  customNameInput.hidden = true;
  customNameInput.required = false;
  customNameInput.value = '';
  const previousPlayer = readStorage(getLastPlayerStorageKey(activity));
  if (!previousPlayer) return;
  if (names.includes(previousPlayer)) {
    nameSelect.value = previousPlayer;
  } else if (activity !== 'sentence-building') {
    nameSelect.value = '__custom__';
    customNameInput.hidden = false;
    customNameInput.required = true;
    customNameInput.value = previousPlayer;
  }
}

function getLeaderboard(activity) {
  const leaderboard = Object.create(null);
  try {
    const value = JSON.parse(readStorage(`quick-tap-leaderboard-${activity}`));
    if (!value || typeof value !== 'object' || Array.isArray(value)) return leaderboard;
    Object.entries(value).forEach(([name, storedScore]) => {
      const normalizedScore = Number(storedScore);
      if (Number.isFinite(normalizedScore) && normalizedScore >= 0) {
        leaderboard[name] = normalizedScore;
      }
    });
    return leaderboard;
  } catch {
    return leaderboard;
  }
}

function saveLeaderboard(activity, leaderboard) {
  writeStorage(`quick-tap-leaderboard-${activity}`, JSON.stringify(leaderboard));
}

function getPlayerBest(activity) {
  return Number(getLeaderboard(activity)[playerName]) || 0;
}

function recordScore(activity, newScore) {
  const leaderboard = getLeaderboard(activity);
  leaderboard[playerName] = Math.max(Number(leaderboard[playerName]) || 0, newScore);
  saveLeaderboard(activity, leaderboard);
  return leaderboard[playerName];
}

function renderLeaderboard(activity) {
  const rows = Object.entries(getLeaderboard(activity))
    .map(([name, value]) => [name, Number(value) || 0])
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ko'));

  leaderboardListEl.replaceChildren();
  if (!rows.length) {
    const empty = document.createElement('li');
    empty.className = 'leaderboard__empty';
    empty.textContent = '아직 기록이 없습니다.';
    leaderboardListEl.append(empty);
    return;
  }

  rows.forEach(([name, value], index) => {
    const item = document.createElement('li');
    item.className = `leaderboard__row${name === playerName ? ' current' : ''}`;
    const rank = document.createElement('span');
    rank.className = 'leaderboard__rank';
    rank.textContent = String(index + 1);
    const player = document.createElement('span');
    player.textContent = name;
    const rowScore = document.createElement('span');
    rowScore.className = 'leaderboard__score';
    rowScore.textContent = `${value}개`;
    item.append(rank, player, rowScore);
    leaderboardListEl.append(item);
  });
}

function getSentenceErrorQuestionKey(itemId, variant) {
  return `${itemId}::${variant}`;
}

function resolveSentenceErrorQuestion(questionKey) {
  const separatorIndex = questionKey.lastIndexOf('::');
  if (separatorIndex < 0) return null;
  const itemId = questionKey.slice(0, separatorIndex);
  const variant = questionKey.slice(separatorIndex + 2);
  const item = SENTENCE_ERROR_ITEMS.find(candidate => candidate.id === itemId);
  return item && item.variants.includes(variant) ? { item, variant, key: questionKey } : null;
}

function getSentenceErrorPracticeStorageKey(name = playerName) {
  return `quick-tap-sentence-error-practice-${encodeURIComponent(name)}`;
}

function loadSentenceErrorPracticeState() {
  try {
    const saved = JSON.parse(readStorage(getSentenceErrorPracticeStorageKey()));
    const rounds = Number.isInteger(saved?.rounds) && saved.rounds >= 0 ? saved.rounds : 0;
    const reviews = {};
    Object.entries(saved?.reviews || {}).forEach(([key, review]) => {
      if (!resolveSentenceErrorQuestion(key)) return;
      const stage = Number(review?.stage);
      const due = Number(review?.due);
      const addedAt = Number(review?.addedAt);
      const correctStreak = Number(review?.correctStreak);
      if (!Number.isInteger(stage) || stage < 0 || stage >= STUDY_REVIEW_INTERVALS.length) return;
      if (!Number.isInteger(due) || due < 0) return;
      reviews[key] = {
        stage,
        due,
        addedAt: Number.isInteger(addedAt) && addedAt >= 0 ? addedAt : 0,
        correctStreak: Number.isInteger(correctStreak) && correctStreak >= 0
          ? Math.min(correctStreak, 1)
          : 0
      };
    });
    const lastWrongKey = resolveSentenceErrorQuestion(saved?.lastWrongKey || '')
      ? saved.lastWrongKey
      : '';
    return { rounds, reviews, lastWrongKey };
  } catch {
    return { rounds: 0, reviews: {}, lastWrongKey: '' };
  }
}

function saveSentenceErrorPracticeState() {
  if (!playerName) return;
  writeStorage(
    getSentenceErrorPracticeStorageKey(),
    JSON.stringify(sentenceErrorPracticeState)
  );
}

function getSentenceErrorPracticeSelection() {
  const retry = resolveSentenceErrorQuestion(sentenceErrorRetryQuestionKey);
  sentenceErrorRetryQuestionKey = '';
  if (retry) return { ...retry, id: retry.item.id, isReview: true };

  const dueEntry = Object.entries(sentenceErrorPracticeState.reviews)
    .filter(([, review]) => review.due <= sentenceErrorPracticeState.rounds)
    .sort((a, b) => a[1].due - b[1].due || a[1].addedAt - b[1].addedAt)[0];
  if (!dueEntry) return null;
  const due = resolveSentenceErrorQuestion(dueEntry[0]);
  return due ? { ...due, id: due.item.id, isReview: true } : null;
}

function recordFibonacciReviewAnswer(
  reviewState,
  itemId,
  isCorrect,
  { enrollCorrectAnswer = false, resetOnIncorrect = false } = {}
) {
  reviewState.rounds += 1;
  const existing = reviewState.reviews[itemId];
  let correctStreak = existing?.correctStreak || 0;

  if (!existing) {
    if (isCorrect && !enrollCorrectAnswer) {
      return { nextInterval: 0, mastered: false, correctStreak: 0 };
    }
    const nextInterval = STUDY_REVIEW_INTERVALS[0];
    reviewState.reviews[itemId] = {
      stage: 0,
      due: reviewState.rounds + nextInterval,
      addedAt: reviewState.rounds,
      correctStreak: 0
    };
    return { nextInterval, mastered: false, correctStreak: 0 };
  }

  if (!isCorrect && resetOnIncorrect) {
    const nextInterval = STUDY_REVIEW_INTERVALS[0];
    reviewState.reviews[itemId] = {
      stage: 0,
      due: reviewState.rounds + nextInterval,
      addedAt: reviewState.rounds,
      correctStreak: 0
    };
    return { nextInterval, mastered: false, correctStreak: 0 };
  }

  correctStreak = isCorrect ? correctStreak + 1 : 0;
  if (correctStreak >= 2) {
    delete reviewState.reviews[itemId];
    return { nextInterval: 0, mastered: true, correctStreak };
  }

  const nextStage = Math.min(existing.stage + 1, STUDY_REVIEW_INTERVALS.length - 1);
  const nextInterval = STUDY_REVIEW_INTERVALS[nextStage];
  reviewState.reviews[itemId] = {
    stage: nextStage,
    due: reviewState.rounds + nextInterval,
    addedAt: existing.addedAt,
    correctStreak
  };
  return { nextInterval, mastered: false, correctStreak };
}

function recordSentenceErrorPracticeAnswer(isCorrect, answeredSlowly = false) {
  if (studyMode || !currentSentenceErrorQuestionKey) return;
  const key = currentSentenceErrorQuestionKey;
  recordFibonacciReviewAnswer(sentenceErrorPracticeState, key, isCorrect, {
    enrollCorrectAnswer: answeredSlowly
  });
  if (!isCorrect) sentenceErrorPracticeState.lastWrongKey = key;
  if (isCorrect && sentenceErrorPracticeState.lastWrongKey === key) {
    sentenceErrorPracticeState.lastWrongKey = '';
  }

  saveSentenceErrorPracticeState();
}

function isSentenceErrorAnswerSlow() {
  if (studyMode || !sentenceErrorDeadline) return false;
  const remaining = Math.max(0, sentenceErrorDeadline - performance.now());
  return sentenceErrorTimerEl.classList.contains('urgent')
    || remaining / SENTENCE_ERROR_TIME_LIMIT <= .34;
}

function getStudyStorageKey(activity = activeActivity, name = playerName) {
  return `quick-tap-study-${activity}-${encodeURIComponent(name)}`;
}

function getStudyItemIds(activity = activeActivity) {
  if (activity === 'grammar') return new Set(VERBS.map(item => item.verb));
  if (activity === 'ing') return new Set(ING_QUESTIONS.map((item, index) => String(index)));
  if (activity === 'sentence-error') return new Set(SENTENCE_ERROR_ITEMS.map(item => item.id));
  if (activity === 'to-infinitive-i') return new Set(TO_INFINITIVE_I_ITEMS.map(item => item.id));
  if (activity === 'to-infinitive-ii') return new Set(TO_INFINITIVE_II_ITEMS.map(item => item.id));
  if (activity === 'participle-preposition') return new Set(PARTICIPLE_PREPOSITION_ITEMS.map(item => item.id));
  if (activity === 'sentence-building') return new Set(SENTENCE_BUILDING_ITEMS.map(item => item.id));
  return new Set();
}

function loadStudyState() {
  const validIds = getStudyItemIds();
  try {
    const saved = JSON.parse(readStorage(getStudyStorageKey()));
    const rounds = Number.isInteger(saved?.rounds) && saved.rounds >= 0 ? saved.rounds : 0;
    const reviews = {};
    Object.entries(saved?.reviews || {}).forEach(([id, review]) => {
      const stage = Number(review?.stage);
      const due = Number(review?.due);
      const addedAt = Number(review?.addedAt);
      const correctStreak = Number(review?.correctStreak);
      if (!validIds.has(id) || !Number.isInteger(stage) || stage < 0 || stage >= STUDY_REVIEW_INTERVALS.length) return;
      if (!Number.isInteger(due) || due < 0) return;
      reviews[id] = {
        stage,
        due,
        addedAt: Number.isInteger(addedAt) && addedAt >= 0 ? addedAt : 0,
        correctStreak: Number.isInteger(correctStreak) && correctStreak >= 0
          ? Math.min(correctStreak, 1)
          : stage > 0 ? 1 : 0
      };
    });
    return { rounds, reviews };
  } catch {
    return { rounds: 0, reviews: {} };
  }
}

function saveStudyState() {
  if (!studyMode || !STUDY_ACTIVITY_KEYS.has(activeActivity) || !playerName) return;
  writeStorage(getStudyStorageKey(), JSON.stringify(studyState));
}

function getPendingStudyCount() {
  return Object.keys(studyState.reviews).length;
}

function updateStudyModeUI() {
  const isEnglishActivity = STUDY_ACTIVITY_KEYS.has(activeActivity);
  grammarScreen.classList.toggle('study-mode', studyMode && activeActivity === 'grammar');
  ingScreen.classList.toggle('study-mode', studyMode && activeActivity === 'ing');
  sentenceErrorScreen.classList.toggle('study-mode', studyMode && activeActivity === 'sentence-error');
  toInfinitiveIScreen.classList.toggle('study-mode', studyMode && activeActivity === 'to-infinitive-i');
  toInfinitiveIIScreen.classList.toggle('study-mode', studyMode && activeActivity === 'to-infinitive-ii');
  participlePrepositionScreen.classList.toggle('study-mode', studyMode && activeActivity === 'participle-preposition');
  sentenceBuildingScreen.classList.toggle('study-mode', studyMode && activeActivity === 'sentence-building');
  document.querySelectorAll('[data-study-toggle]').forEach(button => {
    button.setAttribute('aria-pressed', String(studyMode));
    button.textContent = studyMode ? '학습 종료' : '학습 모드';
  });
  studyModeInput.checked = studyMode;
  if (!isEnglishActivity) return;

  const ui = ACTIVITY_SCORE_UI[activeActivity];
  ui.scoreLabel.textContent = studyMode ? '학습' : '연속';
  ui.bestLabel.textContent = studyMode ? '복습 대기' : '최고';
  ui.best.textContent = studyMode ? getPendingStudyCount() : getPlayerBest(activeActivity);
}

function updateWelcomeSelection() {
  const isStudySelection = STUDY_ACTIVITY_KEYS.has(activeActivity) && studyModeInput.checked;
  selectedActivityLabel.textContent = `${ACTIVITY_LABELS[activeActivity]}${isStudySelection ? ' · 학습 모드' : ''}`;
}

function pickWeightedItem(items) {
  if (!items.length) return null;
  const total = items.reduce((sum, item) => sum + (Number(item.weight) > 0 ? Number(item.weight) : 1), 0);
  let target = Math.random() * total;
  for (const item of items) {
    target -= Number(item.weight) > 0 ? Number(item.weight) : 1;
    if (target <= 0) return item;
  }
  return items.at(-1);
}

function getStudySelection(items, getId, recentIds) {
  const dueEntries = Object.entries(studyState.reviews)
    .filter(([, review]) => review.due <= studyState.rounds)
    .sort((a, b) => a[1].due - b[1].due || a[1].addedAt - b[1].addedAt);
  if (dueEntries.length) {
    const dueId = dueEntries[0][0];
    const dueItem = items.find(item => getId(item) === dueId);
    if (dueItem) return { item: dueItem, id: dueId, isReview: true };
  }

  const available = items.filter(item => {
    const id = getId(item);
    return !studyState.reviews[id] && !recentIds.includes(id);
  });
  const fallback = available.length
    ? available
    : items.filter(item => !studyState.reviews[getId(item)]);
  const candidates = fallback.length ? fallback : items;
  const item = pickWeightedItem(candidates);
  const id = getId(item);
  return { item, id, isReview: Boolean(studyState.reviews[id]) };
}

function recordStudyAnswer(itemId, isCorrect) {
  const result = recordFibonacciReviewAnswer(studyState, itemId, isCorrect, {
    resetOnIncorrect: true
  });
  saveStudyState();
  updateStudyModeUI();
  return result;
}

function showStudyExplanation(content, title = '오답 해설') {
  if (activeActivity === 'sentence-building') pauseSentenceBuildingBgm();
  document.querySelector('#study-explanation-title').textContent = title;
  studyExplanationMessageEl.classList.toggle('has-rich-explanation', typeof content !== 'string');
  studyExplanationMessageEl.replaceChildren();
  if (typeof content === 'string') {
    const explanation = document.createElement('div');
    explanation.textContent = content;
    studyExplanationMessageEl.append(explanation);
  } else {
    studyExplanationMessageEl.append(content);
  }
  openModal(studyExplanationModal, studyExplanationContinueButton);
}

function animateCard(element) {
  element.classList.remove('pop');
  void element.offsetWidth;
  element.classList.add('pop');
}

function showFlash(element, type) {
  element.className = 'flash';
  void element.offsetWidth;
  element.classList.add(type);
}

function getStreakMilestone(value) {
  if (value >= 100 && value % 100 === 0) return 'major';
  if (value === 5 || (value >= 10 && value < 100 && value % 10 === 0)) return 'standard';
  return '';
}

function getNextRoundDelay(value) {
  const milestone = getStreakMilestone(value);
  if (milestone === 'major') return 2050;
  if (milestone === 'standard') return 1500;
  return 650;
}

function clearStreakCelebration() {
  window.clearTimeout(streakCelebrationTimeoutId);
  streakCelebrationTimeoutId = null;
  streakCelebrationEl.className = 'streak-celebration';
  streakCelebrationScoreEl.textContent = '';
  streakCelebrationParticlesEl.replaceChildren();
}

function celebrateStreak(value) {
  const milestone = getStreakMilestone(value);
  if (!milestone) return;

  clearStreakCelebration();
  const isMajor = milestone === 'major';
  confettiAppearanceCount += 1;
  const baseColors = [
    '#BDDDFC', '#88BDF2', '#6A89A7', '#384959', '#F8FBFE',
    '#F5C84C', '#9FE7C2', '#FFB8CB', '#D9C7F5', '#FF9B73'
  ];
  const colors = Array.from(
    { length: 3 + confettiAppearanceCount },
    (_, index) => baseColors[index]
      || `hsl(${Math.round((index * 137.508) % 360)} 78% 62%)`
  );
  const particleCount = Math.max(isMajor ? 84 : 42, colors.length);
  const burstOrigins = isMajor
    ? [{ x: 25, y: 27 }, { x: 50, y: 20 }, { x: 75, y: 27 }]
    : [{ x: 42, y: 24 }, { x: 58, y: 24 }];
  const baseRadius = Math.min(window.innerWidth, window.innerHeight) * (isMajor ? .62 : .44);
  const particles = document.createDocumentFragment();

  for (let index = 0; index < particleCount; index += 1) {
    const piece = document.createElement('i');
    const origin = burstOrigins[index % burstOrigins.length];
    const angle = (Math.PI * 2 * index) / particleCount * burstOrigins.length + Math.random() * .34;
    const distance = baseRadius * (.52 + Math.random() * .55);
    const xMid = Math.cos(angle) * distance;
    const yMid = Math.sin(angle) * distance;
    const fall = (isMajor ? 210 : 140) + Math.random() * (isMajor ? 150 : 100);
    const spin = (Math.random() < .5 ? -1 : 1) * (300 + Math.random() * 620);
    const width = (isMajor ? 7 : 5) + Math.random() * (isMajor ? 8 : 6);
    const height = width * (1.2 + Math.random() * 1.5);

    piece.className = 'confetti-piece';
    piece.style.setProperty('--start-x', `${origin.x + (Math.random() - .5) * 4}%`);
    piece.style.setProperty('--start-y', `${origin.y + (Math.random() - .5) * 4}%`);
    piece.style.setProperty('--x-mid', `${xMid.toFixed(1)}px`);
    piece.style.setProperty('--y-mid', `${yMid.toFixed(1)}px`);
    piece.style.setProperty('--x-end', `${(xMid * 1.12).toFixed(1)}px`);
    piece.style.setProperty('--y-end', `${(yMid + fall).toFixed(1)}px`);
    piece.style.setProperty('--spin-mid', `${spin.toFixed(0)}deg`);
    piece.style.setProperty('--spin-end', `${(spin * 1.75).toFixed(0)}deg`);
    piece.style.setProperty('--piece-width', `${width.toFixed(1)}px`);
    piece.style.setProperty('--piece-height', `${height.toFixed(1)}px`);
    piece.style.setProperty('--color', colors[index % colors.length]);
    piece.style.setProperty('--delay', `${(Math.random() * (isMajor ? 180 : 100)).toFixed(0)}ms`);
    piece.style.setProperty('--duration', `${(isMajor ? 1550 : 1100) + Math.random() * 350}ms`);
    particles.append(piece);
  }

  streakCelebrationScoreEl.textContent = `${value}!`;
  streakCelebrationParticlesEl.append(particles);
  void streakCelebrationEl.offsetWidth;
  streakCelebrationEl.classList.add('show', milestone);
  streakCelebrationTimeoutId = window.setTimeout(clearStreakCelebration, isMajor ? 2200 : 1650);
}

function prepareAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === 'suspended') audioContext.resume();
  return audioContext;
}

function getSentenceBuildingBgm() {
  return score >= SENTENCE_BUILDING_INTENSE_BGM_THRESHOLD ? builderIntenseBgmEl : builderBgmEl;
}

function getSentenceBuildingBgmVolume() {
  return sentenceBuildingBgmDucked
    ? SENTENCE_BUILDING_FEEDBACK_BGM_VOLUME
    : SENTENCE_BUILDING_BGM_VOLUME;
}

function stopSentenceBuildingBgmFade() {
  window.cancelAnimationFrame(sentenceBuildingBgmFadeAnimationId);
  sentenceBuildingBgmFadeAnimationId = null;
  sentenceBuildingBgmMix = null;
}

function applySentenceBuildingBgmMix(now = performance.now()) {
  const volume = getSentenceBuildingBgmVolume();
  if (!sentenceBuildingBgmMix) {
    [builderBgmEl, builderIntenseBgmEl].forEach(bgmEl => {
      bgmEl.volume = bgmEl === activeBuilderBgmEl && !bgmEl.paused ? volume : 0;
    });
    return true;
  }

  const { from, to, startedAt, duration } = sentenceBuildingBgmMix;
  const progress = Math.min(1, Math.max(0, (now - startedAt) / duration));
  const eased = progress * progress * (3 - 2 * progress);
  if (from) from.volume = volume * (1 - eased);
  to.volume = volume * eased;

  if (progress < 1) return false;
  if (from) {
    from.pause();
    from.currentTime = 0;
    from.volume = 0;
  }
  sentenceBuildingBgmMix = null;
  sentenceBuildingBgmFadeAnimationId = null;
  to.volume = volume;
  return true;
}

function runSentenceBuildingBgmFade(now) {
  if (applySentenceBuildingBgmMix(now)) return;
  sentenceBuildingBgmFadeAnimationId = window.requestAnimationFrame(runSentenceBuildingBgmFade);
}

function beginSentenceBuildingBgmFade(from, to, duration = SENTENCE_BUILDING_BGM_FADE_DURATION) {
  stopSentenceBuildingBgmFade();
  const mix = { from, to, startedAt: performance.now(), duration };
  sentenceBuildingBgmMix = mix;
  to.volume = 0;
  to.play().then(() => {
    if (sentenceBuildingBgmMix !== mix) {
      to.pause();
      return;
    }
    sentenceBuildingBgmFadeAnimationId = window.requestAnimationFrame(runSentenceBuildingBgmFade);
  }).catch(() => {
    if (sentenceBuildingBgmMix !== mix) return;
    sentenceBuildingBgmMix = null;
    to.pause();
    if (from) {
      activeBuilderBgmEl = from;
      from.volume = getSentenceBuildingBgmVolume();
    }
  });
}

function startSentenceBuildingBgm() {
  const nextBgmEl = getSentenceBuildingBgm();
  if (activeBuilderBgmEl !== nextBgmEl) {
    const previousBgmEl = activeBuilderBgmEl;
    activeBuilderBgmEl = nextBgmEl;
    beginSentenceBuildingBgmFade(previousBgmEl, nextBgmEl);
    return;
  }
  if (sentenceBuildingBgmMix || !activeBuilderBgmEl.paused) return;
  beginSentenceBuildingBgmFade(null, activeBuilderBgmEl, 700);
}

function pauseSentenceBuildingBgm() {
  stopSentenceBuildingBgmFade();
  [builderBgmEl, builderIntenseBgmEl].forEach(bgmEl => bgmEl.pause());
}

function stopSentenceBuildingBgm() {
  window.clearTimeout(sentenceBuildingFeedbackVolumeTimeoutId);
  sentenceBuildingFeedbackVolumeTimeoutId = null;
  sentenceBuildingBgmDucked = false;
  stopSentenceBuildingBgmFade();
  [builderBgmEl, builderIntenseBgmEl].forEach(bgmEl => {
    bgmEl.pause();
    bgmEl.currentTime = 0;
    bgmEl.volume = 0;
  });
  activeBuilderBgmEl = builderBgmEl;
}

function playSentenceBuildingFeedbackSound(type) {
  window.clearTimeout(sentenceBuildingFeedbackVolumeTimeoutId);
  sentenceBuildingBgmDucked = true;
  applySentenceBuildingBgmMix();
  playFeedbackSound(`builder-${type}`);
  sentenceBuildingFeedbackVolumeTimeoutId = window.setTimeout(() => {
    sentenceBuildingBgmDucked = false;
    applySentenceBuildingBgmMix();
    sentenceBuildingFeedbackVolumeTimeoutId = null;
  }, 650);
}

function playFeedbackSound(type) {
  if (!prepareAudio()) return;
  const startTime = audioContext.currentTime;
  const tones = FEEDBACK_TONES[type] || [];

  tones.forEach(tone => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const toneStart = startTime + tone.delay;
    const toneEnd = toneStart + tone.duration;
    oscillator.type = tone.wave || 'triangle';
    oscillator.frequency.setValueAtTime(tone.frequency, toneStart);
    if (tone.endFrequency) {
      oscillator.frequency.exponentialRampToValueAtTime(tone.endFrequency, toneEnd);
    }
    gain.gain.setValueAtTime(.0001, toneStart);
    gain.gain.exponentialRampToValueAtTime(tone.volume, toneStart + (tone.attack || .018));
    gain.gain.exponentialRampToValueAtTime(.0001, toneEnd);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.addEventListener('ended', () => {
      oscillator.disconnect();
      gain.disconnect();
    }, { once: true });
    oscillator.start(toneStart);
    oscillator.stop(toneEnd);
  });
}

function resetFlashFeedback() {
  primeFlashEl.className = 'flash';
  grammarFlashEl.className = 'flash';
  ingFlashEl.className = 'flash';
  sentenceErrorFlashEl.className = 'flash';
  toInfinitiveIFlashEl.className = 'flash';
  toInfinitiveIIFlashEl.className = 'flash';
  prepositionFlashEl.className = 'flash';
  builderFlashEl.className = 'flash';
}

function stopPrimeTimer() {
  window.clearTimeout(primeTimeoutId);
  window.clearInterval(primeTickIntervalId);
  window.cancelAnimationFrame(primeTimerAnimationId);
  primeTimeoutId = null;
  primeTickIntervalId = null;
  primeTimerAnimationId = null;
}

function updatePrimeTimer() {
  const remaining = Math.max(0, primeDeadline - performance.now());
  const ratio = primeTimeLimit ? remaining / primeTimeLimit : 0;
  primeTimerBarEl.style.transform = `scaleX(${ratio})`;
  primeTimerLabelEl.textContent = `${(remaining / 1000).toFixed(1)}초`;
  primeTimerEl.classList.toggle('urgent', ratio <= .34);
  if (remaining > 0) primeTimerAnimationId = window.requestAnimationFrame(updatePrimeTimer);
}

function getPrimeExplanation() {
  if (isPrime(currentNumber)) return `${currentNumber}은(는) 소수입니다.`;
  return `${currentNumber}은(는) 합성수입니다.\n${currentNumber} = ${getPrimeFactors(currentNumber).join(' × ')}`;
}

function handlePrimeTimeout() {
  if (!acceptingInput || activeActivity !== 'prime') return;
  acceptingInput = false;
  stopPrimeTimer();
  playFeedbackSound('wrong');
  showFlash(primeFlashEl, 'wrong');
  showAnswerFeedback('prime', 'wrong', '✕ 시간 초과!', `정답: ${isPrime(currentNumber) ? '소수' : '합성수'}`, null);
  finishRound(`시간이 초과되었습니다.\n${getPrimeExplanation()}`);
}

function startPrimeTimer() {
  stopPrimeTimer();
  primeTimeLimit = currentNumber < 100 ? 2000 : 3000;
  primeDeadline = performance.now() + primeTimeLimit;
  primeTimerEl.classList.remove('urgent');
  primeTimerBarEl.style.transform = 'scaleX(1)';
  primeTimerLabelEl.textContent = `${(primeTimeLimit / 1000).toFixed(1)}초`;
  primeTimeoutId = window.setTimeout(handlePrimeTimeout, primeTimeLimit);
  primeTickIntervalId = window.setInterval(() => {
    if (performance.now() < primeDeadline - 100) playFeedbackSound('tick');
  }, 1000);
  primeTimerAnimationId = window.requestAnimationFrame(updatePrimeTimer);
}

function stopGrammarTimer() {
  window.clearTimeout(grammarTimeoutId);
  window.clearInterval(grammarTickIntervalId);
  window.cancelAnimationFrame(grammarTimerAnimationId);
  grammarTimeoutId = null;
  grammarTickIntervalId = null;
  grammarTimerAnimationId = null;
}

function updateGrammarTimer() {
  const remaining = Math.max(0, grammarDeadline - performance.now());
  const ratio = remaining / 5000;
  grammarTimerBarEl.style.transform = `scaleX(${ratio})`;
  grammarTimerLabelEl.textContent = `${(remaining / 1000).toFixed(1)}초`;
  grammarTimerEl.classList.toggle('urgent', ratio <= .34);
  if (remaining > 0) grammarTimerAnimationId = window.requestAnimationFrame(updateGrammarTimer);
}

function getCurrentUsageNote() {
  if (suppressedUsageNotes.has(currentVerb.verb)) return '';
  return USAGE_NOTES[currentVerb.verb] || '';
}

function handleGrammarTimeout() {
  if (!acceptingInput || activeActivity !== 'grammar') return;
  acceptingInput = false;
  stopGrammarTimer();
  playFeedbackSound('wrong');
  showFlash(grammarFlashEl, 'wrong');
  showAnswerFeedback('grammar', 'wrong', '✕ 시간 초과!', `정답: ${CATEGORY_LABELS[currentVerb.category]}`, null);
  const note = getCurrentUsageNote();
  finishRound(`시간이 초과되었습니다.\n${currentVerb.verb}의 정답은 ‘${CATEGORY_LABELS[currentVerb.category]}’입니다.${note ? `\n\n${note}` : ''}`);
}

function startGrammarTimer() {
  stopGrammarTimer();
  grammarDeadline = performance.now() + 5000;
  grammarTimerEl.classList.remove('urgent');
  grammarTimerBarEl.style.transform = 'scaleX(1)';
  grammarTimerLabelEl.textContent = '5.0초';
  grammarTimeoutId = window.setTimeout(handleGrammarTimeout, 5000);
  grammarTickIntervalId = window.setInterval(() => {
    if (performance.now() < grammarDeadline - 100) playFeedbackSound('tick');
  }, 1000);
  grammarTimerAnimationId = window.requestAnimationFrame(updateGrammarTimer);
}

function stopIngTimer() {
  window.clearTimeout(ingTimeoutId);
  window.clearInterval(ingTickIntervalId);
  window.cancelAnimationFrame(ingTimerAnimationId);
  ingTimeoutId = null;
  ingTickIntervalId = null;
  ingTimerAnimationId = null;
}

function updateIngTimer() {
  const remaining = Math.max(0, ingDeadline - performance.now());
  const ratio = remaining / ING_TIME_LIMIT;
  ingTimerBarEl.style.transform = `scaleX(${ratio})`;
  ingTimerLabelEl.textContent = `${(remaining / 1000).toFixed(1)}초`;
  ingTimerEl.classList.toggle('urgent', ratio <= .34);
  if (remaining > 0) ingTimerAnimationId = window.requestAnimationFrame(updateIngTimer);
}

function parseMarkedText(marked) {
  const match = marked.match(/^(.*)\[([^\]]+)\](.*)$/);
  if (!match) return { before: '', target: marked, after: '' };
  return { before: match[1], target: match[2], after: match[3] };
}

function getIngGrammarExplanation(item) {
  const { before, after } = parseMarkedText(item.marked);
  const words = before.trim().replace(/[.,!?]+$/, '').split(/\s+/).filter(Boolean);
  const previousWord = words.at(-1) || '';
  const previousPhrase = previousWord === 'up' && words.length > 1
    ? `${words.at(-2)} up`
    : previousWord;
  const nextWord = after.trim().replace(/^[.,!?]+/, '').split(/\s+/).filter(Boolean)[0] || '';
  const nounLabels = {
    baby: '아기', dog: '개', sun: '태양', water: '물',
    girl: '소녀', man: '남자', students: '학생들', bird: '새', woman: '여자',
    children: '아이들', boy: '소년', horse: '말', leaves: '나뭇잎들',
    someone: '누군가', me: '나', him: '그',
    bag: '가방', car: '객차', pool: '수영장', room: '방', machine: '기계',
    lamp: '램프', lot: '주차 공간', stick: '지팡이', shoes: '신발', rod: '낚싯대',
    boat: '배', gloves: '장갑', oil: '기름', desk: '책상', rink: '링크',
    cart: '카트', school: '학교', glass: '잔', table: '탁자', cap: '모자'
  };
  const objectParticle = noun => {
    const lastCode = noun.charCodeAt(noun.length - 1) - 0xac00;
    const hasFinalConsonant = lastCode >= 0 && lastCode <= 11171 && lastCode % 28 !== 0;
    return hasFinalConsonant ? '을' : '를';
  };
  const usesFollowingNoun = item.role === 'noun-modifier-before' || item.role === 'noun-purpose';
  const modifiedNounKey = usesFollowingNoun ? nextWord : previousWord;
  const modifiedNoun = nounLabels[modifiedNounKey];
  const determiner = usesFollowingNoun ? previousWord : words.at(-2);
  const modifiedNounEnglish = `${['a', 'an', 'the'].includes(determiner) ? `${determiner} ` : ''}${modifiedNounKey}`.trim();
  const modifiedNounDisplay = modifiedNoun ? `${modifiedNoun}(${modifiedNounEnglish})` : '';
  const plainSentence = item.marked.replace(/[\[\]]/g, '');
  const subjectMatch = plainSentence.match(/^(.+?)\s+(?:is|takes|keeps|makes|can)\b/i);
  const complementSubject = before.trim().replace(/\s+(?:is|was)$/i, '');
  const answer = item.answer === 'gerund' ? '동명사' : '현재분사';
  const explanations = {
    subject: subjectMatch ? `“${subjectMatch[1]}”가 문장의 주어로 쓰인 동명사` : '문장의 주어로 쓰인 동명사',
    'verb-object': `동사 ${previousPhrase}의 목적어로 쓰인 동명사`,
    'preposition-object': `전치사 ${previousWord}의 목적어로 쓰인 동명사`,
    complement: `“${complementSubject}”의 내용을 설명하는 보어로 쓰인 동명사`,
    'fixed-expression': 'There is no use -ing 관용 표현에 쓰인 동명사',
    'omitted-preposition': '생략된 전치사 in의 목적어로 쓰인 동명사',
    'worth-complement': '형용사 worth 뒤에 쓰인 동명사',
    'noun-purpose': modifiedNounDisplay ? `“${modifiedNounDisplay}”의 용도를 나타내는 동명사` : '뒤 명사의 용도를 나타내는 동명사',
    progressive: `be동사 ${previousWord}와 함께 진행형을 만드는 현재분사`,
    'noun-modifier-before': modifiedNounDisplay ? `“${modifiedNounDisplay}”${objectParticle(modifiedNoun)} 꾸며주는 현재분사` : '뒤 명사를 꾸며주는 현재분사',
    'noun-modifier-after': modifiedNounDisplay ? `“${modifiedNounDisplay}”${objectParticle(modifiedNoun)} 꾸며주는 현재분사` : '앞 명사를 꾸며주는 현재분사',
    'object-complement': modifiedNounDisplay ? `“${modifiedNounDisplay}”의 동작을 설명하는 목적격 보어인 현재분사` : '목적어의 동작을 설명하는 목적격 보어인 현재분사',
    'simultaneous-action': `${words[0] === 'She' ? '그녀' : '그'}의 동시 동작을 나타내는 현재분사`,
    'adjective-complement': `“${complementSubject}”의 상태를 설명하는 보어로 쓰인 현재분사`
  };
  return {
    text: explanations[item.role] || `문장 속에서 쓰인 ${answer}`,
    focus: modifiedNounDisplay,
    answer
  };
}

function appendIngGrammarExplanation(container, item) {
  const explanation = getIngGrammarExplanation(item);
  const highlights = [
    { text: explanation.focus, className: 'ing-grammar-focus' },
    { text: explanation.answer, className: 'ing-grammar-answer' }
  ].filter(highlight => highlight.text && explanation.text.includes(highlight.text));
  let position = 0;

  while (position < explanation.text.length) {
    const next = highlights
      .map(highlight => ({ ...highlight, index: explanation.text.indexOf(highlight.text, position) }))
      .filter(highlight => highlight.index >= 0)
      .sort((a, b) => a.index - b.index)[0];
    if (!next) {
      container.append(document.createTextNode(explanation.text.slice(position)));
      break;
    }
    container.append(document.createTextNode(explanation.text.slice(position, next.index)));
    const emphasis = document.createElement('strong');
    emphasis.className = next.className;
    emphasis.textContent = next.text;
    container.append(emphasis);
    position = next.index + next.text.length;
  }
}

function appendMarkedSentence(container, marked) {
  const { before, target, after } = parseMarkedText(marked);
  container.append(document.createTextNode(before));
  const emphasis = document.createElement('strong');
  emphasis.className = 'marked-ing';
  emphasis.textContent = target;
  container.append(emphasis, document.createTextNode(after));
}

function appendEmphasizedMeaning(container, text, emphasisText) {
  if (!emphasisText || !text.includes(emphasisText)) {
    container.append(document.createTextNode(text));
    return;
  }
  const [before, after] = text.split(emphasisText);
  container.append(document.createTextNode(before));
  const emphasis = document.createElement('strong');
  emphasis.className = 'ing-meaning-emphasis';
  emphasis.textContent = emphasisText;
  container.append(emphasis, document.createTextNode(after));
}

function createIngResultExplanation(item, timedOut = false) {
  const wrapper = document.createElement('div');
  wrapper.className = 'ing-result';

  const answer = document.createElement('div');
  answer.className = 'ing-result__answer';
  answer.textContent = `${timedOut ? '시간 초과 · ' : ''}정답: ${ING_ANSWER_LABELS[item.answer]}`;
  wrapper.append(answer);

  const sentenceSection = document.createElement('div');
  sentenceSection.className = 'ing-result__section';
  const sentenceLabel = document.createElement('span');
  sentenceLabel.className = 'ing-result__label';
  sentenceLabel.textContent = '예문';
  const sentence = document.createElement('div');
  sentence.className = 'ing-result__sentence';
  appendMarkedSentence(sentence, item.marked);
  sentenceSection.append(sentenceLabel, sentence);
  wrapper.append(sentenceSection);

  const translationSection = document.createElement('div');
  translationSection.className = 'ing-result__section';
  const translationLabel = document.createElement('span');
  translationLabel.className = 'ing-result__label';
  translationLabel.textContent = '해석';
  const translation = document.createElement('div');
  translation.className = 'ing-result__translation';
  appendEmphasizedMeaning(translation, item.translation, item.focus);
  translationSection.append(translationLabel, translation);
  wrapper.append(translationSection);

  const grammarSection = document.createElement('div');
  grammarSection.className = 'ing-result__section';
  const grammarLabel = document.createElement('span');
  grammarLabel.className = 'ing-result__label';
  grammarLabel.textContent = '설명';
  const grammar = document.createElement('div');
  grammar.className = 'ing-result__grammar';
  appendIngGrammarExplanation(grammar, item);
  grammarSection.append(grammarLabel, grammar);
  wrapper.append(grammarSection);

  return wrapper;
}

function createToInfinitiveExplanation(item, activity, timedOut = false) {
  const labels = activity === 'to-infinitive-i'
    ? TO_INFINITIVE_I_ANSWER_LABELS
    : TO_INFINITIVE_II_ANSWER_LABELS;
  const wrapper = document.createElement('div');
  wrapper.className = 'to-result';

  const answer = document.createElement('div');
  answer.className = 'to-result__answer';
  answer.textContent = `${timedOut ? '시간 초과 · ' : ''}정답: ${labels[item.answer]}`;
  wrapper.append(answer);

  const addSection = (labelText, className) => {
    const section = document.createElement('div');
    section.className = 'to-result__section';
    const label = document.createElement('span');
    label.className = 'to-result__label';
    label.textContent = labelText;
    const content = document.createElement('div');
    content.className = className;
    section.append(label, content);
    wrapper.append(section);
    return content;
  };

  const sentence = addSection('예문', 'to-result__sentence');
  appendMarkedSentence(sentence, item.marked);

  const translation = addSection('해석', 'to-result__translation');
  appendEmphasizedMeaning(translation, item.translation, item.meaning);
  translation.querySelector('strong')?.classList.add('to-result__meaning');

  const explanation = addSection('설명', 'to-result__explanation');
  explanation.append(document.createTextNode(item.explanation));
  const type = document.createElement('strong');
  type.className = 'to-result__type';
  type.textContent = labels[item.answer];
  explanation.append(type);
  return wrapper;
}

function appendSentenceDiff(container, item, version) {
  item.diff.forEach(segment => {
    if (version === 'incorrect' && segment.type === 'insert') return;
    if (version === 'correct' && segment.type === 'delete') return;
    const leadingSpace = segment.text.match(/^\s+/u)?.[0] || '';
    const textAfterLeadingSpace = segment.text.slice(leadingSpace.length);
    const trailingSpace = textAfterLeadingSpace.match(/\s+$/u)?.[0] || '';
    const highlightedText = textAfterLeadingSpace.slice(
      0,
      textAfterLeadingSpace.length - trailingSpace.length
    );

    if (leadingSpace) container.append(document.createTextNode(leadingSpace));
    if (segment.type === 'delete') {
      if (highlightedText) {
        const deleted = document.createElement('del');
        deleted.className = 'sentence-diff__delete';
        deleted.textContent = highlightedText;
        container.append(deleted);
      }
    } else if (segment.type === 'insert') {
      if (highlightedText) {
        const inserted = document.createElement('ins');
        inserted.className = 'sentence-diff__insert';
        inserted.textContent = highlightedText;
        container.append(inserted);
      }
    } else if (highlightedText) {
      container.append(document.createTextNode(highlightedText));
    }
    if (trailingSpace) container.append(document.createTextNode(trailingSpace));
  });
}

function getSentenceChangeSummaries(item) {
  const summaries = [];
  let deleted = '';
  let inserted = '';
  const flush = () => {
    const before = deleted.trim();
    const after = inserted.trim();
    if (before || after) summaries.push({ before, after });
    deleted = '';
    inserted = '';
  };

  item.diff.forEach(segment => {
    if (segment.type === 'same') {
      if (segment.text.trim()) flush();
      return;
    }
    if (segment.type === 'delete') deleted += segment.text;
    if (segment.type === 'insert') inserted += segment.text;
  });
  flush();
  return summaries;
}

function createSentenceErrorSection(labelText, className = 'sentence-error-result__text') {
  const section = document.createElement('div');
  section.className = 'sentence-error-result__section';
  const label = document.createElement('span');
  label.className = 'sentence-error-result__label';
  label.textContent = labelText;
  const content = document.createElement('div');
  content.className = className;
  section.append(label, content);
  return { section, content };
}

function createSentenceErrorExplanation(item, presentedVariant = 'incorrect') {
  const wrapper = document.createElement('div');
  wrapper.className = 'sentence-error-result';

  if (presentedVariant === 'correct') {
    const correct = createSentenceErrorSection('맞음', 'sentence-diff');
    correct.content.textContent = item.correct;
    wrapper.append(correct.section);
    return wrapper;
  }

  const incorrect = createSentenceErrorSection('틀림', 'sentence-diff');
  appendSentenceDiff(incorrect.content, item, 'incorrect');
  wrapper.append(incorrect.section);

  const correct = createSentenceErrorSection('맞음', 'sentence-diff');
  appendSentenceDiff(correct.content, item, 'correct');
  wrapper.append(correct.section);

  const summaries = getSentenceChangeSummaries(item);
  if (summaries.length) {
    const changes = createSentenceErrorSection('바뀐 부분', 'sentence-change-list');
    summaries.forEach(({ before, after }) => {
      const chip = document.createElement('span');
      chip.className = 'sentence-change-chip';
      if (before) {
        const deleted = document.createElement('del');
        deleted.className = 'sentence-diff__delete';
        deleted.textContent = before;
        chip.append(deleted);
      }
      if (before && after) chip.append(document.createTextNode(' → '));
      if (after) {
        const inserted = document.createElement('ins');
        inserted.className = 'sentence-diff__insert';
        inserted.textContent = after;
        chip.append(inserted);
      }
      if (before && !after) chip.append(document.createTextNode(' 삭제'));
      if (!before && after) chip.append(document.createTextNode(' 추가'));
      changes.content.append(chip);
    });
    wrapper.append(changes.section);
  }

  const reason = createSentenceErrorSection('이유');
  reason.content.textContent = item.reason;
  wrapper.append(reason.section);

  if (item.translation) {
    const translation = createSentenceErrorSection('해석');
    translation.content.textContent = item.translation;
    wrapper.append(translation.section);
  }
  return wrapper;
}

function handleIngTimeout() {
  if (!acceptingInput || activeActivity !== 'ing') return;
  acceptingInput = false;
  stopIngTimer();
  playFeedbackSound('wrong');
  showFlash(ingFlashEl, 'wrong');
  showAnswerFeedback('ing', 'wrong', '✕ 시간 초과!', `정답: ${ING_ANSWER_LABELS[currentIngItem.answer]}`, null);
  finishRound(createIngResultExplanation(currentIngItem, true));
}

function startIngTimer() {
  stopIngTimer();
  ingDeadline = performance.now() + ING_TIME_LIMIT;
  ingTimerEl.classList.remove('urgent');
  ingTimerBarEl.style.transform = 'scaleX(1)';
  ingTimerLabelEl.textContent = `${(ING_TIME_LIMIT / 1000).toFixed(1)}초`;
  ingTimeoutId = window.setTimeout(handleIngTimeout, ING_TIME_LIMIT);
  ingTickIntervalId = window.setInterval(() => {
    if (performance.now() < ingDeadline - 100) playFeedbackSound('tick');
  }, 1000);
  ingTimerAnimationId = window.requestAnimationFrame(updateIngTimer);
}

function stopSentenceErrorTimer() {
  window.clearTimeout(sentenceErrorTimeoutId);
  window.clearInterval(sentenceErrorTickIntervalId);
  window.cancelAnimationFrame(sentenceErrorTimerAnimationId);
  sentenceErrorTimeoutId = null;
  sentenceErrorTickIntervalId = null;
  sentenceErrorTimerAnimationId = null;
}

function updateSentenceErrorTimer() {
  const remaining = Math.max(0, sentenceErrorDeadline - performance.now());
  const ratio = remaining / SENTENCE_ERROR_TIME_LIMIT;
  sentenceErrorTimerBarEl.style.transform = `scaleX(${ratio})`;
  sentenceErrorTimerLabelEl.textContent = `${(remaining / 1000).toFixed(1)}초`;
  sentenceErrorTimerEl.classList.toggle('urgent', ratio <= .34);
  if (remaining > 0) sentenceErrorTimerAnimationId = window.requestAnimationFrame(updateSentenceErrorTimer);
}

function handleSentenceErrorTimeout() {
  if (!acceptingInput || activeActivity !== 'sentence-error') return;
  acceptingInput = false;
  recordSentenceErrorPracticeAnswer(false);
  stopSentenceErrorTimer();
  playFeedbackSound('wrong');
  showFlash(sentenceErrorFlashEl, 'wrong');
  const expected = currentSentenceErrorVariant === 'correct' ? 'correct' : 'incorrect';
  showAnswerFeedback(
    'sentence-error',
    'wrong',
    '✕ 시간 초과!',
    `정답: ${SENTENCE_ERROR_ANSWER_LABELS[expected]}`,
    null,
    expected
  );
  finishRound(
    createSentenceErrorExplanation(currentSentenceErrorItem, currentSentenceErrorVariant),
    720,
    `정답: ${SENTENCE_ERROR_ANSWER_LABELS[expected]}`
  );
}

function startSentenceErrorTimer() {
  stopSentenceErrorTimer();
  sentenceErrorDeadline = performance.now() + SENTENCE_ERROR_TIME_LIMIT;
  sentenceErrorTimerEl.classList.remove('urgent');
  sentenceErrorTimerBarEl.style.transform = 'scaleX(1)';
  sentenceErrorTimerLabelEl.textContent = `${(SENTENCE_ERROR_TIME_LIMIT / 1000).toFixed(1)}초`;
  sentenceErrorTimeoutId = window.setTimeout(handleSentenceErrorTimeout, SENTENCE_ERROR_TIME_LIMIT);
  sentenceErrorTickIntervalId = window.setInterval(() => {
    if (performance.now() < sentenceErrorDeadline - 100) playFeedbackSound('tick');
  }, 1000);
  sentenceErrorTimerAnimationId = window.requestAnimationFrame(updateSentenceErrorTimer);
}

function getSentenceBuildingTimeLimit() {
  if (score >= 30) return 5000;
  if (score >= 20) return 8000;
  if (score >= 10) return 11000;
  return 13000;
}

function updateSentenceBuildingIntensityUI() {
  sentenceBuildingScreen.classList.toggle(
    'high-tension',
    activeActivity === 'sentence-building'
      && score >= SENTENCE_BUILDING_INTENSE_BGM_THRESHOLD
  );
}

function stopSentenceBuildingTimer() {
  window.clearTimeout(sentenceBuildingTimeoutId);
  window.clearInterval(sentenceBuildingTickIntervalId);
  window.cancelAnimationFrame(sentenceBuildingTimerAnimationId);
  sentenceBuildingTimeoutId = null;
  sentenceBuildingTickIntervalId = null;
  sentenceBuildingTimerAnimationId = null;
}

function updateSentenceBuildingTimer() {
  const remaining = Math.max(0, sentenceBuildingDeadline - performance.now());
  const ratio = remaining / sentenceBuildingTimeLimit;
  builderTimerBarEl.style.transform = `scaleX(${ratio})`;
  builderTimerLabelEl.textContent = `${(remaining / 1000).toFixed(1)}초`;
  builderTimerEl.classList.toggle('urgent', ratio <= .34);
  if (remaining > 0) {
    sentenceBuildingTimerAnimationId = window.requestAnimationFrame(updateSentenceBuildingTimer);
  }
}

function handleSentenceBuildingTimeout() {
  if (!acceptingInput || activeActivity !== 'sentence-building' || studyMode) return;
  acceptingInput = false;
  stopSentenceBuildingTimer();
  builderUndoButton.disabled = true;
  builderResetButton.disabled = true;
  playSentenceBuildingFeedbackSound('wrong');
  showFlash(builderFlashEl, 'wrong');
  showAnswerFeedback('sentence-building', 'wrong', '아쉬워요!', '시간이 다 됐어요.');
  const attemptedChunks = currentBuilderSelection.map(index => currentSentenceBuildingItem.chunks[index]);
  finishRound(createSentenceBuildingExplanation(currentSentenceBuildingItem, attemptedChunks), 760);
}

function startSentenceBuildingTimer() {
  stopSentenceBuildingTimer();
  if (studyMode || activeActivity !== 'sentence-building') return;
  sentenceBuildingTimeLimit = getSentenceBuildingTimeLimit();
  sentenceBuildingDeadline = performance.now() + sentenceBuildingTimeLimit;
  builderTimerEl.classList.remove('urgent');
  builderTimerBarEl.style.transform = 'scaleX(1)';
  builderTimerLabelEl.textContent = `${(sentenceBuildingTimeLimit / 1000).toFixed(1)}초`;
  sentenceBuildingTimeoutId = window.setTimeout(handleSentenceBuildingTimeout, sentenceBuildingTimeLimit);
  sentenceBuildingTickIntervalId = window.setInterval(() => {
    if (performance.now() < sentenceBuildingDeadline - 100) playFeedbackSound('builder-tick');
  }, 1000);
  sentenceBuildingTimerAnimationId = window.requestAnimationFrame(updateSentenceBuildingTimer);
}

function getToInfinitiveActivityConfig(activity = activeActivity) {
  if (activity === 'to-infinitive-i') {
    return {
      items: TO_INFINITIVE_I_ITEMS,
      current: currentToInfinitiveIItem,
      recentIds: recentToInfinitiveIIds,
      sentence: toInfinitiveISentenceEl,
      score: toInfinitiveIScoreEl,
      best: toInfinitiveIBestEl,
      flash: toInfinitiveIFlashEl,
      timer: toInfinitiveITimerEl,
      timerLabel: toInfinitiveITimerLabelEl,
      timerBar: toInfinitiveITimerBarEl,
      timeLimit: getToInfinitiveTimeLimit('to-infinitive-i'),
      labels: TO_INFINITIVE_I_ANSWER_LABELS
    };
  }
  if (activity === 'to-infinitive-ii') {
    return {
      items: TO_INFINITIVE_II_ITEMS,
      current: currentToInfinitiveIIItem,
      recentIds: recentToInfinitiveIIIds,
      sentence: toInfinitiveIISentenceEl,
      score: toInfinitiveIIScoreEl,
      best: toInfinitiveIIBestEl,
      flash: toInfinitiveIIFlashEl,
      timer: toInfinitiveIITimerEl,
      timerLabel: toInfinitiveIITimerLabelEl,
      timerBar: toInfinitiveIITimerBarEl,
      timeLimit: getToInfinitiveTimeLimit('to-infinitive-ii'),
      labels: TO_INFINITIVE_II_ANSWER_LABELS
    };
  }
  return null;
}

function getToInfinitiveTimeLimit(activity) {
  const baseLimit = activity === 'to-infinitive-i'
    ? TO_INFINITIVE_I_TIME_LIMIT
    : TO_INFINITIVE_II_TIME_LIMIT;
  return !studyMode && score >= 10 ? baseLimit - 2000 : baseLimit;
}

function updateToInfinitiveDifficultyUI() {
  toInfinitiveIIScreen.classList.toggle('hide-radial-hints', !studyMode && score >= 10);
}

function stopToInfinitiveTimer() {
  window.clearTimeout(toInfinitiveTimeoutId);
  window.clearInterval(toInfinitiveTickIntervalId);
  window.cancelAnimationFrame(toInfinitiveTimerAnimationId);
  toInfinitiveTimeoutId = null;
  toInfinitiveTickIntervalId = null;
  toInfinitiveTimerAnimationId = null;
}

function updateToInfinitiveTimer() {
  const config = getToInfinitiveActivityConfig();
  if (!config) return;
  const remaining = Math.max(0, toInfinitiveDeadline - performance.now());
  const ratio = remaining / config.timeLimit;
  config.timerBar.style.transform = `scaleX(${ratio})`;
  config.timerLabel.textContent = `${(remaining / 1000).toFixed(1)}초`;
  config.timer.classList.toggle('urgent', ratio <= .34);
  if (remaining > 0) toInfinitiveTimerAnimationId = window.requestAnimationFrame(updateToInfinitiveTimer);
}

function handleToInfinitiveTimeout() {
  const config = getToInfinitiveActivityConfig();
  if (!acceptingInput || !config) return;
  acceptingInput = false;
  stopToInfinitiveTimer();
  playFeedbackSound('wrong');
  showFlash(config.flash, 'wrong');
  showAnswerFeedback(activeActivity, 'wrong', '✕ 시간 초과!', `정답: ${config.labels[config.current.answer]}`, null, config.current.answer);
  finishRound(createToInfinitiveExplanation(config.current, activeActivity, true), 720, `정답: ${config.labels[config.current.answer]}`);
}

function startToInfinitiveTimer() {
  stopToInfinitiveTimer();
  const config = getToInfinitiveActivityConfig();
  if (!config) return;
  toInfinitiveDeadline = performance.now() + config.timeLimit;
  config.timer.classList.remove('urgent');
  config.timerBar.style.transform = 'scaleX(1)';
  config.timerLabel.textContent = `${(config.timeLimit / 1000).toFixed(1)}초`;
  toInfinitiveTimeoutId = window.setTimeout(handleToInfinitiveTimeout, config.timeLimit);
  toInfinitiveTickIntervalId = window.setInterval(() => {
    if (performance.now() < toInfinitiveDeadline - 100) playFeedbackSound('tick');
  }, 1000);
  toInfinitiveTimerAnimationId = window.requestAnimationFrame(updateToInfinitiveTimer);
}

function clearAnswerFeedback(activity) {
  const screen = ACTIVITY_SCREENS[activity];
  const feedback = ACTIVITY_FEEDBACK[activity];
  if (!screen || !feedback) return;
  screen.querySelectorAll('.choice').forEach(button => {
    button.classList.remove('answer-selected', 'answer-correct', 'answer-wrong');
  });
  feedback.className = 'answer-feedback';
}

function showAnswerFeedback(activity, type, title, detail, answer, correctAnswer = '') {
  clearAnswerFeedback(activity);
  const screen = ACTIVITY_SCREENS[activity];
  const feedback = ACTIVITY_FEEDBACK[activity];
  const attribute = ACTIVITY_ANSWER_ATTRIBUTES[activity];
  if (!screen || !feedback) return;
  const selectedButton = answer && attribute ? screen.querySelector(`[${attribute}="${answer}"]`) : null;
  if (selectedButton) {
    selectedButton.classList.add('answer-selected', type === 'correct' ? 'answer-correct' : 'answer-wrong');
    selectedButton.focus({ preventScroll: true });
  }
  const correctButton = correctAnswer && attribute ? screen.querySelector(`[${attribute}="${correctAnswer}"]`) : null;
  if (type === 'wrong' && correctButton && correctButton !== selectedButton) correctButton.classList.add('answer-correct');
  feedback.querySelector('strong').textContent = title;
  feedback.querySelector('span').textContent = detail;
  void feedback.offsetWidth;
  feedback.classList.add(type, 'show');
}

function isPrime(number) {
  if (number < 2) return false;
  if (number === 2) return true;
  if (number % 2 === 0) return false;
  for (let divisor = 3; divisor <= Math.sqrt(number); divisor += 2) {
    if (number % divisor === 0) return false;
  }
  return true;
}

function getPrimeFactors(number) {
  const factors = [];
  let remaining = number;
  for (let divisor = 2; divisor * divisor <= remaining; divisor += divisor === 2 ? 1 : 2) {
    while (remaining % divisor === 0) {
      factors.push(divisor);
      remaining /= divisor;
    }
  }
  if (remaining > 1) factors.push(remaining);
  return factors;
}

function nextPrimeNumber() {
  let next;
  do { next = Math.floor(Math.random() * 298) + 2; } while (next === currentNumber);
  currentNumber = next;
  numberEl.textContent = currentNumber;
  animateCard(numberEl);
}

function nextVerb() {
  if (studyMode) {
    const selection = getStudySelection(VERBS, item => item.verb, recentVerbs);
    currentVerb = selection.item;
    currentStudyItemId = selection.id;
    currentStudyItemIsReview = selection.isReview;
  } else {
    const availableVerbs = VERBS.filter(item => !recentVerbs.includes(item.verb));
    currentVerb = availableVerbs[Math.floor(Math.random() * availableVerbs.length)];
    currentStudyItemId = '';
    currentStudyItemIsReview = false;
  }
  recentVerbs.push(currentVerb.verb);
  if (recentVerbs.length > VERB_COOLDOWN) recentVerbs.shift();
  verbEl.textContent = currentVerb.verb;
  animateCard(verbEl);
}

function nextIngItem() {
  let nextIndex;
  if (studyMode) {
    const selection = getStudySelection(
      ING_QUESTIONS,
      item => String(ING_QUESTIONS.indexOf(item)),
      recentIngIndexes.map(String)
    );
    nextIndex = Number(selection.id);
    currentStudyItemId = selection.id;
    currentStudyItemIsReview = selection.isReview;
  } else {
    const availableIndexes = ING_QUESTIONS
      .map((item, index) => index)
      .filter(index => !recentIngIndexes.includes(index));
    nextIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
    currentStudyItemId = '';
    currentStudyItemIsReview = false;
  }
  currentIngIndex = nextIndex;
  currentIngItem = ING_QUESTIONS[currentIngIndex];
  recentIngIndexes.push(currentIngIndex);
  if (recentIngIndexes.length > ING_COOLDOWN) recentIngIndexes.shift();
  ingSentenceEl.replaceChildren();
  appendMarkedSentence(ingSentenceEl, currentIngItem.marked);
  animateCard(ingSentenceEl);
}

function getForcedSentenceErrorVerdict() {
  if (recentSentenceErrorVerdicts.length < 3) return '';
  const lastThree = recentSentenceErrorVerdicts.slice(-3);
  return lastThree.every(verdict => verdict === lastThree[0])
    ? lastThree[0] === 'correct' ? 'incorrect' : 'correct'
    : '';
}

function pickSentenceErrorVariant(item, isReview, variants = item.variants) {
  const forcedVerdict = getForcedSentenceErrorVerdict();
  if (forcedVerdict && variants.includes(forcedVerdict)) return forcedVerdict;
  const previousVariant = sentenceErrorLastVariantById.get(item.id);
  const oppositeVariant = previousVariant === 'correct' ? 'incorrect' : 'correct';
  if (isReview && previousVariant && variants.includes(oppositeVariant)) return oppositeVariant;
  return variants[Math.floor(Math.random() * variants.length)];
}

function nextSentenceErrorItem() {
  if (!SENTENCE_ERROR_ITEMS.length) return false;
  const forcedVerdict = getForcedSentenceErrorVerdict();
  let selection;

  if (studyMode) {
    selection = getStudySelection(
      SENTENCE_ERROR_ITEMS,
      item => item.id,
      recentSentenceErrorIds
    );
  } else {
    selection = getSentenceErrorPracticeSelection();
  }

  if (!selection) {
    const hasUnscheduledVariant = item => item.variants.some(variant => (
      !sentenceErrorPracticeState.reviews[getSentenceErrorQuestionKey(item.id, variant)]
    ));
    const outsideCooldown = SENTENCE_ERROR_ITEMS.filter(item => (
      !recentSentenceErrorIds.includes(item.id) && hasUnscheduledVariant(item)
    ));
    let candidates = outsideCooldown.filter(item => item.correct !== lastSentenceErrorCorrect);
    if (!candidates.length) {
      candidates = SENTENCE_ERROR_ITEMS.filter(item => (
        item.correct !== lastSentenceErrorCorrect && hasUnscheduledVariant(item)
      ));
    }
    if (!candidates.length) {
      candidates = outsideCooldown.length
        ? outsideCooldown
        : SENTENCE_ERROR_ITEMS.filter(hasUnscheduledVariant);
    }
    if (!candidates.length) candidates = SENTENCE_ERROR_ITEMS;
    if (forcedVerdict) {
      const balancedCandidates = candidates.filter(item => (
        item.variants.includes(forcedVerdict)
        && !sentenceErrorPracticeState.reviews[getSentenceErrorQuestionKey(item.id, forcedVerdict)]
      ));
      if (balancedCandidates.length) candidates = balancedCandidates;
    }
    const item = pickWeightedItem(candidates);
    const availableVariants = item.variants.filter(variant => (
      !sentenceErrorPracticeState.reviews[getSentenceErrorQuestionKey(item.id, variant)]
    ));
    selection = {
      item,
      id: item.id,
      isReview: false,
      availableVariants: availableVariants.length ? availableVariants : item.variants
    };
  }

  currentSentenceErrorItem = selection.item;
  currentStudyItemId = studyMode ? selection.id : '';
  currentStudyItemIsReview = studyMode && selection.isReview;
  currentSentenceErrorVariant = selection.variant || pickSentenceErrorVariant(
    currentSentenceErrorItem,
    currentStudyItemIsReview,
    selection.availableVariants
  );
  currentSentenceErrorQuestionKey = studyMode
    ? ''
    : getSentenceErrorQuestionKey(currentSentenceErrorItem.id, currentSentenceErrorVariant);
  sentenceErrorLastVariantById.set(currentSentenceErrorItem.id, currentSentenceErrorVariant);
  recentSentenceErrorIds.push(currentSentenceErrorItem.id);
  if (recentSentenceErrorIds.length > SENTENCE_ERROR_COOLDOWN) recentSentenceErrorIds.shift();
  recentSentenceErrorVerdicts.push(currentSentenceErrorVariant);
  if (recentSentenceErrorVerdicts.length > 3) recentSentenceErrorVerdicts.shift();
  if (!studyMode) lastSentenceErrorCorrect = currentSentenceErrorItem.correct;
  sentenceErrorSentenceEl.textContent = currentSentenceErrorItem[currentSentenceErrorVariant];
  animateCard(sentenceErrorSentenceEl);
  return true;
}

function nextToInfinitiveItem(activity) {
  const config = getToInfinitiveActivityConfig(activity);
  if (!config?.items.length) return false;
  let selection;
  if (studyMode) {
    selection = getStudySelection(config.items, item => item.id, config.recentIds);
    currentStudyItemId = selection.id;
    currentStudyItemIsReview = selection.isReview;
  } else {
    const candidates = config.items.filter(item => !config.recentIds.includes(item.id));
    const item = pickWeightedItem(candidates.length ? candidates : config.items);
    selection = { item, id: item.id, isReview: false };
    currentStudyItemId = '';
    currentStudyItemIsReview = false;
  }

  if (activity === 'to-infinitive-i') currentToInfinitiveIItem = selection.item;
  else currentToInfinitiveIIItem = selection.item;
  config.recentIds.push(selection.item.id);
  if (config.recentIds.length > TO_INFINITIVE_COOLDOWN) config.recentIds.shift();
  config.sentence.replaceChildren();
  appendMarkedSentence(config.sentence, selection.item.marked);
  animateCard(config.sentence);
  updateToInfinitiveDifficultyUI();
  layoutRadialActivity(ACTIVITY_SCREENS[activity], activity === 'to-infinitive-i' ? 3 : 6);
  scheduleActivityTask(scheduleRadialLayout, 190);
  return true;
}

function shufflePrepositionChoices(item) {
  const choices = [...item.choices];
  for (let index = choices.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [choices[index], choices[swapIndex]] = [choices[swapIndex], choices[index]];
  }

  const correctSlot = choices.indexOf(item.targetPreposition);
  if (correctSlot === lastPrepositionCorrectSlot) {
    const offset = Math.floor(Math.random() * (choices.length - 1)) + 1;
    const swapIndex = (correctSlot + offset) % choices.length;
    [choices[correctSlot], choices[swapIndex]] = [choices[swapIndex], choices[correctSlot]];
  }
  lastPrepositionCorrectSlot = choices.indexOf(item.targetPreposition);
  return choices;
}

function renderParticiplePrepositionItem() {
  const item = currentParticiplePrepositionItem;
  if (!item) return;
  prepositionSentenceEl.textContent = item.sentence;
  shufflePrepositionChoices(item).forEach((choice, index) => {
    const button = prepositionChoicesEl.children[index];
    button.dataset.prepositionAnswer = choice;
    button.querySelector('span').textContent = choice;
    button.setAttribute('aria-label', `${index + 1}번, ${choice}`);
  });
  animateCard(prepositionSentenceEl);
}

function nextParticiplePrepositionItem() {
  if (!PARTICIPLE_PREPOSITION_ITEMS.length) return false;
  if (studyMode) {
    const selection = getStudySelection(
      PARTICIPLE_PREPOSITION_ITEMS,
      item => item.id,
      recentParticiplePrepositionIds
    );
    currentParticiplePrepositionItem = selection.item;
    currentStudyItemId = selection.id;
    currentStudyItemIsReview = selection.isReview;
  } else {
    const candidates = PARTICIPLE_PREPOSITION_ITEMS.filter(item => (
      !recentParticiplePrepositionIds.includes(item.id)
    ));
    currentParticiplePrepositionItem = pickWeightedItem(
      candidates.length ? candidates : PARTICIPLE_PREPOSITION_ITEMS
    );
    currentStudyItemId = '';
    currentStudyItemIsReview = false;
  }
  recentParticiplePrepositionIds.push(currentParticiplePrepositionItem.id);
  if (recentParticiplePrepositionIds.length > PARTICIPLE_PREPOSITION_COOLDOWN) {
    recentParticiplePrepositionIds.shift();
  }
  renderParticiplePrepositionItem();
  return true;
}

function appendCompletedPrepositionSentence(container, item, answer, markAnswer = false) {
  const [before, after] = item.sentence.split('___');
  container.append(document.createTextNode(before));
  if (markAnswer) {
    const mark = document.createElement('mark');
    mark.textContent = answer;
    container.append(mark);
  } else {
    container.append(document.createTextNode(answer));
  }
  container.append(document.createTextNode(after));
}

function createParticiplePrepositionExplanation(item, selectedAnswer = '') {
  const wrapper = document.createElement('div');
  wrapper.className = 'preposition-result';

  if (selectedAnswer && !item.acceptedPrepositions.includes(selectedAnswer)) {
    const attempt = document.createElement('div');
    attempt.className = 'preposition-result__attempt';
    appendCompletedPrepositionSentence(attempt, item, selectedAnswer);
    wrapper.append(attempt);
  }

  const correct = document.createElement('div');
  correct.className = 'preposition-result__correct';
  appendCompletedPrepositionSentence(correct, item, item.targetPreposition, true);

  const combination = document.createElement('div');
  combination.className = 'preposition-result__combination';
  const phrase = document.createElement('strong');
  phrase.textContent = `${item.participle} ${item.targetPreposition}`;
  const meaning = document.createElement('span');
  meaning.textContent = item.meaning;
  combination.append(phrase, meaning);
  wrapper.append(correct, combination);
  return wrapper;
}

function stopParticiplePrepositionTimer() {
  window.clearTimeout(prepositionTimeoutId);
  window.clearInterval(prepositionTickIntervalId);
  window.cancelAnimationFrame(prepositionTimerAnimationId);
  prepositionTimeoutId = null;
  prepositionTickIntervalId = null;
  prepositionTimerAnimationId = null;
}

function updateParticiplePrepositionTimer() {
  const remaining = Math.max(0, prepositionDeadline - performance.now());
  const ratio = remaining / PARTICIPLE_PREPOSITION_TIME_LIMIT;
  prepositionTimerBarEl.style.transform = `scaleX(${ratio})`;
  prepositionTimerLabelEl.textContent = `${(remaining / 1000).toFixed(1)}초`;
  prepositionTimerEl.classList.toggle('urgent', ratio <= .34);
  if (remaining > 0) {
    prepositionTimerAnimationId = window.requestAnimationFrame(updateParticiplePrepositionTimer);
  }
}

function handleParticiplePrepositionTimeout() {
  if (!acceptingInput || activeActivity !== 'participle-preposition' || studyMode) return;
  acceptingInput = false;
  stopParticiplePrepositionTimer();
  const item = currentParticiplePrepositionItem;
  const targetCombination = `${item.participle} ${item.targetPreposition}`;
  playFeedbackSound('wrong');
  showFlash(prepositionFlashEl, 'wrong');
  showAnswerFeedback(
    'participle-preposition',
    'wrong',
    '✕ 시간 초과!',
    targetCombination,
    null,
    item.targetPreposition
  );
  finishRound(
    createParticiplePrepositionExplanation(item),
    720,
    `정답: ${item.targetPreposition}`
  );
}

function startParticiplePrepositionTimer() {
  stopParticiplePrepositionTimer();
  prepositionDeadline = performance.now() + PARTICIPLE_PREPOSITION_TIME_LIMIT;
  prepositionTimerEl.classList.remove('urgent');
  prepositionTimerBarEl.style.transform = 'scaleX(1)';
  prepositionTimerLabelEl.textContent = `${(PARTICIPLE_PREPOSITION_TIME_LIMIT / 1000).toFixed(1)}초`;
  prepositionTimeoutId = window.setTimeout(
    handleParticiplePrepositionTimeout,
    PARTICIPLE_PREPOSITION_TIME_LIMIT
  );
  prepositionTickIntervalId = window.setInterval(() => {
    if (performance.now() < prepositionDeadline - 100) playFeedbackSound('tick');
  }, 1000);
  prepositionTimerAnimationId = window.requestAnimationFrame(updateParticiplePrepositionTimer);
}

function chooseParticiplePreposition(answer) {
  if (
    !acceptingInput
    || activeActivity !== 'participle-preposition'
    || !currentParticiplePrepositionItem
  ) return;
  acceptingInput = false;
  stopParticiplePrepositionTimer();
  const item = currentParticiplePrepositionItem;
  const isCorrect = item.acceptedPrepositions.includes(answer);
  const targetCombination = `${item.participle} ${item.targetPreposition}`;

  if (isCorrect) {
    const studyResult = studyMode ? recordStudyAnswer(currentStudyItemId, true) : null;
    score += 1;
    prepositionScoreEl.textContent = score;
    prepositionBestEl.textContent = studyMode
      ? getPendingStudyCount()
      : Math.max(score, getPlayerBest('participle-preposition'));
    playFeedbackSound('correct');
    showFlash(prepositionFlashEl, 'correct');
    const detail = studyResult?.mastered
      ? '2회 연속 정답! 오답 목록에서 제외했어요.'
      : studyResult?.correctStreak
        ? `${studyResult.correctStreak}회 연속 정답`
        : targetCombination;
    showAnswerFeedback(
      'participle-preposition',
      'correct',
      '✓ 정답!',
      detail,
      answer
    );
    if (!studyMode) celebrateStreak(score);
    scheduleActivityTask(() => {
      clearAnswerFeedback('participle-preposition');
      nextParticiplePrepositionItem();
      acceptingInput = true;
      if (!studyMode) startParticiplePrepositionTimer();
      focusActivityControl('participle-preposition');
    }, studyMode ? 650 : getNextRoundDelay(score));
    return;
  }

  if (studyMode) {
    recordStudyAnswer(currentStudyItemId, false);
    score += 1;
    prepositionScoreEl.textContent = score;
    prepositionBestEl.textContent = getPendingStudyCount();
  }
  playFeedbackSound('wrong');
  showFlash(prepositionFlashEl, 'wrong');
  showAnswerFeedback(
    'participle-preposition',
    'wrong',
    studyMode ? '✕ 다시 확인해요!' : '✕ 오답!',
    targetCombination,
    answer,
    item.targetPreposition
  );
  const explanation = createParticiplePrepositionExplanation(item, answer);
  if (studyMode) {
    scheduleActivityTask(() => {
      clearAnswerFeedback('participle-preposition');
      showStudyExplanation(explanation);
    }, 650);
    return;
  }
  finishRound(explanation, 720, `정답: ${item.targetPreposition}`);
}

function formatSentenceBuildingChunk(item, chunk) {
  if (score < SENTENCE_BUILDING_PUNCTUATION_REMOVAL_SCORE) return chunk;
  let formatted = chunk.replace(/[.,!?;:]/g, '');
  if (score < SENTENCE_BUILDING_CAPITAL_HINT_REMOVAL_SCORE) return formatted;
  if (chunk !== item.answer[0]) return formatted;
  const firstWord = formatted.match(/^[A-Za-z]+/)?.[0] || '';
  if (!SENTENCE_BUILDING_LOWERCASE_STARTS.has(firstWord.toLowerCase())) return formatted;
  return formatted.replace(/^[A-Z]/, letter => letter.toLowerCase());
}

function renderSentenceBuildingBoard() {
  const item = currentSentenceBuildingItem;
  builderAnswerEl.replaceChildren();
  builderBankEl.replaceChildren();
  if (!item) return;

  const totalCharacters = item.chunks.reduce((total, chunk) => total + chunk.length, 0);
  const longestChunk = Math.max(...item.chunks.map(chunk => chunk.length));
  builderBoardEl.dataset.size = item.chunks.length <= 3 && totalCharacters <= 34 && longestChunk <= 22
    ? 'large'
    : item.chunks.length <= 4 && totalCharacters <= 54
      ? 'medium'
      : 'standard';

  currentBuilderSelection.forEach((chunkIndex, selectedIndex) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'builder-chip';
    chip.textContent = formatSentenceBuildingChunk(item, item.chunks[chunkIndex]);
    chip.setAttribute('aria-label', `${chip.textContent}, 선택 취소`);
    chip.addEventListener('click', () => {
      if (!acceptingInput) return;
      currentBuilderSelection.splice(selectedIndex, 1);
      renderSentenceBuildingBoard();
    });
    builderAnswerEl.append(chip);
  });

  item.chunks.forEach((chunk, chunkIndex) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'builder-chip';
    chip.textContent = formatSentenceBuildingChunk(item, chunk);
    chip.disabled = currentBuilderSelection.includes(chunkIndex);
    chip.addEventListener('click', () => selectSentenceBuildingChunk(chunkIndex));
    builderBankEl.append(chip);
  });

  builderUndoButton.disabled = !currentBuilderSelection.length || !acceptingInput;
  builderResetButton.disabled = !currentBuilderSelection.length || !acceptingInput;
}

function resetSentenceBuildingBoard() {
  if (!acceptingInput) return;
  currentBuilderSelection = [];
  renderSentenceBuildingBoard();
}

function undoSentenceBuildingChunk() {
  if (!acceptingInput || !currentBuilderSelection.length) return;
  currentBuilderSelection.pop();
  renderSentenceBuildingBoard();
}

function createSentenceBuildingExplanation(item, attemptedChunks = []) {
  const wrapper = document.createElement('div');
  wrapper.className = 'builder-result';
  if (attemptedChunks.length) {
    const attempted = document.createElement('div');
    attempted.className = 'builder-result__attempt';
    attempted.textContent = attemptedChunks.join(' ');
    wrapper.append(attempted);
  }
  const correct = document.createElement('div');
  correct.className = 'builder-result__correct';
  const mark = document.createElement('mark');
  mark.textContent = item.sentence;
  correct.append(mark);
  wrapper.append(correct);
  return wrapper;
}

function getBuilderCorrectMessage() {
  const candidates = BUILDER_CORRECT_MESSAGES.filter(message => message !== lastBuilderCorrectMessage);
  const message = candidates[Math.floor(Math.random() * candidates.length)];
  lastBuilderCorrectMessage = message;
  return message;
}

function nextSentenceBuildingItem() {
  if (!SENTENCE_BUILDING_ITEMS.length) return false;
  let selection;
  if (studyMode) {
    selection = getStudySelection(SENTENCE_BUILDING_ITEMS, item => item.id, recentSentenceBuildingIds);
    currentStudyItemId = selection.id;
    currentStudyItemIsReview = selection.isReview;
  } else {
    const candidates = SENTENCE_BUILDING_ITEMS.filter(item => !recentSentenceBuildingIds.includes(item.id));
    const item = pickWeightedItem(candidates.length ? candidates : SENTENCE_BUILDING_ITEMS);
    selection = { item, id: item.id, isReview: false };
    currentStudyItemId = '';
    currentStudyItemIsReview = false;
  }
  currentSentenceBuildingItem = selection.item;
  currentBuilderSelection = [];
  recentSentenceBuildingIds.push(selection.id);
  if (recentSentenceBuildingIds.length > SENTENCE_BUILDING_COOLDOWN) recentSentenceBuildingIds.shift();
  renderSentenceBuildingBoard();
  animateCard(document.querySelector('.builder-board'));
  return true;
}

function selectSentenceBuildingChunk(chunkIndex) {
  if (!acceptingInput || activeActivity !== 'sentence-building') return;
  startSentenceBuildingBgm();
  if (currentBuilderSelection.includes(chunkIndex)) return;
  currentBuilderSelection.push(chunkIndex);
  renderSentenceBuildingBoard();
  if (currentBuilderSelection.length < currentSentenceBuildingItem.chunks.length) return;
  acceptingInput = false;
  stopSentenceBuildingTimer();
  builderUndoButton.disabled = true;
  builderResetButton.disabled = true;
  scheduleActivityTask(checkSentenceBuildingAnswer, 220);
}

function checkSentenceBuildingAnswer() {
  const item = currentSentenceBuildingItem;
  if (!item) return;
  const attemptedChunks = currentBuilderSelection.map(index => item.chunks[index]);
  const isCorrect = attemptedChunks.every((chunk, index) => chunk === item.answer[index]);
  if (isCorrect) {
    const studyResult = studyMode ? recordStudyAnswer(currentStudyItemId, true) : null;
    score += 1;
    updateSentenceBuildingIntensityUI();
    startSentenceBuildingBgm();
    playSentenceBuildingFeedbackSound('correct');
    builderScoreEl.textContent = score;
    builderBestEl.textContent = studyMode ? getPendingStudyCount() : Math.max(score, getPlayerBest('sentence-building'));
    showFlash(builderFlashEl, 'correct');
    showAnswerFeedback(
      'sentence-building',
      'correct',
      getBuilderCorrectMessage(),
      studyResult?.mastered ? '완전히 익혔어요!' : ''
    );
    if (!studyMode) celebrateStreak(score);
    scheduleActivityTask(() => {
      clearAnswerFeedback('sentence-building');
      nextSentenceBuildingItem();
      acceptingInput = true;
      renderSentenceBuildingBoard();
      if (!studyMode) startSentenceBuildingTimer();
    }, studyMode ? 800 : getNextRoundDelay(score));
    return;
  }

  if (studyMode) {
    recordStudyAnswer(currentStudyItemId, false);
    score += 1;
    updateSentenceBuildingIntensityUI();
    builderScoreEl.textContent = score;
    builderBestEl.textContent = getPendingStudyCount();
  }
  playSentenceBuildingFeedbackSound('wrong');
  showFlash(builderFlashEl, 'wrong');
  showAnswerFeedback('sentence-building', 'wrong', '아쉬워요!', '정답을 같이 확인해 봐요.');
  const explanation = createSentenceBuildingExplanation(item, attemptedChunks);
  if (studyMode) {
    scheduleActivityTask(() => {
      clearAnswerFeedback('sentence-building');
      showStudyExplanation(explanation, '올바른 문장');
    }, 720);
    return;
  }
  finishRound(explanation, 760);
}

function stopAllTimers() {
  stopPrimeTimer();
  stopGrammarTimer();
  stopIngTimer();
  stopSentenceErrorTimer();
  stopToInfinitiveTimer();
  stopParticiplePrepositionTimer();
  stopSentenceBuildingTimer();
}

function closeAllModals() {
  resultModal.classList.remove('show');
  infoModal.classList.remove('show');
  studyExplanationModal.classList.remove('show');
  screens.forEach(screen => { screen.inert = false; });
}

function openModal(modal, focusTarget) {
  screens.forEach(screen => { screen.inert = true; });
  modal.classList.add('show');
  // Apply the visible state before moving focus. Chromium otherwise ignores
  // focus() when the element was visibility:hidden earlier in the same task.
  void modal.offsetWidth;
  focusTarget?.focus({ preventScroll: true });
}

function closeModal(modal) {
  modal.classList.remove('show');
  if (!document.querySelector('.modal.show')) {
    screens.forEach(screen => { screen.inert = false; });
  }
}

function trapModalFocus(event, modal) {
  const controls = [...modal.querySelectorAll(
    'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
  )].filter(element => element.getClientRects().length);
  if (!controls.length) return;
  const first = controls[0];
  const last = controls.at(-1);
  const focusIsOutsideModal = !modal.contains(document.activeElement);
  if (event.shiftKey && (document.activeElement === first || focusIsOutsideModal)) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && (document.activeElement === last || focusIsOutsideModal)) {
    event.preventDefault();
    first.focus();
  }
}

function focusActivityControl(activity = activeActivity) {
  const screen = ACTIVITY_SCREENS[activity];
  const control = activity === 'sentence-building'
    ? builderBankEl.querySelector('.builder-chip:not(:disabled)')
    : screen?.querySelector('.choice:not(:disabled)');
  control?.focus({ preventScroll: true });
}

function resetRecentQuestionHistory() {
  recentVerbs = [];
  recentIngIndexes = [];
  recentSentenceErrorIds = [];
  recentSentenceErrorVerdicts = [];
  lastSentenceErrorCorrect = '';
  recentToInfinitiveIIds = [];
  recentToInfinitiveIIIds = [];
  recentParticiplePrepositionIds = [];
  lastPrepositionCorrectSlot = -1;
  recentSentenceBuildingIds = [];
}

function startActivity(activity) {
  const screen = ACTIVITY_SCREENS[activity];
  if (!screen) {
    console.warn(`[Quick Tap] 알 수 없는 활동: ${activity}`);
    showScreen(menuScreen);
    return;
  }
  invalidateActivitySession();
  activeActivity = activity;
  score = 0;
  updateSentenceBuildingIntensityUI();
  acceptingInput = false;
  closeAllModals();
  resetFlashFeedback();
  clearStreakCelebration();
  stopAllTimers();
  if (activity === 'sentence-building') startSentenceBuildingBgm();
  else stopSentenceBuildingBgm();
  clearAnswerFeedback(activity);
  sentenceErrorEmptyEl.hidden = true;
  currentStudyItemId = '';
  currentStudyItemIsReview = false;
  currentSentenceErrorQuestionKey = '';
  if (studyMode && STUDY_ACTIVITY_KEYS.has(activity)) studyState = loadStudyState();
  if (activity === 'sentence-error' && !studyMode) {
    sentenceErrorPracticeState = loadSentenceErrorPracticeState();
    sentenceErrorRetryQuestionKey = sentenceErrorPracticeState.lastWrongKey;
  } else {
    sentenceErrorRetryQuestionKey = '';
  }
  updateStudyModeUI();

  if (activity === 'prime') {
    primeScoreEl.textContent = '0';
    primeBestEl.textContent = getPlayerBest('prime');
    showScreen(primeScreen);
    nextPrimeNumber();
  } else if (activity === 'grammar') {
    suppressedUsageNotes.clear();
    grammarScoreEl.textContent = '0';
    grammarBestEl.textContent = studyMode ? getPendingStudyCount() : getPlayerBest('grammar');
    showScreen(grammarScreen);
    nextVerb();
  } else if (activity === 'ing') {
    ingScoreEl.textContent = '0';
    ingBestEl.textContent = studyMode ? getPendingStudyCount() : getPlayerBest('ing');
    showScreen(ingScreen);
    nextIngItem();
  } else if (activity === 'sentence-error') {
    sentenceErrorScoreEl.textContent = '0';
    sentenceErrorBestEl.textContent = studyMode ? getPendingStudyCount() : getPlayerBest('sentence-error');
    showScreen(sentenceErrorScreen);
    if (!nextSentenceErrorItem()) {
      sentenceErrorEmptyEl.hidden = false;
      sentenceErrorStartButton.disabled = true;
      return;
    }
  } else if (activity === 'to-infinitive-i' || activity === 'to-infinitive-ii') {
    const config = getToInfinitiveActivityConfig(activity);
    config.score.textContent = '0';
    config.best.textContent = studyMode ? getPendingStudyCount() : getPlayerBest(activity);
    showScreen(ACTIVITY_SCREENS[activity]);
    if (!nextToInfinitiveItem(activity)) return;
  } else if (activity === 'participle-preposition') {
    prepositionScoreEl.textContent = '0';
    prepositionBestEl.textContent = studyMode ? getPendingStudyCount() : getPlayerBest(activity);
    showScreen(participlePrepositionScreen);
    if (!nextParticiplePrepositionItem()) return;
  } else if (activity === 'sentence-building') {
    builderScoreEl.textContent = '0';
    builderBestEl.textContent = studyMode ? getPendingStudyCount() : getPlayerBest(activity);
    showScreen(sentenceBuildingScreen);
    if (!nextSentenceBuildingItem()) return;
  }
  scheduleActivityTask(() => {
    acceptingInput = true;
    if (activity === 'prime') startPrimeTimer();
    if (activity === 'grammar' && !studyMode) startGrammarTimer();
    if (activity === 'ing' && !studyMode) startIngTimer();
    if (activity === 'sentence-error' && !studyMode) startSentenceErrorTimer();
    if ((activity === 'to-infinitive-i' || activity === 'to-infinitive-ii') && !studyMode) startToInfinitiveTimer();
    if (activity === 'participle-preposition' && !studyMode) startParticiplePrepositionTimer();
    if (activity === 'sentence-building' && !studyMode) startSentenceBuildingTimer();
    focusActivityControl(activity);
  }, 160);
}

function continueStudySession() {
  closeModal(studyExplanationModal);
  clearAnswerFeedback(activeActivity);
  if (activeActivity === 'sentence-building') startSentenceBuildingBgm();
  if (activeActivity === 'grammar') nextVerb();
  if (activeActivity === 'ing') nextIngItem();
  if (activeActivity === 'sentence-error') nextSentenceErrorItem();
  if (activeActivity === 'to-infinitive-i' || activeActivity === 'to-infinitive-ii') nextToInfinitiveItem(activeActivity);
  if (activeActivity === 'participle-preposition') nextParticiplePrepositionItem();
  if (activeActivity === 'sentence-building') nextSentenceBuildingItem();
  scheduleActivityTask(() => {
    acceptingInput = true;
    focusActivityControl();
  }, 120);
}

function toggleStudyMode() {
  if (!acceptingInput || !STUDY_ACTIVITY_KEYS.has(activeActivity)) return;
  studyMode = !studyMode;
  studyModeInput.checked = studyMode;
  score = 0;
  resetRecentQuestionHistory();
  startActivity(activeActivity);
}

function getRandomRoundOverTitle() {
  const candidates = ROUND_OVER_TITLES.filter(title => title !== lastRoundOverTitle);
  const title = candidates[Math.floor(Math.random() * candidates.length)];
  lastRoundOverTitle = title;
  return title;
}

function getAchievementResultMessage(activity, value) {
  const threshold = activity === 'sentence-error' ? 20 : 50;
  if (value < threshold) return '';
  const createMessage = ACHIEVEMENT_RESULT_MESSAGES[
    Math.floor(Math.random() * ACHIEVEMENT_RESULT_MESSAGES.length)
  ];
  return createMessage(value);
}

function renderResultMessage(message, achievementMessage) {
  const hasRichExplanation = typeof message !== 'string';
  resultMessageEl.classList.toggle('has-rich-explanation', hasRichExplanation || Boolean(achievementMessage));
  resultMessageEl.replaceChildren();

  if (achievementMessage) {
    const achievement = document.createElement('p');
    achievement.className = 'achievement-result';
    achievement.textContent = achievementMessage;
    resultMessageEl.append(achievement);
  }

  if (typeof message === 'string') {
    const summary = document.createElement('p');
    summary.className = 'result-text-summary';
    summary.textContent = message;
    resultMessageEl.append(summary);
  } else {
    resultMessageEl.append(message);
  }
}

function finishRound(message, delay = 720, titleDetail = '') {
  acceptingInput = false;
  stopAllTimers();
  if (activeActivity === 'sentence-building') stopSentenceBuildingBgm();
  const best = recordScore(activeActivity, score);
  const achievementMessage = getAchievementResultMessage(activeActivity, score);
  const roundOverTitle = achievementMessage
    ? '대단해요!'
    : activeActivity === 'sentence-building' ? '아쉬워요!' : getRandomRoundOverTitle();
  resultTitleEl.replaceChildren(document.createTextNode(roundOverTitle));
  if (titleDetail) {
    const answer = document.createElement('span');
    answer.className = 'round-over-answer';
    answer.textContent = `(${titleDetail})`;
    resultTitleEl.append(answer);
  }
  finalScoreEl.textContent = score;
  finalBestEl.textContent = best;
  renderResultMessage(message, achievementMessage);
  leaderboardTitleEl.textContent = `${ACTIVITY_LABELS[activeActivity]} 리더보드`;
  renderLeaderboard(activeActivity);
  scheduleActivityTask(() => {
    resultScrollContentEl.scrollTop = 0;
    leaderboardListEl.scrollTop = 0;
    openModal(resultModal, restartButton);
  }, delay);
}

function choosePrime(answer) {
  if (!acceptingInput || activeActivity !== 'prime') return;
  acceptingInput = false;
  stopPrimeTimer();
  const correct = isPrime(currentNumber);
  if (answer === (correct ? 'prime' : 'not-prime')) {
    playFeedbackSound('correct');
    score += 1;
    primeScoreEl.textContent = score;
    primeBestEl.textContent = Math.max(score, getPlayerBest('prime'));
    showFlash(primeFlashEl, 'correct');
    showAnswerFeedback('prime', 'correct', '✓ 정답!', `연속 ${score}개`, answer);
    celebrateStreak(score);
    const nextRoundDelay = getNextRoundDelay(score);
    scheduleActivityTask(() => {
      clearAnswerFeedback('prime');
      nextPrimeNumber();
      acceptingInput = true;
      startPrimeTimer();
    }, nextRoundDelay);
    return;
  }

  playFeedbackSound('wrong');
  showFlash(primeFlashEl, 'wrong');
  showAnswerFeedback('prime', 'wrong', '✕ 오답!', `정답: ${correct ? '소수' : '합성수'}`, answer);
  finishRound(getPrimeExplanation());
}

function showUsageNote() {
  infoTitleEl.textContent = currentVerb.verb;
  infoMessageEl.textContent = USAGE_NOTES[currentVerb.verb];
  hideWordNoteInput.checked = false;
  openModal(infoModal, infoContinueButton);
}

function chooseGrammar(answer) {
  if (!acceptingInput || activeActivity !== 'grammar') return;
  acceptingInput = false;
  stopGrammarTimer();
  if (answer === currentVerb.category) {
    const studyResult = studyMode ? recordStudyAnswer(currentStudyItemId, true) : null;
    playFeedbackSound('correct');
    score += 1;
    grammarScoreEl.textContent = score;
    grammarBestEl.textContent = studyMode ? getPendingStudyCount() : Math.max(score, getPlayerBest('grammar'));
    showFlash(grammarFlashEl, 'correct');
    const studyDetail = studyResult?.mastered
      ? '2회 연속 정답! 오답 목록에서 제외했어요.'
      : studyResult?.correctStreak
        ? `${studyResult.correctStreak}회 연속 정답`
        : CATEGORY_LABELS[currentVerb.category];
    showAnswerFeedback('grammar', 'correct', '✓ 정답!', studyDetail, answer);
    if (!studyMode) celebrateStreak(score);
    const nextRoundDelay = studyMode ? 650 : getNextRoundDelay(score);
    if (getCurrentUsageNote()) {
      scheduleActivityTask(() => {
        clearAnswerFeedback('grammar');
        showUsageNote();
      }, nextRoundDelay);
    } else {
      scheduleActivityTask(() => {
        clearAnswerFeedback('grammar');
        nextVerb();
        acceptingInput = true;
        if (!studyMode) startGrammarTimer();
      }, nextRoundDelay);
    }
    return;
  }

  const studyResult = studyMode ? recordStudyAnswer(currentStudyItemId, false) : null;
  playFeedbackSound('wrong');
  if (studyMode) {
    score += 1;
    grammarScoreEl.textContent = score;
    grammarBestEl.textContent = getPendingStudyCount();
  }
  showFlash(grammarFlashEl, 'wrong');
  showAnswerFeedback(
    'grammar',
    'wrong',
    '✕ 다시 익혀요!',
    `정답: ${CATEGORY_LABELS[currentVerb.category]}`,
    answer
  );
  const usageNote = getCurrentUsageNote();
  const note = usageNote ? `\n\n${usageNote}` : '';
  if (studyMode) {
    scheduleActivityTask(() => {
      clearAnswerFeedback('grammar');
      showStudyExplanation(`${currentVerb.verb}의 정답은 ‘${CATEGORY_LABELS[currentVerb.category]}’입니다.${note}`);
    }, 650);
    return;
  }
  finishRound(`${currentVerb.verb}의 정답은 ‘${CATEGORY_LABELS[currentVerb.category]}’입니다.${note}`);
}

function chooseIng(answer) {
  if (!acceptingInput || activeActivity !== 'ing') return;
  acceptingInput = false;
  stopIngTimer();
  if (answer === currentIngItem.answer) {
    const studyResult = studyMode ? recordStudyAnswer(currentStudyItemId, true) : null;
    playFeedbackSound('correct');
    score += 1;
    ingScoreEl.textContent = score;
    ingBestEl.textContent = studyMode ? getPendingStudyCount() : Math.max(score, getPlayerBest('ing'));
    showFlash(ingFlashEl, 'correct');
    const studyDetail = studyResult?.mastered
      ? '2회 연속 정답! 오답 목록에서 제외했어요.'
      : studyResult?.correctStreak
        ? `${studyResult.correctStreak}회 연속 정답`
        : ING_ANSWER_LABELS[currentIngItem.answer];
    showAnswerFeedback('ing', 'correct', '✓ 정답!', studyDetail, answer);
    if (!studyMode) celebrateStreak(score);
    const nextRoundDelay = studyMode ? 650 : getNextRoundDelay(score);
    scheduleActivityTask(() => {
      clearAnswerFeedback('ing');
      nextIngItem();
      acceptingInput = true;
      if (!studyMode) startIngTimer();
    }, nextRoundDelay);
    return;
  }

  const studyResult = studyMode ? recordStudyAnswer(currentStudyItemId, false) : null;
  playFeedbackSound('wrong');
  if (studyMode) {
    score += 1;
    ingScoreEl.textContent = score;
    ingBestEl.textContent = getPendingStudyCount();
  }
  showFlash(ingFlashEl, 'wrong');
  showAnswerFeedback(
    'ing',
    'wrong',
    '✕ 다시 익혀요!',
    `정답: ${ING_ANSWER_LABELS[currentIngItem.answer]}`,
    answer
  );
  if (studyMode) {
    scheduleActivityTask(() => {
      clearAnswerFeedback('ing');
      showStudyExplanation(createIngResultExplanation(currentIngItem));
    }, 650);
    return;
  }
  finishRound(createIngResultExplanation(currentIngItem));
}

function chooseSentenceError(answer) {
  if (!acceptingInput || activeActivity !== 'sentence-error' || !currentSentenceErrorItem) return;
  acceptingInput = false;
  const answeredSlowly = isSentenceErrorAnswerSlow();
  stopSentenceErrorTimer();
  const expected = currentSentenceErrorVariant;

  if (answer === expected) {
    recordSentenceErrorPracticeAnswer(true, answeredSlowly);
    const studyResult = studyMode ? recordStudyAnswer(currentStudyItemId, true) : null;
    playFeedbackSound('correct');
    score += 1;
    sentenceErrorScoreEl.textContent = score;
    sentenceErrorBestEl.textContent = studyMode
      ? getPendingStudyCount()
      : Math.max(score, getPlayerBest('sentence-error'));
    showFlash(sentenceErrorFlashEl, 'correct');
    if (!studyMode) {
      celebrateStreak(score);
      scheduleActivityTask(() => {
        nextSentenceErrorItem();
        acceptingInput = true;
        startSentenceErrorTimer();
      }, getNextRoundDelay(score));
      return;
    }

    const studyDetail = studyResult?.mastered
      ? '2회 연속 정답! 오답 목록에서 제외했어요.'
      : studyResult?.correctStreak
        ? `${studyResult.correctStreak}회 연속 정답`
        : expected === 'correct' ? '그대로 쓰면 됩니다.' : '바르게 고쳐 볼게요.';
    showAnswerFeedback(
      'sentence-error',
      'correct',
      expected === 'correct' ? '✓ 맞음!' : '✓ 틀림!',
      studyDetail,
      answer
    );

    if (expected === 'incorrect') {
      scheduleActivityTask(() => {
        clearAnswerFeedback('sentence-error');
        showStudyExplanation(
          createSentenceErrorExplanation(currentSentenceErrorItem, currentSentenceErrorVariant),
          '교정 해설'
        );
      }, 650);
      return;
    }

    scheduleActivityTask(() => {
      clearAnswerFeedback('sentence-error');
      nextSentenceErrorItem();
      acceptingInput = true;
    }, 650);
    return;
  }

  if (studyMode) {
    recordStudyAnswer(currentStudyItemId, false);
    score += 1;
    sentenceErrorScoreEl.textContent = score;
    sentenceErrorBestEl.textContent = getPendingStudyCount();
  }
  recordSentenceErrorPracticeAnswer(false);
  playFeedbackSound('wrong');
  showFlash(sentenceErrorFlashEl, 'wrong');
  showAnswerFeedback(
    'sentence-error',
    'wrong',
    studyMode ? '✕ 다시 확인해요!' : '✕ 오답!',
    `정답: ${SENTENCE_ERROR_ANSWER_LABELS[expected]}`,
    answer,
    expected
  );
  const explanation = createSentenceErrorExplanation(
    currentSentenceErrorItem,
    currentSentenceErrorVariant
  );
  if (studyMode) {
    scheduleActivityTask(() => {
      clearAnswerFeedback('sentence-error');
      showStudyExplanation(explanation);
    }, 650);
    return;
  }
  finishRound(explanation, 720, `정답: ${SENTENCE_ERROR_ANSWER_LABELS[expected]}`);
}

function chooseToInfinitive(answer, activity) {
  if (!acceptingInput || activeActivity !== activity) return;
  const config = getToInfinitiveActivityConfig(activity);
  if (!config?.current) return;
  acceptingInput = false;
  stopToInfinitiveTimer();
  const isCorrect = answer === config.current.answer;

  if (isCorrect) {
    const studyResult = studyMode ? recordStudyAnswer(currentStudyItemId, true) : null;
    playFeedbackSound('correct');
    score += 1;
    config.score.textContent = score;
    config.best.textContent = studyMode ? getPendingStudyCount() : Math.max(score, getPlayerBest(activity));
    updateToInfinitiveDifficultyUI();
    showFlash(config.flash, 'correct');
    const detail = studyResult?.mastered
      ? '2회 연속 정답! 오답 목록에서 제외했어요.'
      : studyResult?.correctStreak
        ? `${studyResult.correctStreak}회 연속 정답`
        : config.labels[config.current.answer];
    showAnswerFeedback(activity, 'correct', '✓ 정답!', detail, answer);
    if (!studyMode) celebrateStreak(score);
    scheduleActivityTask(() => {
      clearAnswerFeedback(activity);
      nextToInfinitiveItem(activity);
      acceptingInput = true;
      if (!studyMode) startToInfinitiveTimer();
    }, studyMode ? 650 : getNextRoundDelay(score));
    return;
  }

  if (studyMode) {
    recordStudyAnswer(currentStudyItemId, false);
    score += 1;
    config.score.textContent = score;
    config.best.textContent = getPendingStudyCount();
  }
  playFeedbackSound('wrong');
  showFlash(config.flash, 'wrong');
  showAnswerFeedback(activity, 'wrong', studyMode ? '✕ 다시 확인해요!' : '✕ 오답!', `정답: ${config.labels[config.current.answer]}`, answer, config.current.answer);
  const explanation = createToInfinitiveExplanation(config.current, activity);
  if (studyMode) {
    scheduleActivityTask(() => {
      clearAnswerFeedback(activity);
      showStudyExplanation(explanation, 'to 부정사 해설');
    }, 650);
    return;
  }
  finishRound(explanation, 720, `정답: ${config.labels[config.current.answer]}`);
}

function chooseActivity(activity) {
  if (!ACTIVITY_SCREENS[activity]) return;
  if (activity === 'sentence-error' && !SENTENCE_ERROR_ITEMS.length) {
    startActivity(activity);
    return;
  }
  invalidateActivitySession();
  activeActivity = activity;
  stopSentenceBuildingBgm();
  studyMode = false;
  studyModeInput.checked = false;
  studyModeOption.hidden = !STUDY_ACTIVITY_KEYS.has(activity);
  populateNames(activity);
  updateWelcomeSelection();
  showScreen(welcomeScreen);
  window.setTimeout(() => nameSelect.focus(), 0);
}

function backToActivityMenu() {
  invalidateActivitySession();
  stopSentenceBuildingBgm();
  stopAllTimers();
  acceptingInput = false;
  closeAllModals();
  clearAnswerFeedback(activeActivity);
  clearStreakCelebration();
  activeActivity = '';
  studyMode = false;
  studyModeInput.checked = false;
  studyModeOption.hidden = true;
  showScreen(menuScreen);
  window.setTimeout(() => menuScreen.querySelector('[data-start]:not(:disabled):not([hidden])')?.focus(), 0);
}

function changePlayer() {
  invalidateActivitySession();
  stopSentenceBuildingBgm();
  acceptingInput = false;
  stopAllTimers();
  closeAllModals();
  clearAnswerFeedback(activeActivity);
  clearStreakCelebration();
  studyModeOption.hidden = !STUDY_ACTIVITY_KEYS.has(activeActivity);
  studyModeInput.checked = studyMode;
  updateWelcomeSelection();
  showScreen(welcomeScreen);
  window.setTimeout(() => nameSelect.focus(), 0);
}

populateNames('');
sentenceErrorStartButton.disabled = !SENTENCE_ERROR_ITEMS.length;
if (!SENTENCE_ERROR_ITEMS.length) {
  sentenceErrorStartButton.setAttribute('aria-disabled', 'true');
  sentenceErrorStartButton.setAttribute('aria-label', '문장 오류 찾기: 등록된 문제가 없습니다.');
}
prepositionStartButton.disabled = !PARTICIPLE_PREPOSITION_ITEMS.length;
if (!PARTICIPLE_PREPOSITION_ITEMS.length) {
  prepositionStartButton.setAttribute('aria-disabled', 'true');
  prepositionStartButton.setAttribute('aria-label', '분사 + 전치사: 등록된 문제가 없습니다.');
}
nameSelect.addEventListener('change', () => {
  const isCustom = nameSelect.value === '__custom__';
  customNameInput.hidden = !isCustom;
  customNameInput.required = isCustom;
  if (isCustom) customNameInput.focus();
});
studyModeInput.addEventListener('change', updateWelcomeSelection);
backToActivitiesButton.addEventListener('click', backToActivityMenu);

nameForm.addEventListener('submit', event => {
  event.preventDefault();
  const chosenName = nameSelect.value === '__custom__' ? customNameInput.value.trim() : nameSelect.value;
  if (!chosenName) {
    customNameInput.focus();
    return;
  }
  playerName = chosenName.slice(0, 20);
  studyMode = STUDY_ACTIVITY_KEYS.has(activeActivity) && studyModeInput.checked;
  writeStorage(getLastPlayerStorageKey(), playerName);
  prepareAudio();
  startActivity(activeActivity);
});
function bindAnswerButtons(selector, onAnswer) {
  document.querySelectorAll(selector).forEach(button => {
    button.addEventListener('click', () => onAnswer(button.dataset));
  });
}

document.querySelectorAll('[data-start]').forEach(button => button.addEventListener('click', () => chooseActivity(button.dataset.start)));
document.querySelectorAll('[data-change-player]').forEach(button => button.addEventListener('click', changePlayer));
document.querySelectorAll('[data-restart-activity]').forEach(button => {
  button.addEventListener('click', () => startActivity(activeActivity));
});
document.querySelectorAll('[data-study-toggle]').forEach(button => button.addEventListener('click', toggleStudyMode));
bindAnswerButtons('[data-prime-answer]', ({ primeAnswer }) => choosePrime(primeAnswer));
bindAnswerButtons('[data-grammar-answer]', ({ grammarAnswer }) => chooseGrammar(grammarAnswer));
bindAnswerButtons('[data-ing-answer]', ({ ingAnswer }) => chooseIng(ingAnswer));
bindAnswerButtons('[data-sentence-error-answer]', ({ sentenceErrorAnswer }) => chooseSentenceError(sentenceErrorAnswer));
bindAnswerButtons('[data-to-i-answer]', ({ toIAnswer }) => chooseToInfinitive(toIAnswer, 'to-infinitive-i'));
bindAnswerButtons('[data-to-ii-answer]', ({ toIiAnswer }) => chooseToInfinitive(toIiAnswer, 'to-infinitive-ii'));
bindAnswerButtons('.preposition-choice', ({ prepositionAnswer }) => chooseParticiplePreposition(prepositionAnswer));
builderUndoButton.addEventListener('click', undoSentenceBuildingChunk);
builderResetButton.addEventListener('click', resetSentenceBuildingBoard);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) pauseSentenceBuildingBgm();
  else if (
    activeActivity === 'sentence-building'
    && sentenceBuildingScreen.classList.contains('active')
    && !resultModal.classList.contains('show')
    && !studyExplanationModal.classList.contains('show')
  ) {
    startSentenceBuildingBgm();
  }
});

infoContinueButton.addEventListener('click', () => {
  if (hideWordNoteInput.checked) suppressedUsageNotes.add(currentVerb.verb);
  closeModal(infoModal);
  nextVerb();
  scheduleActivityTask(() => {
    acceptingInput = true;
    if (!studyMode) startGrammarTimer();
  }, 140);
});

studyExplanationContinueButton.addEventListener('click', continueStudySession);
restartButton.addEventListener('click', () => startActivity(activeActivity));
changeResultPlayerButton.addEventListener('click', changePlayer);
resultBackMenuButton.addEventListener('click', backToActivityMenu);
sentenceErrorEmptyBackButton.addEventListener('click', backToActivityMenu);
resetLeaderboardButton.addEventListener('click', () => {
  const label = ACTIVITY_LABELS[activeActivity];
  if (!window.confirm(`${label} 리더보드의 모든 기록을 지울까요?`)) return;
  removeStorage(`quick-tap-leaderboard-${activeActivity}`);
  renderLeaderboard(activeActivity);
  finalBestEl.textContent = '0';
  const bestElement = activeActivity === 'prime'
    ? primeBestEl
    : ACTIVITY_SCORE_UI[activeActivity]?.best;
  if (bestElement) bestElement.textContent = '0';
  startActivity(activeActivity);
});

document.addEventListener('keydown', event => {
  const target = event.target;
  const visibleModal = document.querySelector('.modal.show');
  if (visibleModal && event.key === 'Tab') {
    trapModalFocus(event, visibleModal);
    return;
  }
  if (
    target instanceof HTMLElement
    && (target.matches('input, select, textarea') || target.isContentEditable)
  ) return;
  if (resultModal.classList.contains('show')) {
    const resultShortcut = event.key.toLowerCase();
    if (event.code === 'KeyC' || resultShortcut === 'c') {
      event.preventDefault();
      changeResultPlayerButton.click();
    }
    if (event.code === 'KeyR' || resultShortcut === 'r') {
      event.preventDefault();
      restartButton.click();
    }
    return;
  }
  if (infoModal.classList.contains('show')) {
    if (event.key === 'Enter' && document.activeElement !== hideWordNoteInput) {
      event.preventDefault();
      infoContinueButton.click();
    }
    return;
  }
  if (studyExplanationModal.classList.contains('show')) {
    const studyShortcut = event.key.toLowerCase();
    if (event.code === 'KeyC' || studyShortcut === 'c') {
      event.preventDefault();
      studyExplanationModal.querySelector('[data-change-player]').click();
      return;
    }
    if (event.code === 'KeyR' || studyShortcut === 'r') {
      event.preventDefault();
      studyExplanationModal.querySelector('[data-restart-activity]').click();
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      studyExplanationContinueButton.click();
    }
    return;
  }
  if (activeActivity === 'prime') {
    if (event.key === 'ArrowUp') choosePrime('prime');
    if (event.key === 'ArrowDown') choosePrime('not-prime');
  }

  if (activeActivity === 'grammar') {
    const answer = GRAMMAR_KEY_ANSWERS[event.key];
    if (answer) {
      event.preventDefault();
      chooseGrammar(answer);
    }
  }

  if (activeActivity === 'ing') {
    if (event.key === 'ArrowUp') chooseIng('gerund');
    if (event.key === 'ArrowDown') chooseIng('participle');
  }

  if (activeActivity === 'sentence-error') {
    if (SENTENCE_ERROR_CORRECT_KEYS.has(event.key)) {
      event.preventDefault();
      chooseSentenceError('correct');
    }
    if (SENTENCE_ERROR_INCORRECT_KEYS.has(event.key)) {
      event.preventDefault();
      chooseSentenceError('incorrect');
    }
  }

  if (activeActivity === 'to-infinitive-i') {
    const answer = TO_INFINITIVE_I_KEY_ANSWERS[event.key];
    if (answer) {
      event.preventDefault();
      chooseToInfinitive(answer, 'to-infinitive-i');
    }
  }

  if (activeActivity === 'to-infinitive-ii') {
    const answer = TO_INFINITIVE_II_KEY_ANSWERS[event.key];
    if (answer) {
      event.preventDefault();
      chooseToInfinitive(answer, 'to-infinitive-ii');
    }
  }

  if (activeActivity === 'participle-preposition' && /^[1-4]$/.test(event.key)) {
    event.preventDefault();
    prepositionChoicesEl.children[Number(event.key) - 1]?.click();
  }

  if (activeActivity === 'sentence-building') {
    if (event.key === 'Backspace') {
      event.preventDefault();
      undoSentenceBuildingChunk();
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      resetSentenceBuildingBoard();
    }
  }
});
