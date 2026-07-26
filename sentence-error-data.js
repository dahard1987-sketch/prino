(() => {
  window.SENTENCE_ERROR_ITEMS = [
    {
      id: 'noun-number-001',
      incorrect: 'My parent are teacher.',
      correct: 'My parents are teachers.',
      rule: '주어와 보어의 수 일치',
      explanation: '동사가 are이므로 주어 parent와 보어 teacher를 모두 복수형으로 써야 합니다.',
      category: 'noun-number',
      level: 'middle-1',
      tags: ['복수형', '주어', '보어'],
      weight: 2
    },
    {
      id: 'noun-number-002',
      incorrect: 'My parent are teachers.',
      correct: 'My parents are teachers.',
      rule: '복수 주어와 be동사',
      explanation: '동사가 are이므로 주어 parent를 복수형 parents로 써야 합니다.',
      category: 'noun-number',
      level: 'middle-1',
      tags: ['복수형', '주어-동사 수일치']
    },
    {
      id: 'noun-number-003',
      incorrect: 'We are pilot.',
      correct: 'We are pilots.',
      rule: '복수 주어의 보어',
      explanation: '복수 주어 We를 설명하는 보어 pilot도 복수형 pilots로 써야 합니다.',
      category: 'noun-number',
      level: 'middle-1',
      tags: ['복수형', '보어']
    },
    {
      id: 'article-001',
      incorrect: 'My sister is pianist.',
      correct: 'My sister is a pianist.',
      rule: '셀 수 있는 단수 명사의 관사',
      explanation: 'pianist는 셀 수 있는 단수 명사이므로 앞에 관사 a가 필요합니다.',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '셀 수 있는 명사']
    },
    {
      id: 'article-002',
      incorrect: 'It is frog.',
      correct: 'It is a frog.',
      rule: '셀 수 있는 단수 명사의 관사',
      explanation: 'frog는 셀 수 있는 단수 명사이므로 앞에 관사 a가 필요합니다.',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '셀 수 있는 명사']
    },
    {
      id: 'article-003',
      incorrect: 'She is great nurse.',
      correct: 'She is a great nurse.',
      rule: '형용사와 단수 명사의 관사',
      explanation: 'nurse는 셀 수 있는 단수 명사이므로 형용사 great 앞에 관사 a를 써야 합니다.',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '형용사', '셀 수 있는 명사']
    },
    {
      id: 'article-004',
      incorrect: 'She is bad singer.',
      correct: 'She is a bad singer.',
      rule: '형용사와 단수 명사의 관사',
      explanation: 'singer는 셀 수 있는 단수 명사이므로 형용사 bad 앞에 관사 a를 써야 합니다.',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '형용사', '셀 수 있는 명사']
    },
    {
      id: 'article-005',
      incorrect: 'I am busy writer.',
      correct: 'I am a busy writer.',
      rule: '형용사와 단수 명사의 관사',
      explanation: 'writer는 셀 수 있는 단수 명사이므로 형용사 busy 앞에 관사 a를 써야 합니다.',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '형용사', '셀 수 있는 명사']
    },
    {
      id: 'article-006',
      incorrect: 'They are a kind people.',
      correct: 'They are kind people.',
      rule: '복수 명사 앞의 관사',
      explanation: 'people은 복수 명사이므로 단수 관사 a를 쓰지 않습니다.',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '복수 명사']
    },
    {
      id: 'article-007',
      incorrect: 'He is funny comedian.',
      correct: 'He is a funny comedian.',
      rule: '형용사와 단수 명사의 관사',
      explanation: 'comedian은 셀 수 있는 단수 명사이므로 형용사 funny 앞에 관사 a가 필요합니다.',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '형용사', '셀 수 있는 명사']
    },
    {
      id: 'determiner-001',
      incorrect: 'He is my a classmate.',
      correct: 'He is my classmate.',
      rule: '소유격과 관사',
      explanation: '소유격 my는 관사와 함께 쓰지 않으므로 a를 삭제해야 합니다.',
      category: 'determiner',
      level: 'middle-1',
      tags: ['소유격', '관사']
    },
    {
      id: 'determiner-002',
      incorrect: 'He is a my classmate.',
      correct: 'He is my classmate.',
      rule: '소유격과 관사',
      explanation: '소유격 my는 관사와 함께 쓰지 않으므로 a를 삭제해야 합니다.',
      category: 'determiner',
      level: 'middle-1',
      tags: ['소유격', '관사']
    },
    {
      id: 'article-008',
      incorrect: 'Tom and I are on same team.',
      correct: 'Tom and I are on the same team.',
      rule: 'same 앞의 정관사',
      explanation: 'same 앞에는 보통 정관사 the를 붙여 the same으로 씁니다.',
      category: 'article',
      level: 'middle-1',
      tags: ['정관사', 'same']
    },
    {
      id: 'article-009',
      incorrect: 'He is in third grade.',
      correct: 'He is in the third grade.',
      rule: '서수 앞의 정관사',
      explanation: '순서를 나타내는 서수 third 앞에는 보통 정관사 the를 씁니다.',
      category: 'article',
      level: 'middle-1',
      tags: ['정관사', '서수']
    },
    {
      id: 'article-010',
      incorrect: 'He is the third grader.',
      correct: 'He is a third grader.',
      rule: '서수와 부정관사',
      explanation: 'third grader는 여기서 ‘세 번째 학생’이 아니라 ‘3학년 학생 한 명’을 뜻하므로 a를 씁니다.',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '서수']
    },
    {
      id: 'noun-number-004',
      incorrect: 'Are they superhero?',
      correct: 'Are they superheroes?',
      rule: '복수 주어의 보어',
      explanation: 'they가 복수 주어이므로 보어 superhero도 복수형 superheroes로 써야 합니다.',
      category: 'noun-number',
      level: 'middle-1',
      tags: ['복수형', '보어']
    },
    {
      id: 'noun-spelling-001',
      incorrect: 'Are they superheros?',
      correct: 'Are they superheroes?',
      rule: '-o로 끝나는 명사의 복수형',
      explanation: 'superhero의 복수형은 -es를 붙인 superheroes입니다.',
      category: 'noun-spelling',
      level: 'middle-1',
      tags: ['복수형', '철자']
    },
    {
      id: 'article-011',
      incorrect: 'I am not superhero.',
      correct: 'I am not a superhero.',
      rule: '셀 수 있는 단수 명사의 관사',
      explanation: 'superhero는 셀 수 있는 단수 명사이므로 앞에 관사 a가 필요합니다.',
      category: 'article',
      level: 'middle-1',
      tags: ['관사', '셀 수 있는 명사']
    },
    {
      id: 'verb-spelling-001',
      incorrect: 'He flys to different countries.',
      correct: 'He flies to different countries.',
      rule: '자음 + y로 끝나는 동사의 3인칭 단수형',
      explanation: '자음 + y로 끝나는 동사는 y를 i로 바꾸고 -es를 붙이므로 flies가 됩니다.',
      category: 'verb-spelling',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '철자']
    },
    {
      id: 'verb-spelling-002',
      incorrect: 'Kelly studys math.',
      correct: 'Kelly studies math.',
      rule: '자음 + y로 끝나는 동사의 3인칭 단수형',
      explanation: '자음 + y로 끝나는 동사는 y를 i로 바꾸고 -es를 붙이므로 studies가 됩니다.',
      category: 'verb-spelling',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '철자']
    },
    {
      id: 'verb-spelling-003',
      incorrect: 'She staies there.',
      correct: 'She stays there.',
      rule: '모음 + y로 끝나는 동사의 3인칭 단수형',
      explanation: '모음 + y로 끝나는 동사는 y를 바꾸지 않고 -s만 붙이므로 stays가 됩니다.',
      category: 'verb-spelling',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '철자']
    },
    {
      id: 'tense-001',
      incorrect: 'Jeremy reads a lot of books yesterday.',
      correct: 'Jeremy read a lot of books yesterday.',
      rule: '과거 시제',
      explanation: 'yesterday가 있으므로 과거 시제를 써야 하며, read의 과거형 read를 사용합니다.',
      category: 'tense',
      level: 'middle-1',
      tags: ['과거시제', '시간 표현']
    },
    {
      id: 'verb-spelling-004',
      incorrect: 'Tom fixs a car.',
      correct: 'Tom fixes a car.',
      rule: '-x로 끝나는 동사의 3인칭 단수형',
      explanation: '-x로 끝나는 동사에는 -es를 붙이므로 fixes가 됩니다.',
      category: 'verb-spelling',
      level: 'middle-1',
      tags: ['현재시제', '3인칭 단수', '철자']
    },
    {
      id: 'noun-number-005',
      incorrect: 'Do frog have tails?',
      correct: 'Do frogs have tails?',
      rule: '복수 대상을 묻는 일반 질문',
      explanation: '여러 개구리에 관해 묻는 문장이므로 frog를 복수형 frogs로 써야 합니다.',
      category: 'noun-number',
      level: 'middle-1',
      tags: ['복수형', '의문문']
    },
    {
      id: 'plural-only-001',
      incorrect: 'Does she wear eyeglass?',
      correct: 'Does she wear eyeglasses?',
      rule: '항상 복수형으로 쓰는 명사',
      explanation: '안경, 가위, 바지처럼 두 부분이 한 쌍을 이루는 물건은 보통 복수형으로 씁니다.',
      category: 'plural-only-noun',
      level: 'middle-1',
      tags: ['복수형', '항상 복수인 명사']
    },
    {
      id: 'expression-001',
      incorrect: 'Does he jump jump rope every day?',
      correct: 'Does he jump rope every day?',
      rule: 'jump rope 표현',
      explanation: 'jump rope가 ‘줄넘기를 하다’라는 표현이므로 jump를 한 번만 씁니다.',
      category: 'fixed-expression',
      level: 'middle-1',
      tags: ['표현', '중복']
    }
  ];
})();
