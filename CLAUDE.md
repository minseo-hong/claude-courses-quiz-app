# Claude Courses Quiz Project

## 프로젝트 개요

Anthropic의 [Claude Academy](https://anthropic.skilljar.com) 강의 본문을 URL로 추출하고, 각 코스의 종합 기출 퀴즈와 한국어 번역 본문을 Next.js 앱으로 제공하는 프로젝트. 현재 **Claude 101**이 등록되어 있으며, 이후 다른 Claude 코스(Claude Code, MCP 등)가 추가될 예정이다.

프로젝트 패키지명: `next-app` (내부). 저장소 루트는 `claude-courses-quiz-app`.

## 기술 스택

- **Next.js 16** (App Router · Turbopack 기본) + **React 19**
- **TypeScript** (`strict`)
- **Tailwind CSS v4** (`@tailwindcss/postcss` 플러그인)
- **pnpm** (패키지 매니저)
- `react-markdown` + `remark-gfm` + `remark-cjk-friendly` (번역 마크다운 렌더링; CJK 경계에서도 `**굵게**`가 정상 닫힘)
- `lucide-react` (아이콘)
- Python + [Playwright](https://playwright.dev/python/) — Skilljar 원문 스크래핑

> Next.js 16은 **학습 데이터 이후 변경점**이 많다. 자세한 주의점은 `AGENTS.md`와 `node_modules/next/dist/docs/` 를 참고한다. 대표적으로 `params`가 `Promise`로 바뀌어 `await props.params`가 필수이고, 전역 타입 `PageProps<'/path'>`·`LayoutProps<'/path'>`가 자동 생성된다.

## 디렉토리 구조

```
claude-courses-quiz-app/
├── CLAUDE.md
├── AGENTS.md                               # Next.js 16 주의 사항 (Claude·에이전트용)
├── .gitignore                              # node_modules, .next, .venv, cookies.json, markdown/, .env, .vercel 등
├── fetch_lesson.py                         # URL → 강의 본문 텍스트 추출 스크립트 (Playwright)
├── fetch_all_lessons.py                    # 전체 레슨 마크다운 일괄 저장 스크립트
├── get_sidebar_structure.py                # Skilljar 사이드바 섹션·레슨 구조 추출
├── cookies.json                            # Skilljar 세션 쿠키 (git 제외)
├── .venv/                                  # Python 가상환경 (git 제외)
├── markdown/                               # 레슨 원문 마크다운 (git 제외 — 저작권 보호)
│   └── {번호}-{강의명}.md
├── package.json                            # Next.js 앱
├── pnpm-lock.yaml
├── pnpm-workspace.yaml                     # ignoredBuiltDependencies 설정
├── next.config.ts                          # turbopack.root 명시
├── postcss.config.mjs                      # @tailwindcss/postcss
├── tsconfig.json                           # "@/*" → "./src/*"
├── eslint.config.mjs                       # next/core-web-vitals
├── next-env.d.ts                           # Next.js 자동 생성 (git 제외)
├── public/
│   └── favicon.svg                         # Claude 브랜드 오렌지(#D97757) 스파클 심볼
└── src/
    ├── app/                                # App Router — 파일 기반 라우팅
    │   ├── layout.tsx                      #   루트 레이아웃 (서버) · <html>/<body> + AppShell
    │   ├── page.tsx                        #   루트 리다이렉트 → 첫 레슨
    │   ├── globals.css                     #   Tailwind import + @theme 디자인 토큰
    │   └── courses/
    │       └── [courseSlug]/
    │           └── lessons/
    │               └── [slug]/
    │                   ├── page.tsx        #     퀴즈 페이지 (서버 · SSG)
    │                   └── content/
    │                       └── page.tsx    #     번역본 페이지 (서버 · SSG · fs)
    ├── lib/
    │   ├── urls.ts                         # URL 헬퍼 (courseSlug, lessonPath, lessonContentPath) — 양쪽에서 import 가능
    │   ├── quizzes.ts                      # 퀴즈 명시적 import + grouped/quizBySlug/sidebarSections/firstSlug (서버 컨텍스트 권장)
    │   └── content.ts                      # 'server-only' + fs로 src/content/*.md 로드
    ├── components/                         # 폴더 컴포넌트 구조 ({Name}.tsx + index.ts 배럴)
    │   ├── AppShell/                       #   클라이언트 래퍼 — 드로어 상태 보유
    │   ├── Sidebar/                        #   사이드바 + 하위 (SidebarHeader, SidebarNav/Section/NavItem)
    │   ├── MobileTopBar/                   #   모바일 상단 바 (햄버거 · 현재 레슨 제목)
    │   ├── DrawerBackdrop/                 #   모바일 드로어 배경
    │   ├── MainContent/                    #   <main> + 경로 변경 시 스크롤 리셋 (클라이언트)
    │   ├── LessonTabs/                     #   강의 내용 ↔ 복습 퀴즈 탭 (클라이언트)
    │   ├── MarkdownContent/                #   react-markdown 래퍼 (클라이언트)
    │   │   ├── MarkdownContent.tsx
    │   │   └── markdownComponents.tsx      #   HTML 태그별 Tailwind 스타일 매핑
    │   ├── ContentPage/                    #   번역본 페이지 구성 (서버)
    │   └── QuizPage/                       #   퀴즈 페이지 구성 (서버)
    │       ├── QuizPageHeader/
    │       └── QuizQuestionList/
    │           └── QuizCard/               #     reveal 상태 보유 (클라이언트)
    │               ├── QuizCardHeader/
    │               ├── QuizCategory/
    │               ├── QuizQuestion/
    │               ├── QuizOptions/
    │               │   └── QuizOption/
    │               ├── QuizAnswer/
    │               │   └── Chip/
    │               ├── QuizExplanation/
    │               ├── RevealButton/
    │               └── HideButton/
    ├── content/                            # 레슨별 한국어 번역 마크다운 (slug.md → fs 기반 자동 등록)
    │   └── {slug}.md
    └── data/                               # 퀴즈 데이터 (.js · plain data 모듈)
        ├── sections.js                     # 코스별 섹션 그룹 정의 (사이드바)
        └── {id}-{이름}.js                  # 퀴즈 데이터 파일 (lib/quizzes.ts에서 명시적 import 필요)
```

### 퀴즈 데이터 파일 명명 규칙

- 레슨별 파일: 두 자리 번호 + kebab-case 제목. 예: `01-what-is-claude.js`
- 섹션 종합 퀴즈 파일: `s{번호}-{이름}-review.js` 형식. 예: `s1-meet-claude-review.js`, `s2-organizing-knowledge-review.js`
- `lesson` 필드에 동일한 식별자를 기입하고(예: `'s1'`), `sections.js`에 등록해야 사이드바에 표시된다.
- 새 퀴즈 파일을 추가할 때는 **`src/lib/quizzes.ts` 상단의 명시적 import 목록에도 한 줄을 추가**해야 한다 (Next.js에서는 Vite의 `import.meta.glob`를 쓰지 않는다).

## 컴포넌트 구조 원칙

- **서버 컴포넌트 기본**: 모든 컴포넌트는 기본이 **서버**다. `useState`·`useEffect`·이벤트 핸들러·브라우저 API가 필요한 경우에만 파일 상단에 `'use client'`를 표기한다.
- **데이터 의존성은 서버에 가둔다**: `lib/quizzes.ts`는 전체 퀴즈 데이터를 포함하므로 **서버 컨텍스트(페이지·layout)에서 import**하고, 클라이언트 컴포넌트에는 필요한 최소 필드만 prop으로 전달한다. 예: `sidebarSections`(slug/lesson/title만)와 현재 `quiz` 객체를 props로 내려보낸다.
- **서버 전용 모듈 마커**: `lib/content.ts`는 상단에 `import 'server-only'`를 둬 클라이언트 번들링 시 빌드 에러가 나도록 한다. fs 기반 로더를 실수로 클라이언트에서 import하지 않도록 보호한다.
- **URL 헬퍼는 분리**: `lib/urls.ts`에 `courseSlug`·`lessonPath`·`lessonContentPath`만 두어 클라이언트/서버 양쪽에서 자유롭게 import할 수 있도록 한다. 헬퍼가 `lib/quizzes.ts`를 import하면 퀴즈 데이터가 클라이언트 번들에 끌려가므로 금지한다.
- **폴더 컴포넌트 구조**: 각 컴포넌트는 자신의 이름을 가진 폴더를 가지고 `{Name}.tsx` + `index.ts`(배럴) 쌍으로 구성된다.
- **1파일 1컴포넌트**: 한 파일에 하나의 컴포넌트만 정의한다. 내부 helper 컴포넌트도 별도 파일로 분리한다.
- **자식은 부모 아래 중첩**: 특정 부모만 사용하는 자식 컴포넌트는 부모 폴더 하위로 배치해 사용 관계를 구조에 반영한다 (예: `QuizCard/QuizAnswer/Chip/`).
- **공유 컴포넌트는 top-level**: 두 페이지 이상이 사용하는 컴포넌트는 `src/components/` 바로 아래에 둔다 (예: `LessonTabs/`, `MarkdownContent/`).
- **SRP 기반 분리**: `AppShell`·`QuizPage`처럼 복합 화면은 오케스트레이터 + 시각·행위 단위 하위 컴포넌트로 나눈다.
- **타입 이름 충돌 주의**: `QuizQuestion`처럼 컴포넌트 이름과 타입 이름이 겹치는 경우 `import type { QuizQuestion as QuizQuestionData } from '@/lib/quizzes'`와 같이 alias한다.

### 현재 클라이언트 컴포넌트 목록

상호작용 필요해 `'use client'`가 필요한 컴포넌트:

- `AppShell/` — 드로어 `useState`
- `Sidebar/SidebarHeader/`, `Sidebar/SidebarNav/SidebarSection/SidebarNavItem/` — `usePathname`(active 스타일), close 버튼
- `MobileTopBar/` — `useParams`(현재 레슨), 햄버거 버튼
- `DrawerBackdrop/` — 클릭 핸들러
- `MainContent/` — `usePathname` + `useEffect`(스크롤 리셋)
- `LessonTabs/` — `usePathname`(active)
- `MarkdownContent/` — `react-markdown` 렌더 (SSR로도 동작하지만 일관성을 위해 클라이언트 처리)
- `QuizCard/`, `RevealButton/`, `HideButton/` — `useState`(reveal)

## 라우팅 & URL 구조 (App Router)

Next.js App Router의 파일 기반 라우팅을 사용한다. URL은 REST API 계층을 따른다.

| 리소스 | 경로 | 파일 |
|---|---|---|
| 루트 | `/` | `src/app/page.tsx` (→ `redirect(lessonPath(firstSlug))`) |
| 복습 퀴즈 | `/courses/:courseSlug/lessons/:slug` | `src/app/courses/[courseSlug]/lessons/[slug]/page.tsx` |
| 강의 내용 | `/courses/:courseSlug/lessons/:slug/content` | `src/app/courses/[courseSlug]/lessons/[slug]/content/page.tsx` |

- **정적 생성 (SSG)**: 두 동적 라우트 모두 `generateStaticParams()`로 빌드 시점에 전체 경로를 미리 렌더한다. 알 수 없는 slug는 `notFound()`로 404.
- **params는 Promise**: Next.js 16 규약에 따라 `const { slug } = await props.params`로 언래핑한다. 타입은 `PageProps<'/courses/[courseSlug]/lessons/[slug]'>` 전역 타입 헬퍼를 사용한다.
- **Slug 생성 규칙** (`src/lib/quizzes.ts`):
  - 기본: `title`을 소문자화 → Unicode 문자/숫자(`\p{L}\p{N}`)가 아닌 문자는 `-`로 치환 → 양끝 하이픈 정리 → 선행 `lesson-\d+-` 접두사 제거 (예: "Lesson 1 · What is Claude?" → `what-is-claude`)
  - **한국어·특수문자 타이틀은 데이터 파일에 `slug` 필드를 명시**한다. `QuizModule.slug`가 지정되면 slugify 결과보다 우선한다 (예: `title: '섹션 1 종합 퀴즈 · Meet Claude'` + `slug: 'section-1-review'`). URL에 한국어가 들어가면 인코딩·공유·디버깅이 번거롭다.
- **URL 조립 헬퍼** (`src/lib/urls.ts` — 양쪽에서 import 가능):
  - `courseSlug`: 현재 코스 slug 상수 (`'claude-101'`)
  - `lessonPath(slug)`: 퀴즈 URL
  - `lessonContentPath(slug)`: 콘텐츠 URL (`lessonPath(slug) + '/content'`)
- **링크·네비게이션**: `next/link`의 `<Link>`는 뷰포트 진입 시 자동 prefetch된다. `usePathname`/`useParams`는 `next/navigation`에서 가져온다.
- **주요 export**
  - `src/lib/quizzes.ts`: `grouped`(섹션별 퀴즈 — 전체 문항 포함), `quizBySlug`, `firstSlug`, `sidebarSections`(경량·클라이언트 안전)
  - `src/lib/content.ts`: `getContent(slug)`, `hasContent(slug)`, `getContentSlugs()` — 모두 서버 전용

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
- **CJK 경계 보정**: `remark-cjk-friendly` 플러그인이 CommonMark의 right-flanking 규칙을 한·중·일 문자에 친화적으로 완화한다. 덕분에 `**인텔리전스(intelligence)**입니다` 처럼 `**` 바로 앞이 구두점이고 뒤가 한글 조사인 경우도 정상적으로 닫힌다 (플러그인 없이는 CommonMark 스펙상 `**`가 종료되지 않아 본문에 `**`가 그대로 노출됨).
- `src/lib/content.ts`가 `fs.readdirSync` / `fs.readFileSync`로 파일을 동적으로 로드 → 서버 빌드 시점에 `generateStaticParams()`가 slug 목록을 긁어가 SSG 페이지를 만든다 → 앱 재빌드 자동
- 렌더링은 `MarkdownContent` 컴포넌트가 담당하며, `react-markdown`에 디자인 토큰(`text-ink`, `text-ink-2`, `bg-tint`, `border-stroke` 등) 기반의 커스텀 컴포넌트 매핑을 주입한다 (`markdownComponents.tsx`).
- 콘텐츠가 있는 레슨은 `/lessons/:slug/content` 경로에서 렌더되며, `QuizPage`는 `hasContent(slug)` 결과에 따라 자동으로 탭을 노출한다.
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

### 섹션 종합 퀴즈 구성 원칙

- 각 섹션의 **모든 레슨을 고르게** 커버한다 (특정 레슨에 편중 금지)
- 단일 개념 확인보다 **여러 레슨을 가로지르는 응용·시나리오 문항**을 비중 있게 포함
- 레슨별 개별 퀴즈와 문항 중복 금지 (같은 개념을 다른 각도에서 묻도록 구성)
- 예시: Claude 101 현재 구성 — 섹션 1·2·3·4 각 15문항, 섹션 5는 L13 단일 레슨이라 별도 리뷰 없음

### 문항 구성 원칙

- **`choice` 우선**: 사실 확인, 개념 구분, 정의 매칭은 객관식으로 출제
- **`fill` 사용 기준**: 답이 1~3개의 짧고 구체적인 단어·용어인 경우 (긴 문장 금지)
- **`term` 사용 기준**: "다음이 설명하는 용어를 쓰시오" 형식의 1단어 정답
- **`short` 최소화**: 답 항목 3개 이하의 명확한 단어로만 사용
- 포괄적이거나 추측하기 어려운 단어(감정적 표현, 주관적 서술)는 정답으로 쓰지 않는다

### 데이터 파일 형식

```js
export default {
  lesson: 's1',                              // sections.js의 lessons 배열과 일치해야 함 (내부 식별자)
  title: '섹션 1 종합 퀴즈 · Meet Claude',   // 사이드바·헤더에 표시되는 제목
  slug: 'section-1-review',                  // URL slug. 한국어·특수문자 타이틀이면 반드시 명시
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

- `lesson`은 `sections.js`와 연결되는 내부 식별자이고, URL에 노출되는 `slug`는 영문 제목이면 `title`에서 자동 파생된다. 한국어·특수문자가 섞인 제목이면 `slug` 필드에 영어 슬러그를 직접 지정한다.
- 데이터 파일은 `.js`(plain data 모듈)로 유지한다. TS로 변환할 필요 없이 `src/lib/quizzes.ts`에서 `QuizModule` 타입으로 캐스팅해 사용한다.

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
**레슨별 퀴즈 섹션은 Skilljar 강의 사이드바의 원본 섹션 헤더(H3)를 그대로 타이틀로 사용한다** (예: `'Meet Claude'`, `'Expanding Claude\'s reach'`).
섹션 종합 퀴즈(`s{N}`)는 해당 섹션의 `lessons` 배열 끝에 함께 등록한다.
퀴즈 데이터 파일이 있어도 `sections.js`에 등록되지 않으면 사이드바에 표시되지 않는다.

원본 섹션 구조는 `get_sidebar_structure.py`로 재추출해 반영한다.

```js
export default [
  { title: 'Meet Claude', lessons: ['01', '02', '03', '04', 's1'] },
  { title: 'Organizing your work and knowledge', lessons: ['05', '06', '07', 's2'] },
  { title: "Expanding Claude's reach", lessons: ['08', '09', '10', 's3'] },
  // 다른 코스 추가 시에도 동일 패턴 — 해당 코스 Skilljar 섹션 헤더를 타이틀로 사용
]
```

- `title`이 빈 문자열이면 섹션 헤더가 렌더링되지 않는다 (`SidebarSection`이 조건부 처리)
- 숫자 식별자(`'01'~'14'`)는 자동으로 오름차순 정렬
- 비숫자 식별자(`'s1'`, `'s2'`)는 숫자 항목 뒤에 알파벳 순으로 정렬
- 사이드바 상단 고정 헤더 `Claude Courses`는 `Sidebar/SidebarHeader`가 렌더링

## 스타일링 — Tailwind CSS v4

CSS Module 없이 Tailwind CSS v4 인라인 클래스로 스타일링한다. 아이콘은 [`lucide-react`](https://lucide.dev)에서 불러오며 기본 `strokeWidth`를 사용한다. Tailwind는 `@tailwindcss/postcss` PostCSS 플러그인으로 연결되어 있으며, `src/app/globals.css`가 `@import "tailwindcss"` + `@theme` 블록을 통해 디자인 토큰을 정의한다.

### 디자인 토큰 (`src/app/globals.css` `@theme`)

| 토큰 | 값 | 용도 |
|---|---|---|
| `canvas` | `#FAF9F5` | body 배경 |
| `card` | `#FFFFFF` | 카드 배경 |
| `ghost` | `#F5F3EF` | 버튼 등 near-white 배경 |
| `lift` | `#EDE9E1` | hover 상태 배경 |
| `accent` | `#D97757` | 브랜드 primary (Claude 오렌지) |
| `accent-dim` | `#B85C35` | 텍스트 강조용 진한 오렌지 |
| `accent-tint` | `#FEF3EC` | 오렌지 연한 wash |
| `accent-border` | `#F0C4A4` | 오렌지 테두리 |
| `ink` | `#1C1814` | 주요 텍스트 |
| `ink-2` | `#6C6560` | 보조 텍스트 |
| `ink-3` | `#9E9890` | 레이블 / muted 텍스트 |
| `ink-4` | `#5C5550` | 흐린 텍스트 (해설) |
| `stroke` | `#E3DDD4` | 주요 테두리 |
| `stroke-2` | `#D4CEC4` | 보조 테두리 (버튼) |
| `tint` | `#F0EDE6` | 내부 구분선, 칩 배경 |
| `tint-2` | `#E8E3DC` | 해설 태그 배경 |
| `radius-card` | `14px` | 카드 모서리 → `rounded-card` |

사용 예시: `bg-canvas`, `text-ink-2`, `border-stroke`, `rounded-card`, `bg-accent-tint`.

## 앱 실행 / 빌드

```bash
pnpm install      # 의존성 설치
pnpm dev          # Turbopack dev server (기본 http://localhost:3000)
pnpm build        # Turbopack 프로덕션 빌드 (SSG 페이지 모두 정적 생성)
pnpm start        # 빌드 결과 실행
pnpm lint         # ESLint (next/core-web-vitals)
```

- Turbopack은 **dev·build 모두 기본**(Next.js 16+)이다. `next.config.ts`의 `turbopack.root`로 workspace 루트를 명시해 두었다.
- 타입 체크는 Turbopack이 아닌 `tsc`가 수행한다 — IDE·`pnpm build`에서 검증한다.

## 배포 (Vercel)

Next.js 프로젝트이므로 Vercel이 별도 설정 없이 자동 감지한다 (`vercel.json` 불필요).

- **GitHub 경유**: 리포지토리 push → Vercel 대시보드에서 import → 자동 빌드
- **CLI 직접**: `pnpm add -g vercel && vercel`
- 빌드 커맨드: `pnpm build`, 출력 디렉터리: `.next` (Next.js 기본)
- 모든 레슨·콘텐츠 경로가 `generateStaticParams`로 정적 HTML로 prerender되므로 런타임 비용이 매우 낮다.

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
feat: 섹션 3·4 종합 퀴즈 추가
fix: s2-organizing-knowledge-review 7번 문항 정답 기호 수정
chore: 사용하지 않는 에셋 제거
docs: CLAUDE.md 섹션 구조 설명 갱신
```

## Python 환경 재설치

```bash
python3 -m venv .venv
.venv/bin/pip install playwright
.venv/bin/playwright install chromium
```
