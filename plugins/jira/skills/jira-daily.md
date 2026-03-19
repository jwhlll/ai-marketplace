---
description: 오늘 내 Jira 작업 현황을 요약합니다
---

오늘 나에게 할당된 Jira 이슈 목록을 가져와서 상태별로 정리해줘.
JQL: `assignee = currentUser() AND updated >= -1d ORDER BY updated DESC`
