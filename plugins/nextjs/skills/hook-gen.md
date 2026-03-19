---
description: React 커스텀 훅을 생성합니다. 사용법: /hook-gen <훅 이름 또는 기능 설명>
---

$ARGUMENTS 기반으로 React 커스텀 훅을 생성해줘.

다음 best practices를 반드시 따라줘:

**구조**
- `hooks/use-*.ts` 파일로 분리
- 반환값은 명확한 TypeScript 타입 정의
- 단일 책임 원칙: 훅 하나가 하나의 역할만

**성능**
- `useCallback` 으로 함수 메모이제이션
- `useMemo` 로 비싼 연산 캐싱
- 의존성 배열 정확히 명시
- 불필요한 리렌더 방지

**데이터 페칭 훅**
- loading / error / data 상태 관리
- cleanup 함수로 메모리 누수 방지 (AbortController)
- SWR 또는 TanStack Query 패턴 선호

**이벤트/사이드이펙트**
- useEffect cleanup 반드시 포함
- 외부 이벤트 리스너는 반드시 제거

**테스트 가능성**
- 순수한 로직은 훅 외부로 분리
- 훅 단독으로 테스트 가능한 구조

훅 코드와 사용 예시를 함께 작성해줘.
