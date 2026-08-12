# Quick Tap

영어 문법과 문장 판단을 빠르게 연습하는 브라우저 기반 활동 모음입니다. 별도의 빌드 과정이나 서버 없이 정적 파일로 실행됩니다.

## 활동

- 동사의 목적어: 동명사와 to부정사 구분
- 동명사 / 현재분사: 문장 속 `-ing` 용법 판단
- 문장 오류 찾기: 맞는 문장과 틀린 문장 판단
- to v. 용법 구분 I/II
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
- `sentence-building-data.js`: Hepta 문장 덩어리와 정답 배열
- `assets/`: 앱 아이콘과 Hepta 오디오

## 저장 방식

플레이어별 최고 기록과 복습 상태는 브라우저 `localStorage`에만 저장됩니다. 서버로 전송되지 않으며, 브라우저 데이터를 삭제하면 기록도 사라집니다.

## 검증

외부 의존성은 없습니다. 수정 후에는 최소한 다음을 확인합니다.

- 네 개 데이터 파일과 `app.js`의 JavaScript 구문
- 문제 ID 중복, 필수 필드, 표시 문장 마킹, Hepta 덩어리/정답 일치
- 모바일과 데스크톱 화면의 오버플로우
- 키보드, 터치/마우스, 타이머, 재도전, 복습 큐의 실제 브라우저 흐름
