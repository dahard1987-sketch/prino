/* Unit 2: book-adapted items are marked; other items are original. */
window.LEVEL3 = (() => {
  const choice = (prompt, answer, others, explanation, source = 'original') => ({ prompt, answer, choices: [answer, ...others], explanation, source });
  const build = (cue, answer, source = 'original') => ({ cue, answer, tiles: answer.split(' '), source, explanation: '완성 문장: ' + answer });
  const error = (sentence, wrong, answer, others, explanation, source = 'original') => ({ sentence, wrong, answer, choices: [answer, ...others], explanation, source });
  const categories = [
    { id: 'choice', name: 'Quick Choice', korean: '알맞은 표현 고르기', symbol: 'have / has', items: [
      choice('My sister ___ visited this museum twice.', 'has', ['have', 'is', 'does'], 'My sister는 3인칭 단수이므로 has를 써요.', 'book'),
      choice('The robots ___ already cleaned the floor.', 'have', ['has', 'are', 'do'], 'The robots는 복수이므로 have를 써요.'),
      choice('___ your cousin ever flown a kite?', 'Has', ['Have', 'Did', 'Is'], '현재완료 의문문: Has + 단수 주어 + 과거분사.'),
      choice('Leo has never ___ a snowman.', 'made', ['make', 'making', 'makes'], 'has 뒤에는 make의 과거분사 made가 와요.'),
      choice('We ___ finished the game yet. We need five more minutes.', "haven’t", ['have', "hasn’t", "aren’t"], '아직 끝나지 않았으므로 haven’t finished를 써요.'),
      choice('방금: I have ___ opened the package.', 'just', ['never', 'ever', 'yet'], 'just는 방금 끝난 일을 나타내요.'),
      choice('이미: Ella has ___ fed the rabbit.', 'already', ['yet', 'ever', 'never'], 'already는 이미 끝난 일을 나타내요.'),
      choice('Have the players arrived ___?', 'yet', ['never', 'once', 'just'], '완료 여부를 묻는 의문문 끝에 yet을 쓸 수 있어요.')
    ]},
    { id: 'forms', name: 'Verb Forms', korean: '과거분사 고르기', symbol: 'go → went → ?', items: [
      choice('ride → rode → ___', 'ridden', ['rided', 'riden', 'rode'], 'ride의 과거분사는 ridden이에요.', 'book'),
      choice('write → wrote → ___', 'written', ['writed', 'writen', 'wrote'], 'write → wrote → written'),
      choice('fly → flew → ___', 'flown', ['flew', 'flied', 'flowed'], 'fly → flew → flown'),
      choice('break → broke → ___', 'broken', ['broke', 'breaked', 'broked'], 'break → broke → broken'),
      choice('choose → chose → ___', 'chosen', ['chose', 'choosed', 'choosen'], 'choose → chose → chosen'),
      choice('draw → drew → ___', 'drawn', ['drew', 'drawed', 'drown'], 'draw → drew → drawn'),
      choice('forget → forgot → ___', 'forgotten', ['forgot', 'forgetted', 'forgoten'], 'forget → forgot → forgotten'),
      choice('eat → ate → ___', 'eaten', ['ate', 'eated', 'eating'], 'eat → ate → eaten')
    ]},
    { id: 'build', name: 'Sentence Builder', korean: '단어로 문장 만들기', symbol: 'A + B + C', items: [
      build('나는 방금 창문을 닫았다.', 'I have just closed the window.', 'book'),
      build('Nora는 전에 돌고래를 본 적이 있다.', 'Nora has seen a dolphin before.'),
      build('우리는 아직 간식을 먹지 않았다.', 'We have not eaten our snacks yet.'),
      build('너는 연을 만들어 본 적이 있니?', 'Have you ever made a kite?'),
      build('우리 개는 신발을 숨긴 적이 없다.', 'My dog has never hidden a shoe.'),
      build('쌍둥이는 이미 일어났다.', 'The twins have already woken up.'),
      build('Owen은 방금 우산을 찾았다.', 'Owen has just found his umbrella.'),
      build('그녀는 경주에서 두 번 우승했다.', 'She has won the race twice.')
    ]},
    { id: 'transform', name: 'Change the Sentence', korean: '부정문 · 의문문 바꾸기', symbol: '→ ?', items: [
      build('부정문\nShe has finished the report.', 'She has not finished the report.', 'book'),
      build('의문문\nThey have opened the gate.', 'Have they opened the gate?'),
      build('부정문\nBen has washed his cap.', 'Ben has not washed his cap.'),
      build('의문문\nYour aunt has visited Rome.', 'Has your aunt visited Rome?'),
      build('부정문\nWe have chosen a team name.', 'We have not chosen a team name.'),
      build('의문문\nThe bus has arrived.', 'Has the bus arrived?'),
      build('부정문\nI have read the message.', 'I have not read the message.'),
      build('의문문\nThe children have built a tower.', 'Have the children built a tower?')
    ]},
    { id: 'error', name: 'Error Detective', korean: '오류 찾고 고치기', symbol: 'Find → Fix', items: [
      error('I have saw this painting before.', 'saw', 'seen', ['see', 'seeing', 'sees'], 'have 뒤에는 saw가 아니라 과거분사 seen을 써요.', 'book'),
      error('The kittens has fallen asleep.', 'has', 'have', ['is', 'does', 'having'], 'The kittens는 복수이므로 have가 필요해요.'),
      error('Maya has drew a dragon.', 'drew', 'drawn', ['draw', 'drawing', 'draws'], 'draw의 과거분사는 drawn이에요.'),
      error('Have your uncle found his keys?', 'Have', 'Has', ['Did', 'Is', 'Does'], 'your uncle은 단수이므로 Has로 질문해요.'),
      error('We have not chose a song yet.', 'chose', 'chosen', ['choose', 'choosing', 'chooses'], 'have not 뒤에는 과거분사 chosen을 써요.'),
      error('Lily has never ate sushi.', 'ate', 'eaten', ['eat', 'eating', 'eats'], 'eat의 과거분사는 eaten이에요.'),
      error('I haven’t never touched a snake.', 'haven’t', 'have', ['has', 'did', 'am'], 'never에 이미 부정 의미가 있으므로 have never를 써요.'),
      error('The train have just left.', 'have', 'has', ['is', 'does', 'having'], 'The train은 단수이므로 has를 써요.')
    ]},
    { id: 'situation', name: 'Read the Situation', korean: '상황과 의미 연결하기', symbol: 'Scene → Sentence', items: [
      choice('나는 제주도에 두 번 가 본 적이 있다.', 'I have been to Jeju Island twice.', ['I have never been to Jeju Island.', 'I am going to Jeju Island.', 'I haven’t been to Jeju Island yet.'], 'twice는 지금까지 두 번의 경험을 나타내요.', 'book'),
      choice('Ava는 생애 처음으로 말을 타려고 해요.', 'Ava has never ridden a horse.', ['Ava has ridden a horse twice.', 'Ava has just ridden a horse.', 'Ava has already ridden a horse.'], '첫 경험을 앞두고 있으므로 아직 타 본 적이 없어요.'),
      choice('책상 위에 편지가 있어요. Max는 방금 쓰기를 마쳤어요.', 'Max has just written a letter.', ['Max has never written a letter.', 'Max hasn’t written a letter yet.', 'Has Max ever written a letter?'], '방금 마친 일은 has just written으로 표현해요.'),
      choice('버스를 기다리고 있어요. 아직 버스가 보이지 않아요.', 'The bus hasn’t arrived yet.', ['The bus has already arrived.', 'The bus has just arrived.', 'The bus has arrived twice.'], '아직 도착하지 않았으므로 hasn’t arrived yet이에요.'),
      choice('엄마: 고양이 밥 줄래?\n나: 벌써 줬어요.', 'I have already fed the cat.', ['I have never fed the cat.', 'I haven’t fed the cat yet.', 'Have I fed the cat yet?'], '이미 끝낸 일에는 already가 어울려요.'),
      choice('Theo는 평생 눈을 본 적이 없어요.', 'Theo has never seen snow.', ['Theo has just seen snow.', 'Theo has seen snow three times.', 'Theo has already seen snow.'], '지금까지 경험이 없다는 뜻은 has never seen이에요.'),
      choice('친구의 박물관 방문 경험이 궁금해요.', 'Have you ever visited a museum?', ['Have you finished your work yet?', 'Have you just closed the door?', 'Have you already eaten lunch?'], '경험을 물을 때 Have you ever + 과거분사를 써요.'),
      choice('동생이 아직 신발을 찾고 있어요.', 'My brother hasn’t found his shoes yet.', ['My brother has already found his shoes.', 'My brother has just found his shoes.', 'My brother has found his shoes twice.'], '아직 찾는 중이므로 찾기가 완료되지 않았어요.')
    ]},
    { id: 'context', name: 'Complete the Story', korean: '대화 · 이야기 완성하기', symbol: '… → …', items: [
      choice('A: Have you packed your bag yet?\nB: Yes, I ___.', 'have', ['has', 'did', 'am'], 'Have you 질문에 I have로 짧게 대답해요.', 'book'),
      choice('Our class is making a garden. We have ___ planted the seeds. Now we need to water them.', 'already', ['yet', 'never', 'ever'], '씨앗을 이미 심었고 다음 일을 하려는 상황이에요.'),
      choice('A: Has Emma tried ice skating?\nB: No, she ___. This will be her first time.', 'hasn’t', ['haven’t', 'didn’t', 'isn’t'], 'Has Emma 질문의 부정 대답은 she hasn’t예요.'),
      choice('I can help with the magic show. I have ___ this trick many times.', 'done', ['did', 'do', 'doing'], 'have 뒤에는 do의 과거분사 done이 필요해요.'),
      choice('We are waiting for Sam. He hasn’t come back ___. His seat is still empty.', 'yet', ['already', 'just', 'ever'], '아직 돌아오지 않은 상황이므로 yet이 어울려요.'),
      choice('A: Why are you smiling?\nB: I have ___ won two tickets! It happened a moment ago.', 'just', ['never', 'ever', 'yet'], 'a moment ago라는 상황 설명에서 방금 일어났음을 알 수 있어요.'),
      choice('A: Do you know this board game?\nB: Yes! My cousins and I ___ played it several times.', 'have', ['has', 'are', 'did'], 'My cousins and I는 복수 주어이므로 have를 써요.'),
      choice('This is our first visit to the aquarium. We have ___ seen a real shark before.', 'never', ['already', 'just', 'yet'], '실제 상어를 전에 본 경험이 없으므로 never를 써요.')
    ]},
    { id: 'personal', name: 'Your Turn', korean: '나의 경험으로 대답하기', symbol: 'You → Your story', items: [
      { prompt: 'Have you ever baked cookies?', options: ['Yes, I have.', 'No, I haven’t.'], followups: ['I have baked them once.', 'I have baked them many times.', 'I have never baked them.'] },
      { prompt: 'Have you ever slept in a tent?', source: 'book', options: ['Yes, I have.', 'No, I haven’t.'], followups: ['I have slept in a tent once.', 'I have slept in a tent several times.', 'I have never slept in a tent.'] },
      { prompt: 'Have you ever flown a kite?', options: ['Yes, I have.', 'No, I haven’t.'], followups: ['I have flown a kite once.', 'I have flown a kite many times.', 'I have never flown a kite.'] },
      { prompt: 'Have you finished your homework yet?', options: ['Yes, I have.', 'No, I haven’t.'], followups: ['I have already finished it.', 'I haven’t finished it yet.'] },
      { prompt: 'Have you ever grown a plant?', options: ['Yes, I have.', 'No, I haven’t.'], followups: ['I have grown a plant once.', 'I have grown many plants.', 'I have never grown a plant.'] },
      { prompt: 'Have you ever made a snowman?', options: ['Yes, I have.', 'No, I haven’t.'], followups: ['I have made one once.', 'I have made one many times.', 'I have never made one.'] }
    ]},
    { id: 'listening', name: 'Listen & Choose', korean: '듣고 의미 고르기', symbol: '▶ Listen', items: [
      { ...choice('들은 문장의 뜻은?', '그녀는 시를 세 편 썼다.', ['그녀는 시를 쓴 적이 없다.', '그녀는 아직 시를 쓰지 않았다.', '그녀는 내일 시를 쓸 것이다.'], 'has written three poems는 지금까지 시를 세 편 썼다는 뜻이에요.', 'book'), audio: 'She has written three poems.' },
      { ...choice('들은 문장의 뜻은?', '그들은 방금 다리를 건넜다.', ['그들은 다리를 건넌 적이 없다.', '그들은 아직 다리를 건너지 않았다.', '그들은 다리를 건너는 중이다.'], 'have just crossed는 방금 건넜다는 뜻이에요.'), audio: 'They have just crossed the bridge.' },
      { ...choice('들은 문장의 뜻은?', '그는 아직 로봇을 만들지 않았다.', ['그는 이미 로봇을 만들었다.', '그는 방금 로봇을 만들었다.', '그는 로봇을 두 번 만들었다.'], 'has not built ... yet은 아직 만들지 않았다는 뜻이에요.'), audio: 'He has not built the robot yet.' },
      { ...choice('들은 문장의 뜻은?', '그녀는 낙타를 타 본 적이 없다.', ['그녀는 방금 낙타를 탔다.', '그녀는 낙타를 두 번 탔다.', '그녀는 이미 낙타를 탔다.'], 'has never ridden은 타 본 경험이 없다는 뜻이에요.'), audio: 'She has never ridden a camel.' },
      { ...choice('들은 문장의 뜻은?', '우리는 이미 표를 샀다.', ['우리는 아직 표를 사지 않았다.', '우리는 표를 잃어버렸다.', '우리는 표를 산 적이 없다.'], 'have already bought는 이미 샀다는 뜻이에요.'), audio: 'We have already bought the tickets.' },
      { ...choice('들은 문장의 뜻은?', '너는 무지개를 본 적이 있니?', ['너는 무지개를 그렸니?', '너는 아직 숙제를 안 했니?', '너는 방금 집에 왔니?'], 'Have you ever seen은 본 경험이 있는지 묻는 표현이에요.'), audio: 'Have you ever seen a rainbow?' }
    ]}
  ];
  categories.forEach(category => category.items.forEach((item, index) => { item.id = `${category.id}-${index + 1}`; item.source ||= 'original'; }));
  return { categories };
})();
