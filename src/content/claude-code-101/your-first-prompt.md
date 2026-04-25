> **예상 소요 시간 5분**

<!-- youtube: gbetp6D7J_Q -->

Claude Code와 대화하는 방식은 다른 AI 어시스턴트와 크게 다르지 않습니다. 다만 프롬프트를 입력할 때 몇 가지를 의식하고 쓰면, **자기 자신을 보호하면서 작업도 한결 수월**해져요.

## 자동 수락(Auto-Accept) vs. 승인(Approval)

파일 변경을 Claude가 자동으로 적용하게 둘지, 매번 명시적인 허가를 받게 할지 — 이 둘 사이를 골라 쓸 수 있습니다. **`Shift + Tab`** 으로 모드를 순환할 수 있어요.

- **승인(Approval) 모드:** 파일을 편집하거나 명령을 실행할 때마다 Claude가 허가를 요청합니다.
- **자동 수락(Auto-accept) 모드:** 파일 편집은 자동으로 적용되지만, **명령 실행은 여전히 사용자 승인을 요구**합니다.

어느 쪽이 정답이라는 건 없습니다 — 본인이 편한 방식으로 쓰면 됩니다.

![자동 수락 모드에서 파일을 읽고 작업을 진행하는 Claude Code 화면](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686381%2Fvideo4autoaccept.1775686381332.jpg)

## 계획 모드(Plan Mode)

`Shift + Tab` 메뉴 안에는 **Plan Mode**도 함께 있습니다. 계획 모드에서는 여러분의 프롬프트를 받아 **읽기 전용 도구**로 코드베이스를 분석하고, 제안된 구현 방향을 조사합니다. 진행 도중 필요한 부분에 대해 명확히 묻는 질문을 던지고, 마지막에는 그대로 실행할 수 있는 **상세한 계획**을 돌려줍니다.

계획 모드는 **복잡한 변경을 사전에 설계**하거나 **안전하게 코드 리뷰**를 진행하는 데 아주 유용해요. 어떤 기능을 향한 다단계 구현 작업을 Claude에게 맡기게 되는 경우가 많은데, 바로 그런 상황에서 Plan Mode가 빛납니다.

![상태 표시줄에 plan mode 표시가 켜진 Claude Code](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686384%2Fvideo4planmode.1775686383837.jpg)

## 예시: 다크 모드 토글 추가하기

예시를 하나 짚어 봅시다. 다크 모드 토글이 필요한 애플리케이션이 있다고 해 볼게요. 프로젝트의 루트 디렉터리에서 `claude`를 실행한 뒤, `Shift + Tab`을 몇 번 눌러 **Plan Mode로 진입**하고 다음과 같은 프롬프트를 입력합니다.

```
My app needs a dark mode implemented across the entire app. Can you create a toggle switch on the header that allows a user to toggle between light mode and dark mode? I need you to find a good contrast color that works based on my existing light theme.
```

![Plan mode가 켜진 상태에서 다크 모드 프롬프트를 입력하는 Claude Code](https://everpath-course-content.s3-accelerate.amazonaws.com/instructor%2F8lsy243ftffjjy1cx9lm3o2bw%2Fpublic%2F1775686383%2Fvideo4demoenteringpromptinplanmode.1775686382790.jpg)

Claude가 계획을 세우도록 잠시 두세요. 돌아온 계획을 검토하고 괜찮아 보이면 수락하고, 그 뒤에는 단계별로 Claude가 여러분의 승인을 요청하도록 둡니다. 마지막에는 **Claude가 정확히 어떤 작업을 했고, 어떤 근거로 결론에 도달했는지**까지 그대로 확인할 수 있어요.

## 정리

Claude Code를 사용할 때는 **프롬프트를 가능한 한 구체적으로** 작성해 보세요. 모든 단계에서 흐름에 함께 머무르고 싶다면 그렇게 할 수 있고, 본격적인 코드 변경 전에 Claude가 여러분이 원하는 바를 충분히 파고들게 하고 싶다면 **Plan Mode**를 활용하면 됩니다.
