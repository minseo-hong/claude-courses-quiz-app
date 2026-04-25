export default {
  lesson: '03',
  title: 'Lesson 3 · Installing Claude Code',
  questions: [
    {
      id: 1,
      type: 'choice',
      category: '터미널 설치 — macOS · Linux · WSL',
      question: 'macOS · Linux · WSL에서 Claude Code를 설치할 때 강의가 안내한 두 방식의 차이로 가장 정확한 것은?',
      options: [
        '① 한 줄 스크립트 설치는 자동 업데이트가 지원되고, 패키지 매니저 설치는 자동 업데이트가 지원되지 않는다',
        '② 한 줄 스크립트 설치는 자동 업데이트가 지원되지 않고, 패키지 매니저 설치는 자동 업데이트가 지원된다',
        '③ 두 방식 모두 자동 업데이트가 지원되어 어느 쪽을 골라도 사용 경험이 동일하다',
        '④ 두 방식 모두 자동 업데이트가 지원되지 않아 매번 동일한 절차로 다시 설치해야 한다',
      ],
      answers: ['①'],
      explanation:
        '강의는 macOS · Linux · WSL에서 <b><code>curl</code> 한 줄 스크립트 설치</b>를 권장하며, Homebrew(<code>brew install</code>)도 가능하지만 <b>자동 업데이트가 지원되지 않는다</b>고 명시한다.',
    },
    {
      id: 2,
      type: 'choice',
      category: '터미널 설치 — Windows',
      question: 'Windows에서 Claude Code를 설치하는 방법에 대한 설명으로 강의 내용과 일치하는 것은?',
      options: [
        '① PowerShell 스크립트 설치, CMD 스크립트 설치, 그리고 OS 패키지 매니저 설치 세 가지가 안내된다',
        '② Visual Studio Installer 컴포넌트로만 설치할 수 있고 다른 방식은 안내되지 않는다',
        '③ Microsoft Store 전용 패키지로만 배포되며 명령줄 설치 경로는 안내되지 않는다',
        '④ WSL 환경 내부에서만 설치할 수 있고 네이티브 Windows 환경 설치는 안내되지 않는다',
      ],
      answers: ['①'],
      explanation:
        'Windows에서는 <b>PowerShell의 <code>Invoke-RestMethod</code></b>, <b>CMD의 <code>curl</code></b>, 그리고 <b><code>winget</code></b> 세 가지가 안내된다. 다만 <code>winget</code>은 Homebrew와 마찬가지로 자동 업데이트가 되지 않는다.',
    },
    {
      id: 3,
      type: 'choice',
      category: '초기 실행 — 작업 범위',
      question: '터미널에서 Claude Code 명령을 실행했을 때의 작업 범위로 가장 정확한 것은?',
      options: [
        '① 명령을 실행한 디렉터리와 그 모든 하위 폴더를 작업 범위로 갖는다',
        '② 명령을 실행한 디렉터리만 작업 범위로 갖고 하위 폴더는 포함하지 않는다',
        '③ 사용자의 홈 디렉터리 전체를 실행 위치와 무관하게 작업 범위로 갖는다',
        '④ 운영체제 루트 전체를 실행 위치와 무관하게 작업 범위로 갖는다',
      ],
      answers: ['①'],
      explanation:
        'Claude Code는 <b>명령을 실행한 디렉터리와 그 아래 모든 하위 폴더</b>를 작업 범위로 삼는다. 따라서 의도한 프로젝트 폴더에서 실행해야 한다.',
    },
    {
      id: 4,
      type: 'choice',
      category: '초기 설정 — 로그인',
      question: '처음 실행 시 강의가 안내한 로그인 옵션으로 적절하지 <b>않은</b> 것은?',
      options: [
        '① 유료 구독 계정으로 로그인해 인증한다',
        '② 발급받은 API 키를 입력해 인증한다',
        '③ 조직이 보유한 엔터프라이즈 계정 옵션을 선택해 인증한다',
        '④ 로컬에 작성한 코드를 학습 데이터로 등록해 인증을 대신한다',
      ],
      answers: ['④'],
      explanation:
        '강의가 든 옵션은 <b>구독 계정(Pro · Max · Enterprise) 로그인</b>, <b>API 키 입력</b>, 그리고 조직용 <b>엔터프라이즈 계정 선택</b>이다. 사용자의 코드를 학습 데이터로 등록해 인증을 우회한다는 동작은 존재하지 않는다.',
    },
    {
      id: 5,
      type: 'choice',
      category: 'VS Code 확장',
      question: 'VS Code Extensions 패널에서 Claude Code 확장을 식별할 때 강의가 강조한 단서는?',
      options: [
        '① 게시자가 누구든 다운로드 수가 가장 많은 확장을 우선 선택한다',
        '② 게시자가 누구든 별점이 가장 높은 확장을 우선 선택한다',
        '③ 게시자가 Anthropic이고 인증 체크 표시가 붙은 확장을 선택한다',
        '④ 게시자가 누구든 가장 최근에 업데이트된 확장을 우선 선택한다',
      ],
      answers: ['③'],
      explanation:
        '확장 검색 결과에서는 <b>Anthropic이 게시했고 파란색 인증 체크가 붙은 확장</b>을 골라야 한다. 다운로드 수 · 별점 · 업데이트 시점은 정품 식별 기준이 아니다.',
    },
    {
      id: 6,
      type: 'choice',
      category: 'VS Code 확장 — 사용 방식',
      question: 'VS Code 확장에서 Claude Code의 UI 사용 방식에 대한 설명으로 강의 내용과 일치하는 것은?',
      options: [
        '① 확장은 전용 UI만 제공하고 터미널과 동일한 사용감은 사용할 수 없다',
        '② 확장은 설정에서 UI를 옵트아웃하고 터미널과 동일한 사용감을 그대로 쓸 수 있다',
        '③ 확장은 별도 브라우저 창을 띄워야만 동작하고 에디터 안에서는 사용할 수 없다',
        '④ 확장은 우클릭 메뉴에서만 호출할 수 있고 명령 팔레트에서는 호출할 수 없다',
      ],
      answers: ['②'],
      explanation:
        'VS Code 확장은 터미널 경험과 거의 동일한 사용감을 제공하며, <b>설정에서 UI를 옵트아웃</b>해 터미널 경험을 그대로 쓸 수 있다. 또한 명령 팔레트에서 "Claude Code Open in New Tab"으로 새 탭에 띄울 수도 있다.',
    },
    {
      id: 7,
      type: 'choice',
      category: 'JetBrains 플러그인',
      question: 'JetBrains 환경에서 Claude Code 플러그인을 설치한 뒤의 동작으로 가장 정확한 것은?',
      options: [
        '① IDE를 재시작한 뒤 별도의 외부 윈도우가 열려 IDE와 분리된 채로 동작한다',
        '② IDE를 재시작한 뒤 로고를 클릭하면 에디터와 나란히 동작하는 터미널 패널이 열린다',
        '③ IDE를 재시작한 뒤 IDE 전체가 Claude Code 전용 모드로 전환되어 다른 작업이 막힌다',
        '④ IDE를 재시작한 뒤에도 명령줄 진입점이 제공되지 않아 코드 편집과 동시 사용이 어렵다',
      ],
      answers: ['②'],
      explanation:
        'JetBrains 마켓플레이스에서 플러그인을 설치한 뒤 IDE를 재시작하면 <b>Claude 로고가 표시</b>되고, 클릭 시 <b>에디터와 나란히 동작하는 터미널 패널</b>이 열린다.',
    },
    {
      id: 8,
      type: 'choice',
      category: '데스크톱 앱',
      question: 'Claude Desktop의 Code 토글이 제공하는 기능으로 강의가 언급하지 <b>않은</b> 것은?',
      options: [
        '① 특정 폴더 안에서 작업을 진행할 수 있다',
        '② 권한 모드를 상황에 맞게 조정할 수 있다',
        '③ 클라우드 환경에서 작업을 실행할 수 있다',
        '④ 사용자의 IDE 설정을 다른 컴퓨터로 자동 동기화할 수 있다',
      ],
      answers: ['④'],
      explanation:
        'Claude Desktop의 Code 뷰는 채팅 쪽과 비슷한 사용감을 가지면서도 <b>특정 폴더에서 작업, 권한 조정, 클라우드 환경 실행</b>을 지원한다. IDE 설정의 자동 동기화는 강의에서 다루지 않는다.',
    },
    {
      id: 9,
      type: 'choice',
      category: '웹(Web)',
      question: '웹에서 사용하는 Claude Code에 대한 설명으로 가장 정확한 것은?',
      options: [
        '① 데스크톱과 비슷한 사용감을 제공하지만 작업 대상이 로컬 임의 디렉터리로 제한된다',
        '② 데스크톱과 비슷한 사용감을 제공하지만 작업 대상이 GitHub 저장소로 제한된다',
        '③ 데스크톱과 분리된 별도 사이트로, 채팅 앱 사이드바에서는 진입할 수 없다',
        '④ 데스크톱과 달리 권한 모드를 설정할 수 없어 모든 동작이 사용자 확인 없이 실행된다',
      ],
      answers: ['②'],
      explanation:
        '웹에서는 전용 주소로 접속하거나 채팅 앱 사이드바의 <b>Code 항목</b>을 통해 진입할 수 있다. 사용감은 데스크톱과 비슷하지만 <b>작업 범위가 GitHub 저장소로 제한</b>된다.',
    },
    {
      id: 10,
      type: 'choice',
      category: '환경 선택 가이드',
      question: '강의가 정리한 "어디에서 Claude Code를 쓰는 것이 좋은가" 가이드와 일치하는 것은?',
      options: [
        '① 새 기능을 가장 먼저 받고 싶다면 데스크톱 앱이 가장 적합하다',
        '② 코드 에디터와 자연스럽게 엮어 쓰고 싶다면 IDE 통합이 가장 적합하다',
        '③ 다른 일을 하면서 백그라운드로 돌리고 싶다면 웹이 가장 적합하다',
        '④ GitHub 저장소를 원격으로 다루고 싶다면 터미널이 가장 적합하다',
      ],
      answers: ['②'],
      explanation:
        '강의의 권장은 다음과 같다 — <b>새 기능 우선 도입은 터미널</b>, <b>에디터와의 자연스러운 통합은 IDE 확장</b>, <b>백그라운드 실행은 데스크톱</b>, <b>GitHub 저장소 기반 원격 작업은 웹</b>이다. 따라서 ②만 일치한다.',
    },
  ],
}
