---
description: 현재 스프린트 진행 상황을 분석합니다
---

아래 curl 명령어로 현재 스프린트 이슈를 가져와서 분석해줘.

```bash
curl -s \
  -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  -H "Accept: application/json" \
  "$JIRA_BASE_URL/rest/api/3/search?jql=sprint%20in%20openSprints()%20ORDER%20BY%20status%20ASC&fields=summary,status,assignee,priority"
```

다음 형식으로 정리해줘:
- 완료 이슈
- 진행 중 이슈
- 시작 안 된 이슈
- 블로커 이슈
