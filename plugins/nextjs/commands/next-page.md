---
description: Next.js App Router 페이지를 생성합니다. 사용법: /next-page <경로> [설명]
---

$ARGUMENTS 기반으로 Next.js App Router 페이지를 생성해줘.

다음 Vercel best practices를 반드시 따라줘:

**App Router 구조**
- `page.tsx` - 페이지 컴포넌트
- `layout.tsx` - 필요시 레이아웃
- `loading.tsx` - Suspense 기반 로딩 UI
- `error.tsx` - 에러 바운더리 (`'use client'` 필수)
- `not-found.tsx` - 404 처리

**Data Fetching**
- Server Component에서 직접 `async/await` fetch
- fetch 옵션: `{ cache: 'force-cache' }` / `{ next: { revalidate: N } }` / `{ cache: 'no-store' }`
- 병렬 fetch는 `Promise.all()` 사용
- DB 직접 접근 시 Server Component 또는 Server Action 사용

**Metadata**
- `export const metadata: Metadata = { title, description, openGraph }` 추가
- 동적 메타데이터는 `generateMetadata()` 함수 사용

**SEO & 성능**
- `generateStaticParams()` 로 정적 경로 사전 생성
- Streaming은 `<Suspense>` 로 감싸기
- 중요 데이터는 서버에서, 사용자 인터랙션은 클라이언트에서

page.tsx, layout.tsx, loading.tsx, error.tsx 모두 생성해줘.
