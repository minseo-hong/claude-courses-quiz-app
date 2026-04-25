> **예상 소요 시간 7분**

<!-- youtube: eW3oTyfeWZ0 -->

컨텍스트는 Claude의 **작업 기억(working memory)** 입니다. Claude가 읽는 모든 파일, 실행하는 모든 명령, 여러분이 보내는 모든 메시지 — 그 전부가 컨텍스트 윈도우의 공간을 차지하죠.

## 컨텍스트 윈도우란?

컨텍스트 윈도우는 Claude가 **머릿속에 한 번에 담아 둘 수 있는 공간의 양**이라고 생각하면 됩니다. 여러분이 프롬프트를 입력하든, Claude가 파일을 읽든, 도구 호출을 실행하든, 그 결과를 받든 — 모든 동작이 컨텍스트 윈도우를 채워 갑니다. 공간은 유한하기 때문에, **그 공간을 어떻게 쓰느냐**가 점점 중요해집니다.

![컨텍스트 윈도우를 토큰 격자로 표현한 다이어그램 — 일부는 사용 중, 대부분은 사용 가능](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686395%2Fvideo6contextwindowdiagram.1775686395676.jpg)

## 컨텍스트가 가득 찼을 때

한도에 가까워지면 컨텍스트 윈도우는 자동으로 **압축(compact)** 됩니다. 압축은 중요한 세부사항을 요약하고, 더 이상 필요하지 않은 도구 호출 결과를 제거해 공간을 확보합니다. 다만 이 과정에서 **세부 정보가 손실될 가능성**이 있다는 점에 유의하세요.

![컨텍스트를 요약하면서 "Compacting conversation..." 메시지를 보여 주는 Claude Code](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686393%2Fvideo6compactingcontext.1775686393619.jpg)

![이전 대화의 핵심 기술 개념과 관련 파일을 압축 요약 형태로 보여 주는 Claude Code](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686394%2Fvideo6compactingsummary.1775686394575.jpg)

## 명령어(Commands)

압축은 **`/compact`** 명령으로 직접 실행할 수도 있습니다. 이 명령은 그 시점까지의 모든 대화를 압축합니다. **이전 작업의 기억은 유지하면서 컨텍스트 공간을 비우고 싶을 때** 유용해요.

![Claude Code 자동 완성 메뉴에 표시된 /compact 명령](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686393%2Fvideo6compactcommand.1775686392964.jpg)

이전 세션의 기억 없이 **완전히 처음부터** 다시 시작하고 싶다면 **`/clear`** 를 실행합니다. 이 명령은 모든 것을 비웁니다.

![새 세션을 시작하기 위해 /clear를 실행하는 Claude Code](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686392%2Fvideo6clearcommand.1775686392379.jpg)

현재 컨텍스트 상태가 궁금하다면 **`/context`** 를 실행하세요. 컨텍스트 크기에 대한 개략적인 요약, **가장 많은 공간을 차지하는 카테고리**, 그리고 그 분포를 보여 주는 시각 그래픽까지 함께 받을 수 있습니다.

![/context 명령의 출력 — 막대 차트로 컨텍스트 사용 분포를 보여 주는 화면](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686364%2FVideo_2_01_01_11_11.1775686364258.jpg)

## 어느 쪽을 언제 써야 할까?

대략적인 기준은 다음과 같습니다.

- **`/compact` 를 쓰는 시점:** 특정 기능 작업 중인데 컨텍스트 한도에 부딪혔지만 그 작업은 계속 이어 가야 할 때. 현재 기능과 관련된 컨텍스트는 유지해야 합니다.
- **`/clear` 를 쓰는 시점:** 새로운 기능 작업을 시작할 때. 이전 대화가 새 작업에 **편향**을 주입하는 걸 막고 싶기 때문이죠. 세션을 넘어서 Claude가 기억해야 할 것이 있다면 **`CLAUDE.md`** 파일에 적어 두세요 — 매번 처음부터 다시 알아내야 하는 수고를 줄여 줍니다.

![명령어, 중요한 메모, 아키텍처 섹션이 정리되어 있는 CLAUDE.md 파일](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686391%2Fvideo6claudemdfile.1775686391669.jpg)

## 컨텍스트를 아끼는 팁

**구체적으로 적으세요.** 모호한 프롬프트는 짧아 보일 수 있지만, **장기적으로는 더 많은 컨텍스트를 잡아먹습니다**. 명확한 지시가 없으면 Claude는 코드베이스를 더 많이 탐색하고 더 많은 추론을 해야 하는데, 그게 디테일을 미리 적어 두는 것보다 훨씬 더 많은 공간을 씁니다.

**MCP 서버를 관리하세요.** MCP 서버는 기본적으로 **사용 중이 아니더라도 자신이 제공하는 모든 도구를 컨텍스트에 로드**합니다. 현재 프로젝트와 무관한 서버가 켜져 있다면 꺼 두는 걸 고려해 보세요. 비슷한 역할을 하면서도 모든 것을 미리 컨텍스트에 올리지 않는 **Skills**를 대신 써 보는 것도 좋은 선택입니다.

**서브에이전트를 활용하세요.** 서브에이전트는 메인 에이전트와 병렬로 동작하지만 **완전히 별도의 컨텍스트 윈도우**를 갖습니다. "인증 엔드포인트는 어디에 있나요?"처럼 *답만 필요한* 작업이라면, 서브에이전트가 작업을 처리한 뒤 메인 에이전트에는 **요약만** 돌려주므로 메인 컨텍스트가 깔끔하게 유지됩니다.

## 정리

Claude Code에서 컨텍스트 관리는 매우 중요합니다. **`/compact`** 로 긴 세션을 요약하고, **`/clear`** 로 새 작업을 깨끗이 시작하세요. 컨텍스트 윈도우를 효과적으로 쓰려면 — **프롬프트는 구체적으로**, **`/context`** 로 현재 무엇이 공간을 차지하고 있는지 점검하고, **답만 필요한 작업은 서브에이전트에 위임**하면 됩니다.
