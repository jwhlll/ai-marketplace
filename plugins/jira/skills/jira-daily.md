---
description: 오늘 내 Jira 작업 현황을 요약합니다
---

아래 curl 명령어로 오늘 나에게 할당된 Jira 이슈를 가져와서 상태별로 정리해줘.

```bash
curl -s \
  -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  -H "Accept: application/json" \
  "$JIRA_BASE_URL/rest/api/3/search?jql=assignee%3DcurrentUser()%20AND%20updated%3E%3D-1d%20ORDER%20BY%20updated%20DESC&fields=summary,status,priority"
```

결과를 To Do / In Progress / Done 으로 나눠서 정리해줘.
