(() => {
  window.SENTENCE_ERROR_ITEMS = [
    {
      id: 'noun-number-001',
      incorrect: 'My parent are teacher.',
      correct: 'My parents are teachers.',
      reason: '동사가 are니까 주어도 복수, 보어도 복수',
      category: 'noun-number',
      level: 'middle-1',
      tags: ['복수형', '주어', '보어'],
      weight: 2
    },
    {
      id: 'noun-number-002',
      incorrect: 'My parent are teachers.',
      correct: 'My parents are teachers.',
      reason: '동사가 are니까 주어도 복수, 보어도 복수',
      category: 'noun-number',
      level: 'middle-1',
      tags: ['복수형', '주어-동사 수일치']
    },
    {
      id: 'noun-number-003',
      incorrect: 'We are pilot.',
      correct: 'We are pilots.',
      reason: 'we(복수)가 주어니까 보어 pilot도 복수로',
      category: 'noun-number',
      level: 'middle-1',
      tags: ['복수형', '보어']
    },
    {
      id: 'article-001',
      incorrect: 'My sister is pianist.',
      correct: 'My sister is a pianist.',
      reason: 'pianist가 셀 수 있는 단수 명사니까 a',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '셀 수 있는 명사']
    },
    {
      id: 'article-002',
      incorrect: 'It is frog.',
      correct: 'It is a frog.',
      reason: 'frog가 셀 수 있는 단수 명사니까 a',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '셀 수 있는 명사']
    },
    {
      id: 'article-003',
      incorrect: 'She is great nurse.',
      correct: 'She is a great nurse.',
      reason: 'nurse가 셀 수 있는 단수 명사니까 a',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '형용사', '셀 수 있는 명사']
    },
    {
      id: 'article-004',
      incorrect: 'She is bad singer.',
      correct: 'She is a bad singer.',
      reason: 'singer가 셀 수 있는 단수 명사니까 a',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '형용사', '셀 수 있는 명사']
    },
    {
      id: 'article-005',
      incorrect: 'I am busy writer.',
      correct: 'I am a busy writer.',
      reason: 'writer가 셀 수 있는 단수 명사니까 a',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '형용사', '셀 수 있는 명사']
    },
    {
      id: 'article-006',
      incorrect: 'They are a kind people.',
      correct: 'They are kind people.',
      reason: 'people이 복수니까 a는 필요없음',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '복수 명사']
    },
    {
      id: 'article-007',
      incorrect: 'He is funny comedian.',
      correct: 'He is a funny comedian.',
      reason: '가 셀 수 있는 단수 명사니까 a',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '형용사', '셀 수 있는 명사']
    },
    {
      id: 'determiner-001',
      incorrect: 'He is my a classmate.',
      correct: 'He is my classmate.',
      reason: 'my는 다른 관사와 같이 쓰지 않음',
      category: 'determiner',
      level: 'middle-1',
      tags: ['소유격', '관사']
    },
    {
      id: 'determiner-002',
      incorrect: 'He is a my classmate.',
      correct: 'He is my classmate.',
      reason: 'my는 다른 관사와 같이 쓰지 않음',
      category: 'determiner',
      level: 'middle-1',
      tags: ['소유격', '관사']
    },
    {
      id: 'article-008',
      incorrect: 'Tom and I are on same team.',
      correct: 'Tom and I are on the same team.',
      reason: 'same에는 보통 the를 붙여서 사용',
      category: 'article',
      level: 'middle-1',
      tags: ['정관사', 'same']
    },
    {
      id: 'article-009',
      incorrect: 'He is in third grade.',
      correct: 'He is in the third grade.',
      reason: '서수에는 보통 the를 붙여서 사용',
      category: 'article',
      level: 'middle-1',
      tags: ['정관사', '서수']
    },
    {
      id: 'article-010',
      incorrect: 'He is the third grader.',
      correct: 'He is a third grader.',
      reason: '서수지만 "...번째"가 아니라서 the 사용하지 않음',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '서수']
    },
    {
      id: 'noun-number-004',
      incorrect: 'Are they superhero?',
      correct: 'Are they superheroes?',
      reason: 'they가 복수 주어니까 보어에도 복수형 사용',
      category: 'noun-number',
      level: 'middle-1',
      tags: ['복수형', '보어']
    },
    {
      id: 'noun-spelling-001',
      incorrect: 'Are they superheros?',
      correct: 'Are they superheroes?',
      reason: '-o로 끝나는 명사라 복수형에 -es',
      category: 'noun-spelling',
      level: 'middle-1',
      tags: ['복수형', '철자']
    },
    {
      id: 'article-011',
      incorrect: 'I am not superhero.',
      correct: 'I am not a superhero.',
      reason: 'superhero가 셀 수 있는 단수 명사니까 a',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '셀 수 있는 명사']
    },
    {
      id: 'verb-spelling-001',
      incorrect: 'He flys to different countries.',
      correct: 'He flies to different countries.',
      reason: '자음 + y로 끝나는 동사는 -ies로 바뀜',
      category: 'verb-spelling',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '철자']
    },
    {
      id: 'verb-spelling-002',
      incorrect: 'Kelly studys math.',
      correct: 'Kelly studies math.',
      reason: '자음 + y로 끝나는 동사는 -ies로 바뀜',
      category: 'verb-spelling',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '철자']
    },
    {
      id: 'verb-spelling-003',
      incorrect: 'She staies there.',
      correct: 'She stays there.',
      reason: '모음 + y로 끝나는 동사는 그냥 -s만 붙임',
      category: 'verb-spelling',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '철자']
    },
    {
      id: 'tense-001',
      incorrect: 'Jeremy reads a lot of books yesterday.',
      correct: 'Jeremy read a lot of books yesterday.',
      reason: 'yesterday 있어서 과거시제이므로 read의 과거형인 read 사용',
      category: 'tense',
      level: 'middle-1',
      tags: ['과거시제', '시간 표현']
    },
    {
      id: 'verb-spelling-004',
      incorrect: 'Tom fixs a car.',
      correct: 'Tom fixes a car.',
      reason: '-x로 끝나는 동사는 -es 붙임',
      category: 'verb-spelling',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '철자']
    },
    {
      id: 'noun-number-005',
      incorrect: 'Do frog have tails?',
      correct: 'Do frogs have tails?',
      reason: '여러 개구리에 대한 질문이니까 frogs',
      category: 'noun-number',
      level: 'middle-1',
      tags: ['복수형', '의문문']
    },
    {
      id: 'plural-only-001',
      incorrect: 'Does she wear eyeglass?',
      correct: 'Does she wear eyeglasses?',
      reason: '안경, 가위, 바지 등은 항상 복수로',
      category: 'plural-only-noun',
      level: 'middle-1',
      tags: ['복수형', '항상 복수인 명사']
    },
    {
      id: 'expression-001',
      incorrect: 'Does he jump jump rope every day?',
      correct: 'Does he jump rope every day?',
      reason: '이건..',
      category: 'fixed-expression',
      level: 'middle-1',
      tags: ['표현', '중복']
    },
        {
      id: 'subject-verb-agreement-001',
      incorrect: 'The play finish at 10.',
      correct: 'The play finishes at 10.',
      reason: '주어 단수니까 -es',
      category: 'subject-verb-agreement',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '주어-동사 수일치']
    },
    {
      id: 'subject-verb-agreement-002',
      incorrect: 'The play start at 10.',
      correct: 'The play starts at 10.',
      reason: '주어 단수니까 -s',
      category: 'subject-verb-agreement',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '주어-동사 수일치']
    },
    {
      id: 'multiple-errors-001',
      incorrect: 'The life change slowly.',
      correct: 'Life changes slowly.',
      reason: '인생(life)에는 the 거의 사용하지 않음. 셀 수 없는 주어니까 동사에 -s',
      category: 'multiple-errors',
      level: 'middle-1',
      tags: ['관사', '현재시제', '3인칭 단수', '주어-동사 수일치']
    },
    {
      id: 'subject-verb-agreement-003',
      incorrect: 'Life change you slowly.',
      correct: 'Life changes you slowly.',
      reason: '셀 수 없는 주어니까 동사에 -s',
      category: 'subject-verb-agreement',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '주어-동사 수일치']
    },
    {
      id: 'multiple-errors-002',
      incorrect: 'Superman return the earth.',
      correct: 'Superman returns to the earth.',
      reason: '3인칭 단수니까 동사에 -s / \'지구로\' 니까 "to" 사용',
      category: 'multiple-errors',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '전치사', 'to']
    },
    {
      id: 'subject-verb-agreement-004',
      incorrect: 'We leaves home at 12.',
      correct: 'We leave home at 12.',
      reason: '주어 3인칭 단수 아니니까 leaves에서 -s 제거',
      category: 'subject-verb-agreement',
      level: 'middle-1',
      tags: ['현재시제', '주어-동사 수일치', '복수 주어']
    },
    {
      id: 'multiple-errors-003',
      incorrect: 'The sun raise east.',
      correct: 'The sun rises in the east.',
      reason: '자기가 떠오르니까 자동사 rise 사용 / \'동쪽에서\'는 전치사 in 사용',
      category: 'multiple-errors',
      level: 'middle-1',
      tags: ['자동사', 'rise', 'raise', '전치사', '방향']
    },
    {
      id: 'multiple-errors-004',
      incorrect: 'The sun raise from east.',
      correct: 'The sun rises in the east.',
      reason: '자기가 떠오르니까 자동사 rise 사용 / \'동쪽에서\'는 전치사 in 사용',
      category: 'multiple-errors',
      level: 'middle-1',
      tags: ['자동사', 'rise', 'raise', '전치사', '방향']
    },
    {
      id: 'multiple-errors-005',
      incorrect: 'Sun rise at east.',
      correct: 'The sun rises in the east.',
      reason: '3인칭 단수라 동사에 -s / \'동쪽에서\'는 전치사 in 사용',
      category: 'multiple-errors',
      level: 'middle-1',
      tags: ['정관사', '현재시제', '3인칭 단수', '전치사', '방향']
    },
    {
      id: 'multiple-errors-006',
      incorrect: 'The sun rise at east.',
      correct: 'The sun rises in the east.',
      reason: '3인칭 단수라 동사에 -s / \'동쪽에서\'는 전치사 in 사용',
      category: 'multiple-errors',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '전치사', '방향']
    },
    {
      id: 'fixed-expression-002',
      incorrect: 'He doesn’t talk lie.',
      correct: 'He doesn\'t tell a lie.',
      reason: '...를 말하다\'로는 talk가 아니라 tell 사용',
      category: 'fixed-expression',
      level: 'middle-1',
      tags: ['동사 선택', 'talk', 'tell', '표현']
    },
    {
      id: 'subject-verb-agreement-005',
      incorrect: 'Birds looks beautiful.',
      correct: 'Birds look beautiful.',
      reason: '주어가 복수니까 동사에서 -s 제거',
      category: 'subject-verb-agreement',
      level: 'middle-1',
      tags: ['현재시제', '복수 주어', '주어-동사 수일치']
    },
    {
      id: 'article-012',
      incorrect: 'It sounds like good idea.',
      correct: 'It sounds like a good idea.',
      reason: 'idea는 셀 수 있는 명사. 관사 a 사용',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '셀 수 있는 명사', '감각동사']
    },
    {
      id: 'verb-complement-001',
      incorrect: 'It sounds a good idea.',
      correct: 'It sounds like a good idea.',
      reason: 'idea가 명사니까 감각동사 sound 뒤에 like 필요',
      category: 'verb-complement',
      level: 'middle-1',
      tags: ['감각동사', 'sound like', '전치사', '명사']
    },
    {
      id: 'subject-verb-agreement-006',
      incorrect: 'She sometimes call me.',
      correct: 'She sometimes calls me.',
      reason: '3인칭 단수 주어라 동사에 -s 필요',
      category: 'subject-verb-agreement',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '주어-동사 수일치']
    },
    {
      id: 'article-013',
      incorrect: 'He drives taxi.',
      correct: 'He drives a taxi.',
      reason: '택시(a taxi) 셀 수 있어서 관사 필요.',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '셀 수 있는 명사', '단수 명사']
    },
    {
      id: 'subject-verb-agreement-007',
      incorrect: 'She find the answer easy.',
      correct: 'She finds the answer easy.',
      reason: '3인칭 단수 주어라 동사에 -s 필요',
      category: 'subject-verb-agreement',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '주어-동사 수일치']
    },
        {
      id: 'tense-002',
      incorrect: 'Romeo did write a letter to Juliet.',
      correct: 'Romeo didn\'t write a letter to Juliet.',
      reason: 'wrote거나 didn\'t write거나',
      category: 'tense',
      level: 'middle-1',
      tags: ['과거시제', '일반동사', 'did', '부정문']
    },
    {
      id: 'article-014',
      incorrect: 'She calls him a "Jim."',
      correct: 'She calls him "Jim."',
      reason: '고유명사에는 관사 쓰지 않음',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '고유명사', '목적격 보어']
    },
    {
      id: 'article-015',
      incorrect: 'I find him a handsome.',
      correct: 'I find him handsome.',
      reason: '형용사에 관사 쓰지 않음.',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '형용사', '목적격 보어']
    },
    {
      id: 'multiple-errors-007',
      incorrect: 'The shef finds his cook is bad.',
      correct: 'The chef finds his food bad.',
      reason: 'chef 스펠링, 동사 억지로 하나 더 쓰기, cook = 요리사, food = 음식',
      category: 'multiple-errors',
      level: 'middle-1',
      tags: ['철자', '목적격 보어', '동사', '단어 선택', 'chef', 'cook', 'food']
    },
    {
      id: 'noun-spelling-002',
      incorrect: 'The shef finds his food bad.',
      correct: 'The chef finds his food bad.',
      reason: 'chef 스펠링',
      category: 'noun-spelling',
      level: 'middle-1',
      tags: ['철자', 'chef']
    },
    {
      id: 'multiple-errors-008',
      incorrect: 'The chef finds his cook is bad.',
      correct: 'The chef finds his food bad.',
      reason: '동사 억지로 하나 더 쓰기, cook = 요리사, food = 음식',
      category: 'multiple-errors',
      level: 'middle-1',
      tags: ['목적격 보어', '동사', '단어 선택', 'cook', 'food']
    },
    {
      id: 'word-choice-001',
      incorrect: 'The chef finds his cook bad.',
      correct: 'The chef finds his food bad.',
      reason: 'cook = 요리사, food = 음식',
      category: 'word-choice',
      level: 'middle-1',
      tags: ['단어 선택', 'cook', 'food']
    },
    {
      id: 'multiple-errors-009',
      incorrect: 'Mina was second grade last year.',
      correct: 'Mina was in the second grade last year.',
      reason: '서수에는 the, ...학년인 = in .. grade',
      category: 'multiple-errors',
      level: 'middle-1',
      tags: ['정관사', '서수', '전치사', '학년']
    },
    {
      id: 'article-016',
      incorrect: 'You were in the London last week.',
      correct: 'You were in London last week.',
      reason: '도시 이름에 the (거의) 쓰지 않음.',
      category: 'article',
      level: 'middle-1',
      tags: ['정관사', '고유명사', '도시 이름']
    },
    {
      id: 'noun-number-006',
      incorrect: 'They were classmate.',
      correct: 'They were classmates.',
      reason: '여러 명 지칭하니까 -s',
      category: 'noun-number',
      level: 'middle-1',
      tags: ['복수형', '보어', '복수 주어']
    },
    {
      id: 'capitalization-001',
      incorrect: 'You were in london last week.',
      correct: 'You were in London last week.',
      reason: '도시 이름 대문자로.',
      category: 'capitalization',
      level: 'middle-1',
      tags: ['대문자', '고유명사', '도시 이름']
    },
    {
      id: 'article-017',
      incorrect: 'Was Jinho student last year?',
      correct: 'Was Jinho a student last year?',
      reason: 'student 셀 수 있으니까 a student',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '셀 수 있는 명사', '단수 명사', '의문문']
    },
        {
      id: 'subject-verb-agreement-008',
      incorrect: 'The baby have small feet.',
      correct: 'The baby has small feet.',
      reason: '주어 3인칭 단수니까 has',
      category: 'subject-verb-agreement',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', 'have', 'has']
    },
    {
      id: 'noun-number-007',
      incorrect: 'The baby has a small foot.',
      correct: 'The baby has small feet.',
      reason: '발 하나만 이야기할 리는 (거의) 없으니 foot 말고 feet',
      category: 'noun-number',
      level: 'middle-1',
      tags: ['복수형', '불규칙 복수형', 'foot', 'feet']
    },
    {
      id: 'article-018',
      incorrect: 'The baby has a small feet.',
      correct: 'The baby has small feet.',
      reason: 'feet 복수니까 a 필요 없음',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '복수 명사', 'feet']
    },
    {
      id: 'article-019',
      incorrect: 'Stone is hard.',
      correct: 'A stone is hard.',
      reason: 'stone 셀 수 있으니까 a stone',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '셀 수 있는 명사', '단수 명사']
    },
    {
      id: 'noun-number-008',
      incorrect: 'I bought two bottle of wine.',
      correct: 'I bought two bottles of wine.',
      reason: 'bottle은 셀 수 있고, 2병이니까 two bottles',
      category: 'noun-number',
      level: 'middle-1',
      tags: ['복수형', '셀 수 있는 명사', '수사', 'bottle']
    },
    {
      id: 'verb-form-001',
      incorrect: 'He talking about music.',
      correct: 'He is talking about music.',
      reason: '-ing 혼자서는 동사로 쓸 수 없어요',
      category: 'verb-form',
      level: 'middle-1',
      tags: ['현재진행형', 'be동사', '현재분사']
    },
    {
      id: 'voice-001',
      incorrect: 'Bill was left school a few days ago.',
      correct: 'Bill left school a few days ago.',
      reason: 'was left는 남겨졌다는 수동태 의미.',
      category: 'voice',
      level: 'middle-1',
      tags: ['과거시제', '수동태', '능동태', 'leave']
    },
    {
      id: 'article-020',
      incorrect: 'Bill left a school a few days ago.',
      correct: 'Bill left school a few days ago.',
      reason: '자기 학교니까 관사 쓰지 않음',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '무관사', 'school']
    },
    {
      id: 'determiner-003',
      incorrect: 'He answered theirs questions.',
      correct: 'He answered their questions.',
      reason: 'theirs: 그들의 것 / their: 그들의',
      category: 'determiner',
      level: 'middle-1',
      tags: ['소유격', '소유대명사', 'their', 'theirs']
    },
    {
      id: 'preposition-001',
      incorrect: 'He answered to their questions.',
      correct: 'He answered their questions.',
      reason: '동사 answer에는 to 쓰지 않습니다.',
      category: 'preposition',
      level: 'middle-1',
      tags: ['전치사', '타동사', 'answer', 'to']
    }
  ];
})();
