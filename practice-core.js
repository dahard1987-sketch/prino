// Fictional practice rosters. Existing class lists are not used.
const PLAYER_NAMES = [
  '강라온', '권새봄', '남도율', '문하늬', '백다원', '서다온',
  '성유안', '송하루', '신아린', '안시온', '오로운', '유나봄',
  '이해솔', '임채린', '전이솔', '정해온', '조하람', '진예담',
  '차도하', '최루아', '한노을', '허도은', '홍서율', '황예온'
].sort((a, b) => a.localeCompare(b, 'ko'));
const HEPTA_PLAYER_NAMES = [
  'Alex', 'Bailey', 'Casey', 'Drew', 'Eden', 'Finley',
  'Harper', 'Jamie', 'Jordan', 'Morgan', 'Riley', 'Rowan'
].map((name, index) => `${PLAYER_NAMES[index]}(${name})`);
const LAST_PLAYER_KEY = 'quick-tap-sample-last-player';
const LAST_HEPTA_PLAYER_KEY = 'quick-tap-sample-last-player-hepta';

const STUDY_REVIEW_INTERVALS = [1, 2, 3, 5, 8, 13, 21, 34, 55];
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

