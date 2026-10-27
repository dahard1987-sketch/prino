const PLAYER_NAMES = [
  '박범준', '배승우', '윤해든', '이룩', '이수민', '이우진', '이은수', '이지우',
  '임윤아', '채범기', '한지아', '김경민', '김시아', '이은성',
  '강용제', '김예승', '김재윤', '김하준', '박시현', '박이환', '백시율', '이해원',
  '조현우', '지수연', '황은찬', '김소이', '홍경서', '박정준', '임지율', '장재희', '차예주'
].sort((a, b) => a.localeCompare(b, 'ko'));


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

