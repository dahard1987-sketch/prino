(() => {
  'use strict';
  const app = document.querySelector('#app');
  const categories = window.LEVEL3.categories;
  const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
  const save = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Practice remains available without storage. */ } };
  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
    return result;
  }
  let category, player = '', study = false, score = 0, question, deck = [], recent = [], selection = [], tiles = [], locked = false, phase = 0;
  let review, raf, timeout, nextTask, deadline = 0, limit = 0, speechToken = 0, speechFinished = false;
  const boardKey = () => `quick-tap-leaderboard-level3-${category.id}`;
  const reviewKey = () => `quick-tap-study-level3-${category.id}-${encodeURIComponent(player)}`;
  const best = () => read(boardKey(), {})[player] || 0;
  function node(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; }
  function button(text, cls, action) { const b = node('button', cls, text); b.type = 'button'; b.addEventListener('click', action); return b; }
  function stopTimer() { cancelAnimationFrame(raf); clearTimeout(timeout); deadline = 0; }
  function cleanup() { stopTimer(); clearTimeout(nextTask); speechToken++; if ('speechSynthesis' in window) speechSynthesis.cancel(); }
  function screen() { cleanup(); app.replaceChildren(); window.scrollTo(0, 0); }
  function recordBest() { const board = read(boardKey(), {}); board[player] = Math.max(best(), score); save(boardKey(), board); }
  function timeLimit() {
    if (['build', 'transform'].includes(category.id)) return score >= 30 ? 5000 : score >= 20 ? 8000 : score >= 10 ? 11000 : 13000;
    const base = ['context', 'situation', 'error'].includes(category.id) ? 15000 : 10000;
    return Math.max(5000, base - Math.floor(score / 10) * 2000);
  }
  function startTimer() {
    if (study || category.id === 'personal' || locked || deadline) return;
    limit = timeLimit(); deadline = performance.now() + limit;
    timeout = setTimeout(() => finish(false, '시간 초과'), limit);
    function tick() {
      if (!deadline) return;
      const remaining = Math.max(0, deadline - performance.now());
      const label = document.querySelector('#timer-label'), bar = document.querySelector('#timer-bar');
      if (label && bar) { label.textContent = `${(remaining / 1000).toFixed(1)}초`; bar.style.transform = `scaleX(${remaining / limit})`; bar.parentElement.classList.toggle('urgent', remaining / limit <= .34); }
      raf = requestAnimationFrame(tick);
    }
    tick();
  }
  function menu() {
    screen(); category = null;
    const banner = node('section', 'unit-banner');
    const heading = node('div'); heading.append(node('h1', '', 'Unit 2 · 현재완료'));  banner.append(heading); app.append(banner);
    const grid = node('div', 'activity-grid');
    categories.forEach(c => {
      const card = button('', 'activity', () => welcome(c));
      card.append(node('strong', '', c.name)); grid.append(card);
    }); app.append(grid);
  }
  function welcome(c) {
    screen(); category = c;
    const wrap = node('section', 'practice'); wrap.append(button('← Level 3', 'back', menu), node('h1', '', c.name));
    const card = node('form', 'question-card setup');
    const label = node('label', 'sr-only', '플레이어'); label.htmlFor = 'player'; const select = node('select'); select.id = 'player'; select.required = true;
    select.add(new Option('플레이어', '')); PLAYER_NAMES.forEach(n => select.add(new Option(n, n))); select.add(new Option('직접 입력', '__custom__'));
    let previous = ''; try { previous = localStorage.getItem('quick-tap-last-player') || ''; } catch {} if (previous) select.value = PLAYER_NAMES.includes(previous) ? previous : '__custom__';
    const custom = node('input'); custom.type = 'text'; custom.maxLength = 20; custom.placeholder = '이름'; custom.setAttribute('aria-label', '직접 입력할 이름'); custom.hidden = select.value !== '__custom__'; custom.required = !custom.hidden; if (!custom.hidden) custom.value = previous || '';
    select.onchange = () => { custom.hidden = select.value !== '__custom__'; custom.required = !custom.hidden; };
    card.append(label, select, custom);
    const mode = node('label', 'mode-label'); const check = node('input'); check.type = 'checkbox'; mode.append(check, document.createTextNode(' 학습 모드 (시간 제한 없음)'));
    if (c.id !== 'personal') card.append(mode);
    const start = node('button', 'primary', '시작하기'); start.type = 'submit'; card.append(start);
    card.onsubmit = e => { e.preventDefault(); player = select.value === '__custom__' ? custom.value.trim() : select.value; if (!player) { custom.focus(); return; } try { localStorage.setItem('quick-tap-last-player', player); } catch {} study = check.checked; startRound(); };
    wrap.append(card); app.append(wrap);
  }
  function startRound() {
    score = 0; recent = []; deck = shuffle(category.items);
    const stored = read(reviewKey(), { rounds: 0, reviews: {} });
    review = { rounds: Number.isInteger(stored.rounds) ? stored.rounds : 0, reviews: {} };
    category.items.forEach(q => { const r = stored.reviews?.[q.id]; if (r && Number.isInteger(r.stage) && r.stage >= 0 && r.stage < STUDY_REVIEW_INTERVALS.length && Number.isInteger(r.due)) review.reviews[q.id] = r; });
    nextQuestion();
  }
  function pick() {
    if (study || category.id === 'error') {
      const due = Object.entries(review.reviews).filter(([, r]) => r.due <= review.rounds).sort((a,b) => a[1].due - b[1].due || a[1].addedAt - b[1].addedAt);
      if (due.length) return category.items.find(q => q.id === due[0][0]);
    }
    if (!deck.length) deck = shuffle(category.items);
    const index = deck.findIndex(q => !recent.includes(q.id));
    const q = deck.splice(index < 0 ? 0 : index, 1)[0]; recent.push(q.id); recent = recent.slice(-3); return q;
  }
  function nextQuestion() {
    screen(); question = pick(); selection = []; tiles = []; locked = false; phase = 0; speechFinished = false;
    const wrap = node('section', 'practice'); wrap.append(button('← Level 3', 'back', menu));
    const head = node('div', 'session-head'); head.append(node('h1', '', category.name), node('span', 'counter', category.id === 'personal' ? `${score}` : `${study ? '학습' : '연속'} ${score} · 최고 ${best()}`)); wrap.append(head);
    const tools = node('div', 'session-tools'); tools.append(node('span', '', player));
    if (category.id !== 'personal') tools.append(button(study ? '시간 도전' : '학습 모드', 'text-button', () => { study = !study; startRound(); })); wrap.append(tools);
    if (!study && category.id !== 'personal') { const meta = node('div', 'timer-meta'); meta.append(Object.assign(node('strong', '', category.id === 'listening' ? '듣기 후 시작' : `${timeLimit() / 1000}초`), { id: 'timer-label' })); const track = node('div', 'timer-track'); const bar = node('span'); bar.id = 'timer-bar'; track.append(bar); wrap.append(meta, track); }
    const card = node('div', 'question-card'); card.id = 'question-card'; wrap.append(card); app.append(wrap);
    if (['build', 'transform'].includes(category.id)) renderBuilder(card);
    else if (category.id === 'error') renderError(card);
    else if (category.id === 'personal') renderPersonal(card);
    else {
      if (category.id === 'listening') renderListening(card);
      if (category.id !== 'listening') card.append(node('p', category.id === 'context' ? 'context' : 'prompt', question.prompt)); renderChoices(card, question.choices, answer => finish(answer === question.answer, answer));
      if (category.id === 'listening') card.querySelectorAll('.answer').forEach(b => b.disabled = true);
    }
    const feedback = node('div'); feedback.id = 'feedback'; feedback.setAttribute('role', 'status'); feedback.setAttribute('aria-live', 'polite'); card.append(feedback);
    if (category.id !== 'listening') startTimer();
  }
  function renderChoices(parent, options, choose) {
    const choices = node('div', 'choices'); shuffle(options).forEach(answer => choices.append(button(answer, 'answer', () => { if (!locked) choose(answer); }))); parent.append(choices);
  }
  function renderBuilder(card) {
    card.append(node('p', 'context', question.cue)); const assembled = node('div', 'assembled'); assembled.setAttribute('aria-label', '만든 문장'); const bank = node('div', 'tile-bank'); bank.setAttribute('aria-label', '단어 선택'); tiles = shuffle(question.tiles.map((text, id) => ({ text, id })));
    const check = button('정답 확인', 'primary', () => finish(selection.map(t => t.text).join(' ') === question.answer, selection.map(t => t.text).join(' ')));
    function update() {
      assembled.replaceChildren(); bank.replaceChildren(); selection.forEach((t,i) => assembled.append(button(t.text, 'tile', () => { if (!locked) { selection.splice(i,1); update(); } })));
      tiles.forEach(t => { const b = button(t.text, 'tile', () => { if (!locked) { selection.push(t); update(); } }); b.disabled = locked || selection.some(s => s.id === t.id); bank.append(b); }); check.disabled = locked || selection.length !== tiles.length;
    }
    const actions = node('div', 'actions'); actions.append(button('다시 놓기', 'secondary', () => { if (!locked) { selection = []; update(); } }), check); card.append(assembled, bank, actions); update();
  }
  function renderError(card) {
    card.append(node('p', 'step', '1 / 2'));
    const sentence = node('div', 'word-sentence'); const words = question.sentence.split(' '); const wrongIndex = words.findIndex(w => w.replace(/[.,?!]$/,'') === question.wrong);
    words.forEach((word,index) => { const b = button(word, 'word', () => {
      if (locked || phase) return;
      if (index !== wrongIndex) { finish(false, word); return; }
      phase = 1; sentence.querySelectorAll('button').forEach(n => n.disabled = true); b.classList.add('found'); card.querySelector('.step').textContent = '2 / 2';
      renderChoices(sentence.parentElement, question.choices, answer => finish(answer === question.answer, answer));
    }); sentence.append(b); }); card.append(sentence);
  }
  function renderPersonal(card) {
    card.append(node('p', 'prompt', question.prompt));
    renderChoices(card, question.options, answer => {
      card.querySelectorAll('.choices button').forEach(b => { b.disabled = true; if (b.textContent === answer) b.classList.add('selected'); });
      const negative = answer.startsWith('No'); const followups = question.followups.filter(x => negative ? /never|haven’t/.test(x) : !/never|haven’t/.test(x));
      renderChoices(card, followups, detail => {
        if (locked) return; locked = true; card.querySelectorAll('.choices button').forEach(b => { b.disabled = true; if (b.textContent === detail) b.classList.add('selected'); });
        const label = node('label', 'optional', '추가 입력 (선택)'); const input = node('input'); input.type = 'text'; input.maxLength = 180; label.append(input); card.append(label);
        card.append(button('다음 질문', 'primary', () => { score++; nextQuestion(); }));
      });
    });
  }
  function renderListening(card) {
    const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    const play = button('▶ 듣기', 'secondary listen', () => {
      if (!supported || locked) return;
      speechToken++; const token = speechToken; speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(question.audio); utterance.lang = 'en-US'; utterance.rate = .85;
      const voice = speechSynthesis.getVoices().find(v => /^en[-_]US/i.test(v.lang)) || speechSynthesis.getVoices().find(v => /^en/i.test(v.lang)); if (voice) utterance.voice = voice;
      utterance.onend = () => { if (token !== speechToken || locked) return; speechFinished = true; card.querySelectorAll('.answer').forEach(b => b.disabled = false); play.textContent = '↻ 다시 듣기'; startTimer(); };
      utterance.onerror = () => { if (token !== speechToken || locked) return; play.textContent = '▶ 다시 듣기'; message('음성 재생 오류', false); };
      speechSynthesis.speak(utterance);
    }); play.disabled = !supported; card.append(play);
    if (!supported) card.append(node('p', 'note', '음성 미지원 브라우저'));
  }
  function message(text, good) { const box = document.querySelector('#feedback'); box.className = `feedback ${good ? 'good' : 'bad'}`; box.textContent = text; }
  function correctSentence() { return category.id === 'error' ? question.sentence.replace(question.wrong, question.answer) : question.answer; }
  function finish(correct, attempted) {
    if (locked || (category.id === 'listening' && !speechFinished && attempted !== '시간 초과')) return;
    const slow = deadline && (deadline - performance.now()) / limit <= .34;
    locked = true; stopTimer(); speechToken++; if ('speechSynthesis' in window) speechSynthesis.cancel();
    app.querySelectorAll('.answer,.tile,.word').forEach(b => { b.disabled = true; if (b.classList.contains('answer')) { if (b.textContent === question.answer) b.classList.add('correct'); else if (b.textContent === attempted) b.classList.add('wrong'); } });
    if (study || category.id === 'error') { recordFibonacciReviewAnswer(review, question.id, correct, { resetOnIncorrect: study, enrollCorrectAnswer: !study && slow }); save(reviewKey(), review); }
    if (correct) {
      score++; if (!study) recordBest();
      const milestone = score === 5 || (score < 100 && score % 10 === 0) || score % 100 === 0;
      message(milestone ? `✓ ${score}개 연속 정답!` : '✓ 정답!', true);
      nextTask = setTimeout(nextQuestion, study ? 800 : score % 100 === 0 ? 2050 : milestone ? 1500 : 650);
    } else {
      message(`${attempted === '시간 초과' ? '시간 초과' : '오답'}\n정답: ${correctSentence()}\n${question.explanation}`, false);
      const box = document.querySelector('#feedback'); box.style.whiteSpace = 'pre-line';
      if (study) box.append(button('다음 문제', 'primary', nextQuestion));
      else { recordBest(); nextTask = setTimeout(() => result(attempted), 760); }
    }
  }
  function result(attempted) {
    screen(); const wrap = node('section', 'practice'); wrap.append(node('h1', '', attempted === '시간 초과' ? '시간 초과' : '오답'), node('p', 'summary-score', `${score}개 연속`), node('p', 'intro', `${player} · 나의 최고 기록 ${best()}`));
    const card = node('div', 'question-card'); card.append(node('p', 'context', question.sentence || question.cue || (question.audio ? question.audio : question.prompt)), node('p', 'note', `내 답: ${attempted || '(선택 없음)'}`), node('p', 'prompt', correctSentence()), node('p', 'intro', question.explanation));
    const actions = node('div', 'actions'); actions.append(button('다시 시작', 'primary', startRound), button('학습 모드로 연습', 'secondary', () => { study = true; startRound(); }), button('Level 3', 'secondary', menu)); card.append(actions); wrap.append(card);
    const list = node('ol', 'leaderboard'); Object.entries(read(boardKey(), {})).sort((a,b) => b[1]-a[1]).slice(0,10).forEach(([name, value]) => list.append(node('li', '', `${name} · ${value}`))); wrap.append(node('h2', 'leader-title', `${category.name} 리더보드`), list); app.append(wrap);
  }
  window.addEventListener('pagehide', cleanup);
  menu();
})();
