> **예상 소요 시간 7분**

<!-- youtube: xJQuF02NAK8 -->

이 강의에서 단 하나만 챙겨가야 한다면, 바로 이 워크플로우입니다 — **Explore(탐색) → Plan(계획) → Code(구현) → Commit(커밋)**. 이 흐름 없이 대부분은 Claude에게 곧바로 코드를 짜 달라고 요청하는데, 그러면 뒤에서 방향을 다시 잡아야 하는 일이 더 많아집니다.

## Explore와 Plan

처음 두 단계(Explore · Plan)를 가장 빠르게 처리하는 방법은 **Plan Mode**를 쓰는 것입니다. Plan Mode에서는 Claude가 **파일을 편집하지 않고**, 구현을 어떻게 풀어 갈지 정보를 모으기 위해 **파일을 읽기만** 합니다.

Plan Mode에 진입하려면 텍스트 입력란 아래에 "Plan Mode"가 보일 때까지 `Shift + Tab`을 누릅니다. 그런 다음 이런 프롬프트를 입력해 보세요.

![Plan mode가 켜진 Claude Code 상태 표시줄 — Shift+Tab으로 모드를 순환할 수 있음](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686390%2Fvideo5planmodeshifttab.1775686390450.jpg)

```
I need to add WebP conversion to our image upload pipeline. Figure out where in the pipeline it should happen, whether we need new dependencies, and how to approach it.
```

Claude는 관련 파일을 읽고, 필요한 경우 웹 검색을 수행한 뒤 행동 계획을 돌려줍니다. 계획을 검토하고 여러분의 기준에 맞는지 판단하세요. 부족하다면 **특정 영역만 다시 짜 달라고** 요청할 수 있습니다.

![계획을 제시하면서 승인 / 영역 수정 / 질문 옵션을 함께 보여 주는 Claude Code 화면](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686389%2Fvideo5planmodereviseareas.1775686389692.jpg)

이 단계가 **방향을 다시 잡기 가장 좋은 지점**입니다 — 아직 어떤 코드도 작성되기 전이니까요. 만약 코드를 바꿀 의도 없이 그냥 코드베이스 전반에 대한 요약만 받고 싶다면, Plan Mode 없이도 **Explore 서브에이전트**만 따로 돌릴 수도 있습니다.

## Code

계획이 만족스러워 보이면 "approve"를 선택해 수락하고, Claude가 항목들을 차례대로 처리하도록 둡니다. 이때 파일 편집을 자동으로 수락하게 할지, 매번 묻게 할지는 여러분이 고를 수 있어요.

Claude는 계획을 "완료"라고 부르기 전 가능한 선까지 스스로 문제를 해결하려 시도하지만, 때로는 여러분이 들어가서 손을 봐야 할 때가 있습니다. 이게 바로 **Plan Mode와 함께 일하는 이점**이에요 — 실행이 끝난 뒤에도 *어떻게 그 결과에 도달했는지의 맥락*이 남아 있기 때문에, Claude의 다음 결정을 안내하기가 한결 수월합니다.

코딩 단계를 좀 더 매끄럽게 만들어 줄 팁 몇 가지입니다.

- **성공 기준을 정의하세요.** Claude가 결과에 대해 확신을 가지려면, "올바른" 모습이 무엇인지 명확해야 합니다. 계획을 작성할 때 이걸 명시적으로 적어 두세요.
- **도구를 추가하세요.** 목표 달성을 도와주는 도구가 있으면 왔다 갔다 하는 일이 크게 줄어듭니다. 예를 들어 웹 UI를 만들고 있다면 **Claude in Chrome** 확장을 설치해, Claude Code가 브라우저 탭을 직접 제어하면서 UI를 테스트하게 할 수 있어요.

![Chrome 웹 스토어의 Claude in Chrome 확장 페이지](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686387%2Fvideo5claudeinchromeextension.1775686387012.jpg)

- **테스트 스위트를 함께 두세요.** Claude가 지속적으로 검증할 수 있는 테스트 스위트를 함께 제공하세요. 필요하면 Claude가 직접 테스트를 작성해 줄 수도 있습니다. 다만 작업을 넘기기 전에, **그 테스트가 신뢰할 수 있는 진실의 기준이 되는지**를 먼저 확인해 주세요 — 그래야 거짓 양성(false positive)에 끌려가지 않습니다.

> **빠른 팁:** Claude가 같은 문제에 자꾸 부딪히는 것 같다면, 그 해결책을 **CLAUDE.md** 파일에 저장해 두라고 요청해 보세요.

## Commit

여러분이 직접 변경 사항을 테스트해 보고 결과가 마음에 든다면, 이제 코드를 푸시할 차례입니다. 다만 커밋하기 전에 **서브에이전트 코드 리뷰어**를 돌려 작업을 점검하게 하세요. 서브에이전트는 코드베이스를 **새로운 시각**으로 보기 때문에, 메인 에이전트가 한 세션 동안 누적해 온 편향에 휘둘리지 않습니다.

![Claude Code에서 동작 중인 code-reviewer 서브에이전트 — 파일을 읽으며 최근 변경 사항을 검토 중](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686388%2Fvideo5claudesubagentcodereviewer.1775686387773.jpg)

그런 다음 Claude에게 **여러분의 스타일에 맞춘 커밋 메시지**를 생성해 달라고 요청하세요. 이 사이클을 반복하면 됩니다.

## 정리

Claude Code를 효과적으로 쓰려면 **Explore → Plan → Code → Commit** 워크플로우를 따르세요.

- **Explore**는 Claude에게 프로젝트에 필요한 맥락을 모아 줍니다.
- **Plan**은 Claude가 성공 여부를 측정하는 기준이 되는 행동 계획을 만들어 줍니다.
- **Code**는 최종 결과에 도달할 때까지 여러분과 Claude가 주고받는 단계입니다.
- **Commit**은 코드를 점검하고 푸시해, 다음 기능 작업으로 넘어갈 수 있게 해 줍니다.
