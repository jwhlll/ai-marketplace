---
description: Next.js Server Action을 생성합니다. 사용법: /server-action <기능 설명>
---

$ARGUMENTS 기반으로 Next.js Server Action을 생성해줘.

다음 Vercel best practices를 반드시 따라줘:

**기본 구조**
- 파일 상단 또는 함수 내 `'use server'` 선언
- `actions/` 디렉토리에 기능별로 분리
- async 함수로 작성

**유효성 검사**
- zod로 입력값 검증
- `{ success: boolean, data?, error? }` 형태로 반환

**보안**
- 인증 확인 (세션/토큰 검사) 먼저 수행
- 민감한 데이터 노출 방지
- CSRF는 Next.js가 자동 처리

**캐시 무효화**
- 데이터 변경 후 `revalidatePath()` / `revalidateTag()` 호출
- 필요시 `redirect()` 사용

**에러 처리**
- try/catch 사용
- 사용자에게 의미 있는 에러 메시지 반환

**클라이언트 연동**
- `useFormState` / `useFormStatus` 훅 활용 예시도 포함
- optimistic update 패턴도 제안

actions 파일과 사용하는 폼 컴포넌트까지 같이 생성해줘.
