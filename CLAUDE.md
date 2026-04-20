# Claude 101 Study Project

## 프로젝트 개요

Anthropic의 Claude 101 강의를 URL로 접근하여 본문을 추출하고, 전 강의를 아우르는 종합 기출 퀴즈를 React 앱으로 제공하는 프로젝트.

## 디렉토리 구조

```
claude/
├── CLAUDE.md
├── fetch_lesson.py                         # URL → 강의 본문 텍스트 추출 스크립트 (Playwright)
├── fetch_all_lessons.py                    # 전체 레슨 마크다운 일괄 저장 스크립트
├── get_sidebar_structure.py                # Skilljar 사이드바 섹션·레슨 구조 추출
├── cookies.json                            # Skilljar 세션 쿠키 (git 제외)
├── .venv/                                  # Python 가상환경 (git 제외)
├── package.json                            # React 퀴즈 앱 (Vite) — 루트에서 npm run dev
├── vite.config.js                          # @tailwindcss/vite 플러그인 포함
├── markdown/                               # 전체 레슨 마크다운 파일 (fetch_all_lessons.py 생성)
│   └── {번호}-{강의명}.md
├── src/
│   ├── global.css                          # Tailwind import + @theme 디자인 토큰 + base 스타일
│   ├── components/
│   │   ├── QuizPage.jsx                    # 퀴즈 페이지 레이아웃
│   │   ├── QuizCard.jsx                    # 개별 문항 카드 (정답/해설 토글)
│   │   └── Chip.jsx                        # 복수 정답 칩
│   └── data/
│       ├── sections.js                     # 사이드바 섹션 그룹 정의
│       └── {id}-{이름}.js                  # 퀴즈 데이터 파일 (앱에 자동 등록)
└── public/
    └── claude-101/                         # 원본 HTML 보관 (선택적)
```

### 퀴즈 데이터 파일 명명 규칙

- 레슨별 파일: 두 자리 번호 + kebab-case 제목. 예: `01-what-is-claude.js`
- 종합 시험 파일: `r{번호}-{이름}.js` 형식. 예: `r2-final-exam.js`
- `lesson` 필드에 동일한 식별자를 기입하고, `sections.js`에 등록해야 사이드바에 표시된다.

## 강의 콘텐츠 수집

### 1. 세션 쿠키 설정 (`cookies.json`)

브라우저에서 Skilljar에 로그인한 뒤 DevTools → Application → Cookies에서
`anthropic.skilljar.com` 쿠키를 복사해 `cookies.json`에 붙여넣는다.

```json
[
  {
    "name": "sj_sessionid",
    "value": "...",
    "domain": "anthropic.skilljar.com",
    "path": "/"
  }
]
```

인증에 필요한 쿠키는 보통 `sj_sessionid`, `sj_csrftoken` 등이다.

### 2. 단일 레슨 텍스트 추출

```bash
.venv/bin/python fetch_lesson.py <강의_URL>
```

JS 렌더링이 완료된 후 본문 텍스트를 stdout으로 출력한다.

### 3. 전체 레슨 마크다운 일괄 저장

```bash
.venv/bin/python fetch_all_lessons.py <시작_URL>
```

사이드바에서 모든 레슨 URL을 자동 추출한 뒤 각 페이지를 마크다운으로 변환하여
`markdown/` 폴더에 저장한다. 쿠키 갱신 후 재실행하면 전체 파일이 최신화된다.

### 4. 사이드바 섹션 구조 재추출

```bash
.venv/bin/python get_sidebar_structure.py <강의_URL>
```

Skilljar 사이드바의 섹션 헤더(H3)와 레슨 링크를 JSON으로 출력한다.
강의 구조가 변경됐을 때 `sections.js` 업데이트에 활용한다.

## 퀴즈 데이터 작성 규칙

- 문항 유형: 정보처리기사 **필기+실기** 스타일 — `choice` 위주, 핵심 용어 암기는 `fill`/`term`
- **정답·해설은 기본 숨김**: 버튼 클릭 시 표시 (객관식 "정답 확인", 나머지 "정답 · 해설 보기")
- 레슨 전환 시 열람 상태가 자동 초기화된다 (`key={quiz.lesson}` 처리)

