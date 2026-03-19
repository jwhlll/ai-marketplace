---
description: React 컴포넌트/훅 테스트 코드를 생성합니다. 사용법: /test-gen <파일 경로>
---

$ARGUMENTS 경로의 파일을 읽고 테스트 코드를 생성해줘.

다음 best practices를 따라줘:

**테스트 도구**
- Vitest + React Testing Library (기본)
- `@testing-library/user-event` 로 실제 사용자 인터랙션 시뮬레이션
- MSW(Mock Service Worker)로 API 모킹

**테스트 구조**
- `describe` 로 컴포넌트/기능 단위 그룹화
- `it` / `test` 는 "should..." 형식으로 작성
- AAA 패턴: Arrange → Act → Assert

**무엇을 테스트할지**
- 렌더링 여부 (스냅샷 아닌 행동 기반)
- 사용자 인터랙션 (클릭, 입력, 폼 제출)
- 조건부 렌더링
- 에러 상태
- 로딩 상태
- 접근성 (getByRole 우선 사용)

**피해야 할 것**
- 구현 세부사항 테스트 금지
- `getByTestId` 최소화 (getByRole, getByText 우선)
- 스냅샷 테스트 남용 금지

**Server Component 테스트**
- `@testing-library/react` 의 `renderToString` 활용
- 비동기 컴포넌트는 `Suspense` 래핑

테스트 파일 전체를 생성해줘.
