---
description: Vercel best practices 기반 React 컴포넌트를 생성합니다. 사용법: /component-gen <컴포넌트명> [설명]
---

$ARGUMENTS 를 기반으로 React 컴포넌트를 생성해줘.

다음 Vercel/Next.js best practices를 반드시 따라줘:

**구조**
- `'use client'` / `'use server'` 명시 (필요한 경우에만 use client)
- Server Component를 기본으로, 인터랙션이 필요할 때만 Client Component
- props는 TypeScript interface로 정의
- 파일명은 PascalCase, 경로는 kebab-case

**성능**
- 이미지는 `next/image` 사용
- 링크는 `next/link` 사용
- 폰트는 `next/font` 사용
- 동적 import는 `next/dynamic` + `{ ssr: false }` (클라이언트 전용일 때)
- 무거운 연산은 `useMemo` / `useCallback` 적용

**스타일**
- Tailwind CSS 클래스 사용
- `cn()` 유틸리티로 조건부 클래스 처리

**접근성**
- 시맨틱 HTML 태그 사용
- aria 속성 추가
- 키보드 네비게이션 고려

코드만 출력하고, 사용 예시도 함께 보여줘.
