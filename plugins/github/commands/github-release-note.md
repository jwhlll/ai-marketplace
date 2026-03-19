---
description: 두 태그 사이의 변경사항으로 릴리즈 노트를 작성합니다. 사용법: /github-release-note <owner/repo> <from-tag> <to-tag>
---

$ARGUMENTS 에서 레포와 태그 범위를 파악해서 릴리즈 노트를 작성해줘.

```bash
gh api repos/<owner>/<repo>/compare/<from-tag>...<to-tag> --jq '.commits[] | {sha: .sha[:7], message: .commit.message}'
```

커밋 메시지를 분석해서 다음 형식으로 릴리즈 노트를 작성해줘:
## 새 기능
## 버그 수정
## 기타 변경사항
