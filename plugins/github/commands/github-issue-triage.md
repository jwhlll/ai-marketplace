---
description: GitHub 이슈들을 분류하고 우선순위를 정합니다. 사용법: /github-issue-triage <owner/repo>
---

$ARGUMENTS (owner/repo) 의 open 이슈들을 가져와서 분류해줘.

```bash
gh issue list --repo $ARGUMENTS --state open --limit 50 --json number,title,labels,createdAt,author,body
```

이슈를 아래 기준으로 분류하고 우선순위를 제안해줘:
- 버그 (즉시 처리 필요)
- 기능 요청
- 질문/문의
- 기타
