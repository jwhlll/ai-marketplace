---
description: 현재 스프린트 진행 상황을 분석합니다
---

현재 활성 스프린트의 이슈들을 가져와서 다음 형식으로 정리해줘:
- 완료된 이슈
- 진행 중인 이슈
- 시작 안 된 이슈
- 블로커 이슈

JQL: `sprint in openSprints() ORDER BY status ASC`
