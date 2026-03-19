---
description: Jira 이슈를 생성합니다. 사용법: /jira-create <프로젝트 키> <제목>
---

$ARGUMENTS 에서 프로젝트 키와 제목을 파악해서 아래 curl로 이슈를 생성해줘.

```bash
curl -s -X POST \
  -u "$JIRA_EMAIL:$JIRA_API_TOKEN" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  "$JIRA_BASE_URL/rest/api/3/issue" \
  --data '{
    "fields": {
      "project": { "key": "<PROJECT_KEY>" },
      "summary": "<TITLE>",
      "issuetype": { "name": "Task" }
    }
  }'
```

생성된 이슈 키와 URL을 알려줘.
