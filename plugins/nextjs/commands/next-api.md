---
description: Next.js Route Handler를 생성합니다. 사용법: /next-api <경로> [설명]
---

$ARGUMENTS 기반으로 Next.js App Router Route Handler를 생성해줘.

다음 Vercel best practices를 반드시 따라줘:

**구조**
- `app/api/.../route.ts` 형식
- `NextRequest` / `NextResponse` 사용
- HTTP 메서드별 named export: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`

**응답**
- `NextResponse.json()` 으로 JSON 응답
- 적절한 HTTP status code 사용
- 에러 응답도 일관된 형식 유지: `{ error: string, code?: string }`

**인증/보안**
- 요청 유효성 검사 (zod 사용)
- 환경변수로 시크릿 관리 (`process.env.XXX`)
- CORS 필요시 headers 설정

**성능**
- Edge Runtime 가능하면 `export const runtime = 'edge'` 사용
- 응답 캐싱: `export const revalidate = N`
- Streaming 응답은 `ReadableStream` 활용

**에러 처리**
- try/catch 로 감싸기
- 예상 가능한 에러는 구체적인 메시지 반환

TypeScript 타입 포함해서 route.ts 파일을 생성해줘.
