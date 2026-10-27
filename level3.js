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
  let hasStarted = false;
  let category, player = '', study = false, score = 0, question, deck = [], recent = [], selection = [], tiles = [], locked = false, phase = 0;
  let review, raf, timeout, tickInterval, nextTask, deadline = 0, limit = 0;
  let builderUpdate = null, drag = null, suppressClickUntil = 0;
  const boardKey = () => `quick-tap-sample-leaderboard-level3-${category.id}`;
  const reviewKey = () => `quick-tap-study-level3-${category.id}-${encodeURIComponent(player)}`;
  const best = () => read(boardKey(), {})[player] || 0;
  function node(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; }
  function shortcut(element, key) {
    element.dataset.shortcut = key;
    element.setAttribute('aria-keyshortcuts', key);
    const badge = node('kbd', 'key-badge', key);
    badge.setAttribute('aria-hidden', 'true'); element.append(badge);
    return element;
  }
  function button(text, cls, action, key) {
    const b = node('button', cls, text); b.type = 'button'; b.setAttribute('aria-label', text);
    b.addEventListener('click', event => {
      if (performance.now() < suppressClickUntil && b.classList.contains('tile') && event.detail !== 0) return;
      window.QuickTapAudio?.prepare(); action(event);
    });
    if (key) shortcut(b, key);
    return b;
  }
  function promptNode(cls, text, answer = null) {
    const el = node('p', cls);
    const parts = text.split(/(_{2,})/g);
    parts.forEach(part => {
      if (/^_{2,}$/.test(part)) {
        const blank = node('span', answer === null ? 'answer-blank' : 'answer-blank filled', answer ?? '\u00a0');
        if (answer === null) { blank.setAttribute('role', 'img'); blank.setAttribute('aria-label', '빈칸'); }
        el.append(blank);
      } else el.append(document.createTextNode(part));
    });
    return el;
  }
  function sound(kind) {
    const builder = ['build', 'transform'].includes(category.id);
    window.QuickTapAudio?.play(builder ? `builder-${kind}` : kind);
  }
  function stopTimer() { cancelAnimationFrame(raf); clearTimeout(timeout); clearInterval(tickInterval); deadline = 0; }
  function cleanup() { stopTimer(); clearTimeout(nextTask); cancelDrag(); builderUpdate = null; }
  function screen() { cleanup(); app.replaceChildren(); window.scrollTo(0, 0); }
  function recordBest() { const board = read(boardKey(), {}); board[player] = Math.max(best(), score); save(boardKey(), board); }
  function timeLimit() {
    if (['build', 'transform'].includes(category.id)) return score >= 30 ? 5000 : score >= 20 ? 8000 : score >= 10 ? 11000 : 13000;
    const base = ['context', 'situation', 'error'].includes(category.id) ? 15000 : 10000;
    return Math.max(5000, base - Math.floor(score / 10) * 2000);
  }
  function startTimer() {
    if (study || locked || deadline) return;
    limit = timeLimit(); deadline = performance.now() + limit;
    timeout = setTimeout(() => finish(false, '시간 초과'), limit);
    tickInterval = setInterval(() => { if (!locked && performance.now() < deadline - 100) sound('tick'); }, 1000);
    function tick() {
      if (!deadline) return;
      const remaining = Math.max(0, deadline - performance.now());
      const label = document.querySelector('#timer-label'), bar = document.querySelector('#timer-bar');
      if (label && bar) { label.textContent = `${(remaining / 1000).toFixed(1)}초`; bar.style.transform = `scaleX(${remaining / limit})`; bar.parentElement.classList.toggle('urgent', remaining / limit <= .34); }
      raf = requestAnimationFrame(tick);
    }
    tick();
  }
  function renderNavigation() {
    const nav = document.querySelector('#level3-nav');
    if (!nav) return;
    nav.replaceChildren();
    categories.forEach(c => {
      const item = button(c.name, 'nav-activity', () => {
        if (c === category) return;
        if (hasStarted) { category = c; startRound(); } else welcome(c);
      });
      if (c === category) item.setAttribute('aria-current', 'page');
      nav.append(item);
    });
  }
  function menu() { welcome(category || categories.find(c => c.id === 'error')); }
  function welcome(c) {
    screen(); category = c; hasStarted = false; renderNavigation();
    const wrap = node('section', 'practice'); wrap.append(node('h1', '', c.name));
    const card = node('form', 'question-card setup');
    const label = node('label', 'sr-only', '플레이어'); label.htmlFor = 'player'; const select = node('select'); select.id = 'player'; select.required = true;
    select.add(new Option('플레이어', '')); PLAYER_NAMES.forEach(n => select.add(new Option(n, n))); select.add(new Option('직접 입력', '__custom__'));
    let previous = ''; try { previous = localStorage.getItem(LAST_PLAYER_KEY) || ''; } catch {} if (previous) select.value = PLAYER_NAMES.includes(previous) ? previous : '__custom__';
    const custom = node('input'); custom.type = 'text'; custom.maxLength = 20; custom.placeholder = '이름'; custom.setAttribute('aria-label', '직접 입력할 이름'); custom.hidden = select.value !== '__custom__'; custom.required = !custom.hidden; if (!custom.hidden) custom.value = previous || '';
    select.onchange = () => { custom.hidden = select.value !== '__custom__'; custom.required = !custom.hidden; };
    card.append(label, select, custom);
    const mode = node('label', 'mode-label'); const check = node('input'); check.type = 'checkbox'; mode.append(check, document.createTextNode(' 학습 모드'));
    card.append(mode);
    const start = button('시작', 'primary', () => {}); start.type = 'submit'; card.append(start);
    card.onsubmit = e => { e.preventDefault(); player = select.value === '__custom__' ? custom.value.trim() : select.value; if (!player) { custom.focus(); return; } try { localStorage.setItem(LAST_PLAYER_KEY, player); } catch {} window.QuickTapAudio?.prepare(); study = check.checked; startRound(); };
    wrap.append(card); app.append(wrap);
  }
  function startRound() {
    hasStarted = true; renderNavigation();
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
    screen(); question = pick(); selection = []; tiles = []; locked = false; phase = 0;
    const wrap = node('section', 'practice');
    const head = node('div', 'session-head'); head.append(node('h1', '', category.name), node('span', 'counter', `${study ? '학습' : '연속'} ${score} · 최고 ${best()}`)); wrap.append(head);
    const tools = node('div', 'session-tools'); tools.append(node('span', '', player));
    const mode = button('학습 모드', 'text-button', () => { study = !study; startRound(); }); mode.setAttribute('aria-pressed', String(study)); tools.append(mode); tools.append(button('플레이어', 'text-button', () => welcome(category))); wrap.append(tools);
    const audio = button('소리', 'text-button sound-toggle', () => { window.QuickTapAudio?.setEnabled(!window.QuickTapAudio.isEnabled()); audio.setAttribute('aria-pressed', String(window.QuickTapAudio?.isEnabled() ?? true)); }); audio.setAttribute('aria-pressed', String(window.QuickTapAudio?.isEnabled() ?? true)); tools.append(audio);
    if (!study) { const meta = node('div', 'timer-meta'); meta.append(Object.assign(node('strong', '', `${timeLimit() / 1000}초`), { id: 'timer-label' })); const track = node('div', 'timer-track'); const bar = node('span'); bar.id = 'timer-bar'; track.append(bar); const timer = node('div', 'timer-row'); timer.append(track, meta); wrap.append(timer); }
    const card = node('div', 'question-card'); card.id = 'question-card'; const content = node('div', 'question-content'); content.id = 'question-content'; card.append(content); wrap.append(card); app.append(wrap);
    if (['build', 'transform'].includes(category.id)) renderBuilder(content, card);
    else if (category.id === 'error') renderError(content, card);
    else {
      if (question.hint) content.append(node('p', 'korean', question.hint));
      content.append(promptNode(category.id === 'situation' ? 'korean' : category.id === 'context' ? 'context' : 'prompt', question.prompt)); renderChoices(card, question.choices, answer => finish(answer === question.answer, answer));
    }
    const feedback = node('div'); feedback.id = 'feedback'; feedback.setAttribute('role', 'status'); feedback.setAttribute('aria-live', 'polite'); card.append(feedback);
    startTimer();
  }
  function renderChoices(parent, options, choose) {
    const choices = node('div', 'choices');
    shuffle(options).forEach((answer, index) => {
      const option = button(answer, 'answer', () => { if (!locked) choose(answer); }, String(index + 1));
      option.dataset.answer = answer; choices.append(option);
    });
    parent.insertBefore(choices, parent.querySelector('#feedback'));
  }
  const confirmKey = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent) ? 'Return' : 'Enter';
  function renderBuilder(content, card) {
    const [label, ...sentence] = question.cue.split('\n');
    if (category.id === 'transform') { content.append(node('p', 'cue-label', label), node('p', 'context', sentence.join('\n'))); }
    else content.append(node('p', 'korean', question.cue)); const assembled = node('div', 'assembled'); assembled.setAttribute('aria-label', '만든 문장'); const bank = node('div', 'tile-bank'); bank.setAttribute('aria-label', '단어 선택'); tiles = shuffle(question.tiles.map((text, id) => ({ text, id })));
    const check = button('확인', 'primary', () => finish(selection.map(t => t.text).join(' ') === question.answer, selection.map(t => t.text).join(' ')), 'Enter');
    check.querySelector('kbd').textContent = confirmKey;
    function update() {
      assembled.replaceChildren(); bank.replaceChildren(); selection.forEach((t,i) => { const tile = button(t.text, 'tile', () => { if (!locked) { selection.splice(i,1); update(); } }, String(tiles.findIndex(x => x.id === t.id) + 1)); tile.dataset.tileId = t.id; tile.dataset.origin = 'assembled'; tile.disabled = locked; assembled.append(tile); });
      tiles.forEach((t,i) => { const b = button(t.text, 'tile', () => { if (!locked) { const selected = selection.findIndex(x => x.id === t.id); if (selected < 0) selection.push(t); else selection.splice(selected, 1); update(); } }, String(i + 1)); b.dataset.tileId = t.id; b.dataset.origin = 'bank'; b.disabled = locked; b.classList.toggle('used', selection.some(s => s.id === t.id)); bank.append(b); }); check.disabled = locked || selection.length !== tiles.length;
    }
    const actions = node('div', 'actions'); actions.append(button('다시', 'secondary', () => { if (!locked) { selection = []; update(); } }, 'R'), check); content.append(assembled); card.append(bank, actions); builderUpdate = update; update();
  }
  function renderError(content, card) {
    content.append(node('p', 'step', '1 / 2'));
    content.append(node('p', 'korean', question.translation));
    const sentence = node('div', 'word-sentence'); const words = question.sentence.split(' '); const wrongIndex = words.findIndex(w => w.replace(/[.,?!]$/,'') === question.wrong);
    words.forEach((word,index) => { const b = button(word, 'word', () => {
      if (locked || phase) return;
      if (index !== wrongIndex) { finish(false, word); return; }
      phase = 1; content.classList.add('correction-phase'); sentence.querySelectorAll('button').forEach(n => n.disabled = true); b.classList.add('found'); content.querySelector('.step').textContent = '2 / 2';
      renderChoices(card, question.choices, answer => finish(answer === question.answer, answer));
    }, String(index + 1)); b.dataset.word = word; sentence.append(b); }); content.append(sentence);
  }
  function message(text, good) {
    const box = document.querySelector('#feedback'); box.className = `feedback ${good ? 'good' : 'bad'}`; box.textContent = text;
  }
  function correctSentence() { return category.id === 'error' ? question.sentence.replace(question.wrong, question.answer) : question.answer; }
  function revealAnswer(container) {
    if (['choice', 'forms', 'context'].includes(category.id)) container.append(promptNode('review-sentence', question.prompt, question.answer));
    else if (category.id === 'error') {
      const sentence = node('p', 'review-sentence');
      const at = question.sentence.indexOf(question.wrong);
      sentence.append(document.createTextNode(question.sentence.slice(0, at)), node('mark', 'corrected-word', question.answer), document.createTextNode(question.sentence.slice(at + question.wrong.length)));
      container.append(sentence);
    } else container.append(promptNode('review-sentence', question.answer));
  }
  function showReview(attempted) {
    const card = document.querySelector('#question-card'); card.classList.add('is-review');
    const box = document.querySelector('#feedback'); box.setAttribute('tabindex', '-1'); box.replaceChildren(); box.className = 'feedback bad review-panel';
    box.append(node('h2', '', attempted === '시간 초과' ? '시간 초과' : '오답'));
    if (attempted !== '시간 초과') box.append(node('p', 'attempted', attempted || '—'));
    revealAnswer(box);
    if (!question.explanation.startsWith('완성 문장:') && question.explanation !== (question.prompt || '').replace(/_{2,}/g, question.answer)) box.append(node('p', 'review-explanation', question.explanation));
    const actions = node('div', 'actions');
    if (study) actions.append(button('다음', 'primary', nextQuestion));
    else {
      recordBest();
      actions.append(button('다시 시작', 'primary', startRound), button('학습 모드', 'secondary', () => { study = true; startRound(); }));
      const records = node('div', 'review-records'); records.hidden = true;
      const list = node('ol', 'leaderboard');
      Object.entries(read(boardKey(), {})).sort((a,b) => b[1]-a[1]).slice(0,10).forEach(([name,value]) => list.append(node('li', '', `${name} · ${value}`)));
      records.append(list);
      const toggle = button('기록', 'secondary', () => { records.hidden = !records.hidden; toggle.setAttribute('aria-expanded', String(!records.hidden)); });
      toggle.setAttribute('aria-expanded', 'false'); actions.append(toggle); box.append(actions, records);
    }
    if (study) box.append(actions);
    box.focus({ preventScroll: true });
  }
  function finish(correct, attempted) {
    if (locked) return;
    const slow = deadline && (deadline - performance.now()) / limit <= .34;
    locked = true; stopTimer(); cancelDrag(); sound(correct ? 'correct' : 'wrong');
    app.querySelectorAll('.answer,.tile,.word,.actions button').forEach(b => {
      b.disabled = true;
      if (b.classList.contains('answer')) {
        if (b.dataset.answer === question.answer) b.classList.add('correct');
        else if (b.dataset.answer === attempted) b.classList.add('wrong');
      }
      if (b.classList.contains('word') && b.dataset.word.replace(/[.,?!]$/, '') === question.wrong) b.classList.add('found');
    });
    if (study || category.id === 'error') { recordFibonacciReviewAnswer(review, question.id, correct, { resetOnIncorrect: study, enrollCorrectAnswer: !study && slow }); save(reviewKey(), review); }
    if (correct) {
      score++; if (!study) recordBest();
      const milestone = score === 5 || (score < 100 && score % 10 === 0) || score % 100 === 0;
      message(milestone ? `✓ ${score}` : '✓', true);
      document.querySelector('#question-card').classList.add(milestone && !study ? 'milestone' : 'answered');
      nextTask = setTimeout(nextQuestion, study ? 800 : score % 100 === 0 ? 2050 : milestone ? 1500 : 650);
    } else showReview(attempted);
  }

  function cancelDrag() {
    drag?.ghost?.remove(); drag?.element?.classList.remove('drag-source');
    document.querySelector('.assembled')?.classList.remove('drop-target'); drag = null;
  }
  document.addEventListener('pointerdown', event => {
    const tile = event.target.closest('.tile[data-tile-id]');
    if (!tile || tile.disabled || locked || event.button !== 0) return;
    drag = { element: tile, id: Number(tile.dataset.tileId), origin: tile.dataset.origin, x: event.clientX, y: event.clientY, pointer: event.pointerId, ghost: null };
  });
  document.addEventListener('pointermove', event => {
    if (!drag || drag.pointer !== event.pointerId) return;
    if (!drag.ghost && Math.hypot(event.clientX-drag.x,event.clientY-drag.y) < 8) return;
    if (!drag.ghost) {
      drag.ghost = drag.element.cloneNode(true); drag.ghost.classList.add('drag-ghost'); drag.ghost.setAttribute('aria-hidden', 'true');
      drag.ghost.style.width = `${drag.element.getBoundingClientRect().width}px`; document.body.append(drag.ghost); drag.element.classList.add('drag-source');
    }
    event.preventDefault(); drag.ghost.style.left = `${event.clientX+12}px`; drag.ghost.style.top = `${event.clientY+12}px`;
    const target = document.elementFromPoint(event.clientX,event.clientY);
    document.querySelector('.assembled')?.classList.toggle('drop-target', Boolean(target?.closest('.assembled')));
  }, { passive: false });
  document.addEventListener('pointerup', event => {
    if (!drag || drag.pointer !== event.pointerId) return;
    if (drag.ghost && !locked) {
      suppressClickUntil = performance.now()+350;
      const target = document.elementFromPoint(event.clientX,event.clientY);
      const oldIndex = selection.findIndex(t => t.id === drag.id);
      if (target?.closest('.assembled')) {
        const tile = tiles.find(t => t.id === drag.id); const rest = selection.filter(t => t.id !== drag.id);
        const over = target.closest('.tile[data-tile-id]'); let index = rest.length;
        if (over) {
          if (Number(over.dataset.tileId) === drag.id) index = Math.max(0,oldIndex);
          else { index = rest.findIndex(t => t.id === Number(over.dataset.tileId)); const rect = over.getBoundingClientRect(); if (event.clientX > rect.left+rect.width/2) index++; }
        }
        rest.splice(Math.max(0,index),0,tile); selection = rest; builderUpdate?.();
      } else if (target?.closest('.tile-bank') && drag.origin === 'assembled') { selection = selection.filter(t => t.id !== drag.id); builderUpdate?.(); }
    }
    cancelDrag();
  });
  document.addEventListener('pointercancel', cancelDrag);
  document.addEventListener('keydown', event => {
    if (event.repeat || event.isComposing || event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) return;
    if (event.target.closest?.('input,select,textarea,[contenteditable="true"]')) return;
    const key = /^(?:Digit|Numpad)(\d)$/.exec(event.code)?.[1] || (event.code === 'KeyR' ? 'R' : event.key === 'Enter' ? 'Enter' : null);
    if (!key) return;
    const target = [...app.querySelectorAll('[data-shortcut]')].find(el => el.dataset.shortcut === key && !el.disabled);
    if (target) { event.preventDefault(); target.click(); }
  });
  window.addEventListener('pagehide', cleanup);
  menu();
})();
