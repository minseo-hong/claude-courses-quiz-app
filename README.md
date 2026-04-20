# Claude Courses Quiz

Anthropic의 [Claude Academy](https://anthropic.skilljar.com) 강의를 종합 복습하기 위한 퀴즈 앱.
각 코스별 모의고사를 브라우저에서 풀어볼 수 있다.

## 지원 코스

| 코스 | 모의고사 | 문항 수 |
|---|---|---|
| Claude 101 | 5회 | 회당 21문항 (총 105문항) |

추후 Claude Code, MCP 등 다른 코스가 추가될 예정.

## 특징

- **정보처리기사 스타일 출제** — `choice` 중심, 핵심 용어는 `fill`/`term`, 단답형은 `short`
- **정답·해설 토글** — 먼저 풀어본 뒤 버튼으로 확인
- **전 레슨 균등 커버** — 회차별로 주제를 분리하지 않고 코스 전범위를 골고루 출제
- **반응형 사이드바** — 모바일에서는 드로어, 데스크톱에서는 sticky 사이드바

## 기술 스택

- [React 19](https://react.dev) + [Vite 8](https://vitejs.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (`@theme` 기반 디자인 토큰)
- Python + [Playwright](https://playwright.dev/python/) — Skilljar 강의 본문 스크래핑

## 시작하기

### 웹 앱 실행

```bash
npm install
npm run dev
```

### 프로덕션 빌드

```bash
npm run build     # dist/ 생성
npm run preview   # 빌드 결과 미리보기
```

### 배포

Vite 프로젝트이므로 [Vercel](https://vercel.com)에 별도 설정 없이 배포 가능.

```bash
npm i -g vercel
vercel
```

## 프로젝트 구조

```
├── src/
│   ├── App.jsx              # 사이드바 + 본문 레이아웃
│   ├── components/          # QuizPage, QuizCard, Chip
│   └── data/
│       ├── sections.js      # 코스별 사이드바 섹션 정의
│       └── r{n}-*.js        # 회차별 모의고사 데이터
├── public/
│   └── favicon.svg
├── fetch_lesson.py          # 단일 레슨 추출
├── fetch_all_lessons.py     # 전체 레슨 일괄 저장
└── get_sidebar_structure.py # 사이드바 구조 추출
```

상세한 개발 가이드는 [CLAUDE.md](./CLAUDE.md)를 참고한다.

## 개발 규약

### 커밋 메시지

[Conventional Commits](https://www.conventionalcommits.org/)를 따른다.

```
<type>: <subject (한국어)>
```

| type | 용도 |
|---|---|
| `feat` | 새 기능, 신규 퀴즈/섹션 추가 |
| `fix` | 버그·오답·오탈자 수정 |
| `refactor` | 동작 변화 없는 구조 개선 |
| `chore` | 빌드·설정·에셋 정리 |
| `docs` | 문서 수정 |

### 새 퀴즈 추가

1. `src/data/`에 `{id}-{이름}.js` 작성 (`lesson` 필드로 식별)
2. `src/data/sections.js`의 해당 코스 섹션 `lessons` 배열에 `lesson` 값 추가
3. `npm run dev`로 사이드바 등록 확인

## 라이선스

개인 학습용 프로젝트. 강의 원문(`markdown/`)은 저작권상 공유하지 않는다.