### 문항 구성 원칙

- **`choice` 우선**: 사실 확인, 개념 구분, 정의 매칭은 객관식으로 출제
- **`fill` 사용 기준**: 답이 1~3개의 짧고 구체적인 단어·용어인 경우 (긴 문장 금지)
- **`term` 사용 기준**: "다음이 설명하는 용어를 쓰시오" 형식의 1단어 정답
- **`short` 최소화**: 답 항목 3개 이하의 명확한 단어로만 사용
- 포괄적이거나 추측하기 어려운 단어(감정적 표현, 주관적 서술)는 정답으로 쓰지 않는다

### 데이터 파일 형식

```js
export default {
  lesson: 'r2',            // sections.js의 lessons 배열과 일치해야 함
  title: '최종 종합 시험',
  questions: [
    {
      id: 1,
      type: 'choice',      // 'choice' | 'fill' | 'term' | 'short'
      category: '소제목',
      question: '문제 내용 (HTML 태그 사용 가능)',
      options: [           // choice 타입에만 사용
        '① 선택지 1',
        '② 선택지 2',
        '③ 선택지 3',
        '④ 선택지 4',
      ],
      answers: ['②'],     // choice: 정답 기호(①②③④), 나머지: 정답 문자열
      explanation: '해설 내용 (HTML 태그 사용 가능)',
    },
  ],
}
```

### 문항 유형 요약

| type | 레이블 | 정답 형식 |
|------|--------|-----------|
| `choice` | 객관식 | `['②']` — 정답 기호만 |
| `fill` | 빈칸 채우기 | `['① 단어']` |
| `term` | 용어 쓰기 | `['단어']` |
| `short` | 단답형 | `['항목1', '항목2']` |

### choice 타입 작성 규칙

- 보기는 ①②③④ 기호로 시작한다
- 오답 보기는 그럴듯하지만 명확히 틀린 내용으로 구성한다
- 정답 기호는 ①~④ 중 분산시킨다

## 사이드바 섹션 관리 (`src/data/sections.js`)

섹션 그룹과 각 섹션에 속하는 퀴즈 파일의 `lesson` 식별자를 정의한다.
퀴즈 데이터 파일이 있어도 `sections.js`에 등록되지 않으면 사이드바에 표시되지 않는다.

```js
export default [
  {
    title: '종합 복습',
    lessons: ['r2'],   // r2-final-exam.js의 lesson 필드값
  },
]
```

- 숫자 식별자(`'01'~'14'`)는 자동으로 오름차순 정렬
- 비숫자 식별자(`'r1'`, `'r2'`)는 숫자 항목 뒤에 알파벳 순으로 정렬

## 스타일링 — Tailwind CSS v4

CSS Module 없이 Tailwind CSS v4 인라인 클래스로 스타일링한다.

### 디자인 토큰 (`src/global.css` `@theme`)

| 토큰 | 값 | 용도 |
|---|---|---|
| `canvas` | `#f5f4ef` | body 배경 |
| `card` | `#ffffff` | 카드 배경 |
| `ghost` | `#fafaf8` | 버튼 등 near-white 배경 |
| `lift` | `#eceae3` | hover 상태 배경 |
| `ink` | `#141413` | 주요 텍스트 |
| `ink-2` | `#6b6b68` | 보조 텍스트 |
| `ink-3` | `#9b9b96` | 레이블 / muted 텍스트 |
| `ink-4` | `#5a5a56` | 흐린 텍스트 (해설) |
| `stroke` | `#e0ddd4` | 주요 테두리 |
| `stroke-2` | `#d0cdc4` | 보조 테두리 (버튼) |
| `tint` | `#f0ede6` | 내부 구분선, 칩 배경 |
| `tint-2` | `#e8e5dc` | 해설 태그 배경 |
| `radius-card` | `14px` | 카드 모서리 → `rounded-card` |

사용 예시: `bg-canvas`, `text-ink-2`, `border-stroke`, `rounded-card`

## 앱 실행

```bash
npm run dev
```

## Python 환경 재설치

```bash
python3 -m venv .venv
.venv/bin/pip install playwright
.venv/bin/playwright install chromium
```
