# Quick Tap

영어 문법과 문장 판단을 빠르게 연습하는 브라우저 기반 활동 모음입니다. 별도의 빌드 과정이나 서버 없이 정적 파일로 실행됩니다.

## 활동

- 동사의 목적어: 동명사와 to부정사 구분
- 동명사 / 현재분사: 문장 속 `-ing` 용법 판단
- 문장 오류 찾기: 맞는 문장과 틀린 문장 판단
- to v. 용법 구분 I/II
- 분사 + 전치사: 문맥에 맞는 전치사 4지선다
- Hepta Sentence Building: 문장 덩어리 배열

## 실행

`index.html`을 직접 열거나 로컬 HTTP 서버로 제공합니다.

```powershell
python -m http.server 8000
```

그런 다음 `http://localhost:8000`을 엽니다.

## 구조

- `index.html`: 화면 구조와 정적 리소스 연결
- `app.css`: 반응형 레이아웃과 활동별 시각 상태
- `app.js`: 게임 상태, 타이머, 오디오, 저장 및 복습 스케줄링
- `ing-data.js`: 동명사 / 현재분사 문제
- `sentence-error-data.js`: 문장 오류 찾기 문제
- `to-infinitive-data.js`: to부정사 용법 문제
- `participle-preposition-data.js`: 분사와 전치사 조합 4지선다 문제
- `sentence-building-data.js`: Hepta 문장 덩어리와 정답 배열
- `assets/`: 앱 아이콘과 Hepta 오디오

## 저장 방식

플레이어별 최고 기록과 복습 상태는 브라우저 `localStorage`에만 저장됩니다. 서버로 전송되지 않으며, 브라우저 데이터를 삭제하면 기록도 사라집니다.

## 검증

외부 의존성은 없습니다. 수정 후에는 최소한 다음을 확인합니다.

- 데이터 파일과 `app.js`의 JavaScript 구문
- 문제 ID 중복, 필수 필드, 표시 문장 마킹, Hepta 덩어리/정답 일치
- 모바일과 데스크톱 화면의 오버플로우
- 키보드, 터치/마우스, 타이머, 재도전, 복습 큐의 실제 브라우저 흐름

## Level 3 · Unit 02

메인 메뉴의 `Level 3`에서 현재완료(경험·완료) 활동 7종을 실행합니다. 56문항 중 7문항은 Unit 02 교재 기반이며 49문항은 새 예문입니다. 각 데이터의 `source`로 구별합니다.

- Quick Choice / Verb Forms: 표현·과거분사 선택
- Sentence Builder / Change the Sentence: 단어 타일 배열, 부정문·의문문 전환
- Error Detective: 오류 단어 선택 → 수정 표현 선택
- Read the Situation / Complete the Story: 상황·대화·문맥 판단

`level3.html`, `level3.css`, `level3.js`, `level3-data.js`는 새 활동을 담당합니다. `practice-core.js`에는 기존 `app.js`에서 그대로 옮긴 플레이어 목록과 Fibonacci 복습 함수를 두어 두 화면이 함께 사용합니다.

시간 도전은 기존과 같이 연속 정답 점수, 오답·시간 초과 시 종료, 재시작, 개인별 최고 기록·리더보드를 사용합니다. 타일 배열은 기존 13/11/8/5초(0/10/20/30연속) 규칙을 사용합니다. 선택·동사형은 10초, 상황·대화·2단계 오류 수정은 15초에서 시작하며 10연속마다 2초씩 줄어 최소 5초가 됩니다. 오류 찾기와 수정은 하나의 제한 시간을 공유합니다.

학습 모드는 무제한 시간, 오답 해설, 기존 Fibonacci 간격과 2회 연속 정답 시 복습 해제를 적용합니다. 오류 찾기는 시간 도전에서도 느린 정답과 오답을 복습 큐에 넣습니다. 문제 순서, 보기, 타일은 무작위이며 최근 3문항의 즉시 재출제를 피합니다(예정된 복습 제외). 기존 활동과 Level 3의 점수·복습 기록은 별도 키에 저장합니다.

데이터 및 공유 복습 함수 검증:

```sh
node scripts/validate-level3.cjs
node --check practice-core.js
node --check level3.js
node --check level3-data.js
```
