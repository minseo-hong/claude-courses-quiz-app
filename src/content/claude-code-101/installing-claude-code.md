> **예상 소요 시간 5분**

<!-- youtube: 0kILa02vKuI -->

Claude Code는 어디에서 쓰든 — 터미널이든, 웹이든, IDE든 — 설치 과정이 단순합니다.

## 터미널(Terminal)

**macOS · Linux · WSL** 환경에서는 `curl` 명령 한 줄로 설치할 수 있습니다. Homebrew를 선호한다면 `brew install`도 가능하지만, 이 방식은 **자동 업데이트가 지원되지 않는다**는 점에 유의하세요.

**Windows**에는 여러 선택지가 있습니다. PowerShell에서는 `Invoke-RestMethod` 명령을, CMD에서는 `curl` 명령을 사용합니다. `winget` 명령도 있지만, Homebrew와 마찬가지로 자동 업데이트가 되지 않습니다.

![curl로 Claude Code가 정상적으로 설치된 모습의 터미널 화면](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686381%2Fvideo3terminalinstall.1775686380887.jpg)

설치가 끝나면 `claude` 명령을 실행할 수 있어야 합니다. 만약 인식되지 않으면 터미널을 재시작해 보세요. 그런 다음 작업할 프로젝트 디렉터리로 이동해 다음을 실행합니다.

```bash
claude
```

처음 실행하면 색상 테마를 고르고, **Claude 계정(Pro · Max · Enterprise)** 으로 로그인하거나 **API 키**를 사용하는 등 초기 설정 단계를 거칩니다. 조직에서 Claude Enterprise 계정을 사용한다면 그 옵션을 선택해야 해요.

![Claude Code 로그인 방식 선택 화면 — 구독 / API / 서드파티 플랫폼 옵션](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686379%2Fvideo3claudeinitaccounts.1775686379767.jpg)

`claude`를 실행한 디렉터리가 어떤 곳이든, **그 디렉터리와 그 아래 모든 하위 폴더**가 Claude Code의 작업 범위가 됩니다.

## Visual Studio Code

Extensions 패널을 열고 "Claude Code"를 검색합니다. **Anthropic이 게시한, 파란색 인증 체크가 붙은 확장**을 찾아 설치하세요.

설치 후에는 VS Code를 재시작해야 할 수도 있습니다. 다시 켠 뒤 명령 팔레트(`Ctrl/Cmd + Shift + P`)를 열고 "Claude Code Open in New Tab"을 검색하면 됩니다. 사이드바에 Claude 로고가 보이면 그 아이콘을 눌러도 됩니다.

![VS Code 마켓플레이스의 Claude Code 확장 페이지](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686378%2Fvideo3claudecodevscode.1775686378631.jpg)

VS Code 확장은 터미널 경험과 거의 동일한 사용감을 제공합니다. UI를 거치지 않고 설정에서 **터미널 경험을 그대로 사용**하도록 옵트아웃할 수도 있습니다.

## JetBrains

JetBrains 마켓플레이스에서 **Claude Code 플러그인**을 설치한 뒤 IDE를 재시작합니다. 다시 열면 Claude 로고가 보일 거예요. 그 아이콘을 클릭하면 에디터와 나란히 동작하는 터미널 경험이 패널 형태로 열립니다.

![JetBrains 마켓플레이스의 Claude Code 플러그인](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686367%2Fclaudecodejetbrainsvideo3.1775686367876.jpg)

## 데스크톱(Desktop)

Claude Desktop을 설치하고 로그인하면 상단에 **"Code" 토글**이 보입니다. 채팅 쪽과 비슷한 느낌이지만, 특정 폴더에서 작업하거나 권한을 조정하거나, 심지어 **클라우드 환경**에서 작업을 돌릴 수도 있습니다.

![최근 프로젝트 폴더가 보이는 Claude Desktop의 Code 뷰](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686367%2Fclaudecodedesktopvideo3github.1775686366970.jpg)

## 웹(Web)

웹에서는 `claude.ai/code` 로 접속하거나, 채팅 앱 사이드바의 **"Code" 항목**을 클릭해 Claude Code에 들어갈 수 있습니다. 데스크톱과 비슷하게 동작하지만, **GitHub 저장소로 작업 범위가 제한**됩니다.

![claude.ai/code 의 Claude Code — 저장소 선택 화면](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686365%2Fclaudeaislashcodevideo3.1775686365598.jpg)

## 그래서 어디에서 써야 하나요?

가장 최신 기능을 빠르게 받고 싶다면 **터미널**이 1순위입니다 — 새 기능은 터미널에 가장 먼저 들어옵니다. **IDE 통합**(VS Code · JetBrains)은 거의 동일한 경험을 제공하면서도, Claude Code를 코드 에디터와 더 자연스럽게 엮어 쓰고 싶을 때 적합해요.

**데스크톱**은 다른 작업을 하는 동안 Claude를 백그라운드에서 돌려두고 싶을 때 좋은 선택입니다.

**웹의 Claude Code**는 GitHub 저장소를 통해 원격으로 프로젝트를 다루고 싶을 때 단단한 옵션입니다.

어디에서 쓸지는 결국 여러분에게 달렸어요.
