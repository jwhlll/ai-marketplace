---
description: 컴포넌트를 Vercel best practices에 맞게 리팩토링합니다
---

현재 파일 또는 $ARGUMENTS 경로의 컴포넌트를 리팩토링해줘.

다음 우선순위로 개선해줘:

1. **Server Component 전환 가능 여부 확인**
   - `useState`, `useEffect`, 이벤트 핸들러 없으면 Server Component로 전환
   - 필요한 부분만 Client Component로 분리 (leaf component 패턴)

2. **데이터 페칭 최적화**
   - prop drilling으로 내려오는 데이터 → 해당 컴포넌트에서 직접 fetch
   - 순차 fetch → `Promise.all()` 병렬 처리
   - 적절한 캐시 전략 적용

3. **번들 크기 최적화**
   - 큰 라이브러리 dynamic import 처리
   - 사용하지 않는 import 제거
   - tree-shaking 가능한 import 형식으로 변경

4. **렌더링 최적화**
   - 불필요한 리렌더 제거
   - 리스트에 적절한 key 사용
   - 무거운 컴포넌트 `React.memo` 적용

5. **코드 정리**
   - 컴포넌트가 200줄 초과면 분리 제안
   - 중복 로직 커스텀 훅으로 추출
   - 하드코딩 값 상수로 추출

Before/After 코드를 모두 보여주고 변경 이유를 설명해줘.
