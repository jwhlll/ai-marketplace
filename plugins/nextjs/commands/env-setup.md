---
description: Next.js 환경변수를 Vercel best practices에 맞게 설정합니다
---

현재 프로젝트의 환경변수 구조를 분석하고 $ARGUMENTS 를 기반으로 Vercel best practices에 맞게 설정해줘.

**환경변수 파일 구조**
```
.env.local          # 로컬 개발 (gitignore)
.env.development    # 개발 환경 공통
.env.production     # 프로덕션 환경 공통
.env.example        # 예시 파일 (git 추적)
```

**네이밍 규칙**
- 서버 전용: 일반 이름 (예: `DATABASE_URL`, `API_SECRET`)
- 클라이언트 노출: `NEXT_PUBLIC_` 접두사 (예: `NEXT_PUBLIC_API_URL`)
- 절대 `NEXT_PUBLIC_` 에 시크릿 넣지 않기

**타입 안정성**
- `env.ts` 파일에서 zod로 환경변수 검증
- 빌드 시 누락된 환경변수 즉시 감지

**Vercel 배포**
- Vercel Dashboard에서 환경별 변수 설정
- `vercel env pull` 로 로컬에 동기화
- Preview 환경 변수 별도 관리

`.env.example`, `lib/env.ts` (zod 검증 포함), 설정 가이드를 작성해줘.
