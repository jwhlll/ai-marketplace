---
description: Figma 파일의 컴포넌트 목록을 분석합니다. 사용법: /figma-components <file-key>
---

$ARGUMENTS 의 Figma 파일 컴포넌트 목록을 가져와서 정리해줘.

```bash
curl -s \
  -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/$ARGUMENTS/components"
```

컴포넌트를 카테고리별로 분류하고, 설명이 없는 컴포넌트도 알려줘.
