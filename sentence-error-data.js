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
      reason: '가 셀 수 있는 단수 명사니까 a',
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
    }
  ];
})();
