---
description: Figma 파일의 미해결 댓글을 리뷰합니다. 사용법: /figma-review <file-key>
---

$ARGUMENTS 의 Figma 파일 키로 미해결 댓글을 가져와서 정리해줘.

```bash
curl -s \
  -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/$ARGUMENTS/comments"
```

resolved_at 이 null 인 댓글만 추려서 작성자/내용/시간 순으로 정리하고,
우선 처리해야 할 댓글을 추천해줘.
