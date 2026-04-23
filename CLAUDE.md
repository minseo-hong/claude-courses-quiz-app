# Claude Courses Quiz Project

## 프로젝트 개요

Anthropic의 [Claude Academy](https://anthropic.skilljar.com) 강의 본문을 URL로 추출하고, 각 코스의 종합 기출 퀴즈와 한국어 번역 본문을 React 앱으로 제공하는 프로젝트. 현재 **Claude 101**이 등록되어 있으며, 이후 다른 Claude 코스(Claude Code, MCP 등)가 추가될 예정이다.

프로젝트 패키지명: `claude-courses-quiz-app`

## 디렉토리 구조

```
claude/
├── CLAUDE.md
├── .gitignore                              # node_modules, dist, .venv, cookies.json, markdown/, .env, .vercel 등
├── fetch_lesson.py                         # URL → 강의 본문 텍스트 추출 스크립트 (Playwright)
├── fetch_all_lessons.py                    # 전체 레슨 마크다운 일괄 저장 스크립트
├── get_sidebar_structure.py                # Skilljar 사이드바 섹션·레슨 구조 추출
├── cookies.json                            # Skilljar 세션 쿠키 (git 제외)
├── .venv/                                  # Python 가상환경 (git 제외)
├── markdown/                               # 레슨 원문 마크다운 (git 제외 — 저작권 보호)
│   └── {번호}-{강의명}.md
├── package.json                            # React 퀴즈 앱 (Vite) — 루트에서 npm run dev
├── vite.config.js                          # @tailwindcss/vite 플러그인 포함
├── index.html                              # <title>Claude Courses Quiz</title>
├── public/
│   └── favicon.svg                         # Claude 브랜드 오렌지(#D97757) 스파클 심볼
└── src/
    ├── main.jsx                            # React 진입점 (RouterProvider 렌더)
    ├── App.jsx                             # createBrowserRouter 객체 기반 라우트 정의
    ├── global.css                          # Tailwind import + @theme 디자인 토큰
    ├── quizzes.js                          # 퀴즈 데이터 로더 + URL 헬퍼 (courseSlug, lessonPath 등)
    ├── contents.js                         # 레슨 번역 콘텐츠 로더 (slug → 마크다운 원문 문자열)
    ├── components/                         # 폴더 컴포넌트 구조 (각 컴포넌트 = 폴더 + index.jsx 배럴)
    │   ├── Layout/                         # 앱 셸 (사이드바 + 본문 + <Outlet />)
    │   │   ├── DrawerBackdrop/
    │   │   ├── MainContent/                #   <main> + 라우트 변경 시 스크롤 리셋
    │   │   ├── MobileTopBar/
    │   │   └── Sidebar/
    │   │       ├── SidebarHeader/          #     "Claude Courses" 브랜드 + 모바일 닫기 버튼
    │   │       └── SidebarNav/
    │   │           └── SidebarSection/
    │   │               └── SidebarNavItem/ #         단일 NavLink → 퀴즈 페이지로 이동
    │   ├── LessonTabs/                     # 강의 내용 ↔ 복습 퀴즈 탭 (두 페이지 공유)
    │   ├── MarkdownContent/                # 마크다운 렌더러 (react-markdown + 디자인 토큰 매핑)
    │   │   ├── MarkdownContent.jsx         #   ReactMarkdown 래퍼 (remark-gfm 활성)
    │   │   └── markdownComponents.jsx      #   HTML 태그별 Tailwind 스타일 매핑
    │   ├── ContentPage/                    # 강의 내용 페이지 (/content 서브리소스)
    │   └── QuizPage/                       # 복습 퀴즈 페이지
    │       ├── QuizPageHeader/
    │       └── QuizQuestionList/
    │           └── QuizCard/               #     reveal 상태 소유 + 카드 조립
    │               ├── QuizCardHeader/     #       Q번호 + 타입 레이블
    │               ├── QuizCategory/
    │               ├── QuizQuestion/
    │               ├── QuizOptions/
    │               │   └── QuizOption/
    │               ├── QuizAnswer/
    │               │   └── Chip/           #         복수 정답 chip
    │               ├── QuizExplanation/
    │               ├── RevealButton/
    │               └── HideButton/
    ├── content/                            # 레슨별 한국어 번역 마크다운 (slug.md → 자동 등록)
    │   └── {slug}.md
    └── data/
        ├── sections.js                     # 코스별 섹션 그룹 정의 (사이드바)
        └── {id}-{이름}.js                  # 퀴즈 데이터 파일 (앱에 자동 등록)
```

### 퀴즈 데이터 파일 명명 규칙

- 레슨별 파일: 두 자리 번호 + kebab-case 제목. 예: `01-what-is-claude.js`
- 종합 시험 파일: `r{번호}-{이름}.js` 형식. 예: `r1-final-exam.js`, `r2-exam-2.js`
- `lesson` 필드에 동일한 식별자를 기입하고, `sections.js`에 등록해야 사이드바에 표시된다.

## 컴포넌트 구조 원칙

- **폴더 컴포넌트 구조**: 각 컴포넌트는 자신의 이름을 가진 폴더를 가지고 `{Name}.jsx` + `index.jsx`(배럴) 쌍으로 구성된다.
- **1파일 1컴포넌트**: 한 파일에 하나의 컴포넌트만 정의한다. 내부 helper 컴포넌트도 별도 파일로 분리한다.
- **자식은 부모 아래 중첩**: 특정 부모만 사용하는 자식 컴포넌트는 부모 폴더 하위로 배치해 사용 관계를 구조에 반영한다 (예: `QuizCard/QuizAnswer/Chip/`).
- **공유 컴포넌트는 top-level**: 두 페이지 이상이 사용하는 컴포넌트는 `src/components/` 바로 아래에 둔다 (예: `LessonTabs/`).
- **SRP 기반 분리**: Layout/QuizPage처럼 복합 화면은 오케스트레이터 + 시각·행위 단위 하위 컴포넌트로 나눈다.
- **DIP (Presentational 분리)**: 하위 컴포넌트는 `quizzes`/`contents` 같은 데이터 모듈을 직접 import하지 않고 prop으로 주입받는다. 데이터에 대한 의존은 페이지·오케스트레이터 레벨로 국한한다.

## 라우팅 & URL 구조

- 라우터는 `react-router` v7의 `createBrowserRouter` + `RouterProvider` (객체 기반 구조). 정의 위치는 `src/App.jsx`.
- URL은 REST API 계층을 따른다.

| 리소스 | 경로 |
|---|---|
| 복습 퀴즈 | `/courses/:courseSlug/lessons/:slug` |
| 강의 내용 | `/courses/:courseSlug/lessons/:slug/content` |
| 루트/fallback | `/courses/claude-101/lessons/{첫 레슨 slug}` 로 리다이렉트 |

- **Slug 생성 규칙** (`src/quizzes.js`의 `slugify`):
  - 퀴즈 `title`을 소문자화 → Unicode 문자/숫자(`\p{L}\p{N}`)가 아닌 문자는 `-`로 치환 → 양끝 하이픈 정리
  - 선행 `lesson-\d+-` 접두사는 제거 (예: "Lesson 1 · What is Claude?" → `what-is-claude`)
  - 모의고사 제목처럼 한국어가 섞이면 한국어도 그대로 보존 (예: "1회 모의고사" → `1회-모의고사`)
- **URL 조립 헬퍼** (`src/quizzes.js`):
  - `courseSlug`: 현재 코스 slug 상수 (`'claude-101'`)
  - `lessonPath(slug)`: 퀴즈 URL
  - `lessonContentPath(slug)`: 콘텐츠 URL (`lessonPath(slug) + '/content'`)
  - 경로 구조를 한 곳에 캡슐화 — 변경 시 호출부에 영향 없음
- **주요 export**
  - `src/quizzes.js`: `grouped`(섹션별 퀴즈), `quizBySlug`, `firstSlug`
  - `src/contents.js`: `contentBySlug` — slug 단위 마크다운 원문 문자열 매핑

## 강의 콘텐츠 수집 (원문 추출)

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
`markdown/`은 저작권 보호를 위해 git에서 제외된다.

### 4. 사이드바 섹션 구조 재추출

```bash
.venv/bin/python get_sidebar_structure.py <강의_URL>
```

Skilljar 사이드바의 섹션 헤더(H3)와 레슨 링크를 JSON으로 출력한다.
강의 구조가 변경됐을 때 `sections.js` 업데이트에 활용한다.

## 한국어 번역 콘텐츠 추가

레슨 본문을 한국어로 번역해 웹 페이지에서 읽을 수 있게 하려면 `src/content/{slug}.md` 파일만 추가하면 된다. React 라이브러리 문서(MDN·React Docs·Tailwind Docs 등)와 같은 개발 문서 스타일로 자동 렌더링된다.

- 파일명 = 해당 퀴즈의 slug와 동일 (title로 자동 생성되는 값과 일치해야 함)
- 내용은 **GitHub Flavored Markdown**으로 작성 — 테이블·체크리스트·취소선·자동 링크 등 지원 (`remark-gfm`)
- `contents.js`가 `import.meta.glob(..., { query: '?raw' })`로 원문 문자열을 자동 등록 → 앱 재빌드 불필요
- 렌더링은 `MarkdownContent` 컴포넌트가 담당하며, `react-markdown`에 디자인 토큰(`text-ink`, `text-ink-2`, `bg-tint`, `border-stroke` 등) 기반의 커스텀 컴포넌트 매핑을 주입한다 (`markdownComponents.jsx`).
- 콘텐츠가 있는 레슨은 `/lessons/:slug/content` 경로에서 렌더되며, `LessonTabs`가 자동으로 탭을 노출한다.
- 본문은 흰색 카드(`bg-card border border-stroke rounded-card`) 안에 렌더된다. 별도 배경 스타일을 직접 지정할 필요가 없다.

### 마크다운 작성 규칙

- **본문 첫 H1은 생략**한다. 페이지 상단 헤더가 이미 레슨 제목을 출력하므로, 마크다운은 `##`부터 시작하는 것을 권장한다.
- **콜아웃/노트 박스**는 blockquote(`>`)로 작성한다 — 오렌지 액센트 왼쪽 바 + 연한 배경으로 렌더된다.
- **강조가 필요한 용어**는 `**굵게**`. 이탤릭(`*기울임*`)은 Claude 액센트(`accent-dim`) 색으로 강조되므로 본문 전체에 남발하지 않는다.
- **코드 펜스에는 언어를 명시**한다 (예: ` ```json `, ` ```bash `). 언어가 없으면 인라인 코드 스타일로 폴백된다.
- **테이블**은 GFM 문법 사용. 헤더 셀은 자동으로 `bg-tint`가 적용된다.
- HTML 태그를 섞어 쓸 수 있지만, 가독성을 위해 가능한 한 마크다운 문법으로만 작성한다.

## 퀴즈 데이터 작성 규칙

- 문항 유형: 정보처리기사 **필기+실기** 스타일 — `choice` 위주, 핵심 용어 암기는 `fill`/`term`
- **정답·해설은 기본 숨김**: 버튼 클릭 시 표시 (객관식 "정답 확인", 나머지 "정답 · 해설 보기")

### 종합 모의고사 구성 원칙

- 각 회차는 해당 코스의 **전 레슨을 고르게** 커버해야 한다 (주제별 분리 금지)
- 난이도·유형을 회차 간 균형 있게 배분
- 문항 중복 금지 (회차 간 동일 주제 문항을 반복하지 않는다)
- 예시: Claude 101 현재 구성 — 5회 모의고사, 각 21문항, L01~L12 전범위

### 문항 구성 원칙

- **`choice` 우선**: 사실 확인, 개념 구분, 정의 매칭은 객관식으로 출제
- **`fill` 사용 기준**: 답이 1~3개의 짧고 구체적인 단어·용어인 경우 (긴 문장 금지)
- **`term` 사용 기준**: "다음이 설명하는 용어를 쓰시오" 형식의 1단어 정답
- **`short` 최소화**: 답 항목 3개 이하의 명확한 단어로만 사용
- 포괄적이거나 추측하기 어려운 단어(감정적 표현, 주관적 서술)는 정답으로 쓰지 않는다

### 데이터 파일 형식

```js
export default {
  lesson: 'r1',            // sections.js의 lessons 배열과 일치해야 함 (내부 식별자)
  title: '1회 모의고사',    // URL slug는 이 title에서 자동 생성된다
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

- `lesson`은 `sections.js`와 연결되는 내부 식별자이고, URL에 노출되는 slug는 `title`에서 자동 파생되므로 따로 작성할 필요가 없다.

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

**선택지를 "개념을 몰라도 맞출 수 있게" 만들지 않는다.** 학습자가 본문 내용을 파악하지 못한 상태에서도 선택지의 시각적·언어적 단서만으로 정답을 추측할 수 있다면 퀴즈의 목적이 무너진다. 다음 원칙을 지킨다.

- **길이를 균형 있게 맞춘다.** 정답만 길고 오답이 짧으면 길이만 보고 정답이 드러난다. 네 선택지를 비슷한 글자 수·호흡으로 작성한다. 정답이 길어져야 한다면 오답도 세부를 덧붙여 비슷한 분량으로 늘린다.
- **오답도 "있을 법한" 내용이어야 한다.** 개념을 몰라도 누가 봐도 말이 안 되는 오답(예: "DRM 자동 복호화", "모델 파라미터를 사용자가 재학습")은 즉시 소거된다. 실제로 비슷한 제품에서 가능한 동작이거나 학습자가 오해할 법한 설명으로 구성한다.
- **절대어를 남용하지 않는다.** "완전히", "반드시", "항상", "오직", "무조건"처럼 지나치게 단정적인 표현이 오답에만 몰리면 그 자체가 단서가 된다. 꼭 필요할 때만 사용하고, 필요하면 정답에도 적절히 섞는다.
- **문법·어미·스타일을 통일한다.** 네 선택지가 같은 구조로 끝나게 다듬는다(예: "~한다" / "~된다" / 명사형 중 하나로 통일). 한 선택지만 어투가 달라도 정답이 드러난다.
- **키워드 노출을 피한다.** 질문의 핵심 키워드가 정답 선택지에만 그대로 등장하면 단서가 된다. 필요하면 오답에도 같은 키워드를 의도적으로 배치한다.

## 사이드바 섹션 관리 (`src/data/sections.js`)

코스별 섹션 그룹과 각 섹션에 속하는 퀴즈 파일의 `lesson` 식별자를 정의한다.
**레슨별 퀴즈 섹션은 Skilljar 강의 사이드바의 원본 섹션 헤더(H3)를 그대로 타이틀로 사용한다** (예: `'Meet Claude'`, `'Organizing your work and knowledge'`).
기출 모의고사는 별도 섹션으로 분리하며, 타이틀은 한국어 `'기출 모의고사'`를 사용한다.
퀴즈 데이터 파일이 있어도 `sections.js`에 등록되지 않으면 사이드바에 표시되지 않는다.

원본 섹션 구조는 `get_sidebar_structure.py`로 재추출해 반영한다.

```js
export default [
  { title: 'Meet Claude', lessons: ['01', '02', '03', '04'] },
  { title: 'Organizing your work and knowledge', lessons: ['05', '06', '07'] },
  { title: '기출 모의고사', lessons: ['r1', 'r2', 'r3', 'r4', 'r5'] },
  // 다른 코스 추가 시에도 동일 패턴 — 해당 코스 Skilljar 섹션 헤더를 타이틀로 사용
]
```

- `title`이 빈 문자열이면 섹션 헤더가 렌더링되지 않는다 (`SidebarSection`이 조건부 처리)
- 숫자 식별자(`'01'~'14'`)는 자동으로 오름차순 정렬
- 비숫자 식별자(`'r1'`, `'r2'`)는 숫자 항목 뒤에 알파벳 순으로 정렬
- 사이드바 상단 고정 헤더 `Claude Courses`는 `Layout/Sidebar/SidebarHeader`가 렌더링

## 스타일링 — Tailwind CSS v4

CSS Module 없이 Tailwind CSS v4 인라인 클래스로 스타일링한다. 아이콘은 [`lucide-react`](https://lucide.dev)에서 불러오며 기본 `strokeWidth`를 사용한다.

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

브랜드 액센트 컬러 `#D97757` (Claude 오렌지)는 favicon에서 사용.

사용 예시: `bg-canvas`, `text-ink-2`, `border-stroke`, `rounded-card`

## 앱 실행 / 빌드

```bash
npm run dev       # 개발 서버
npm run build     # 프로덕션 빌드 → dist/
npm run preview   # 빌드 결과 미리보기
```

주요 의존성: `react`, `react-dom`, `react-router`, `lucide-react`, `tailwindcss`, `@tailwindcss/vite`, `react-markdown`, `remark-gfm`.

## 배포 (Vercel)

Vite 프로젝트이므로 Vercel이 자동 감지한다 (`vercel.json` 불필요).

- **GitHub 경유**: 리포지토리 push → Vercel 대시보드에서 import → 자동 빌드
- **CLI 직접**: `npm i -g vercel && vercel`
- 빌드 커맨드: `npm run build`, 출력 디렉터리: `dist`

## Git Convention

[Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따른다.

### 커밋 메시지 형식

```
<type>: <subject>   # type은 영문 소문자, subject는 한국어 현재형

<본문 — 선택>

<footer — 선택, Co-Authored-By 등>
```

### type 목록

| type | 용도 |
|---|---|
| `feat` | 새 기능 추가, 신규 퀴즈/섹션 추가 |
| `fix` | 버그 수정 (오답/오탈자 수정 포함) |
| `refactor` | 동작 변화 없는 구조 개선 |
| `chore` | 빌드·설정·에셋 정리 등 잡무성 작업 |
| `docs` | 문서(CLAUDE.md, README 등) 수정 |
| `style` | 포매팅·공백·세미콜론 등 비기능적 변경 |
| `test` | 테스트 추가/수정 |
| `build` | 빌드 시스템·의존성 변경 |
| `ci` | CI 설정 변경 |

### 예시

```
feat: Claude Code 코스 모의고사 1회차 추가
fix: r2-exam-2 14번 문항 정답 기호 수정
chore: 사용하지 않는 에셋 제거
docs: CLAUDE.md 섹션 구조 설명 갱신
```

## Python 환경 재설치

```bash
python3 -m venv .venv
.venv/bin/pip install playwright
.venv/bin/playwright install chromium
```
