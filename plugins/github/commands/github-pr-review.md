---
description: PR을 분석하고 리뷰 포인트를 제안합니다. 사용법: /github-pr-review <owner/repo> <pr-number>
---

$ARGUMENTS 에서 owner/repo 와 PR 번호를 파악해서 분석해줘.

```bash
gh pr view <pr-number> --repo <owner/repo> --json title,body,files,additions,deletions,author,baseRefName,headRefName
gh pr diff <pr-number> --repo <owner/repo>
```

변경 사항을 분석해서 다음을 정리해줘:
- 주요 변경 내용 요약
- 리뷰해야 할 포인트
- 잠재적 버그나 개선 사항
