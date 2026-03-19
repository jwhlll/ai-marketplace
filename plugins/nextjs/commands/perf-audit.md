---
description: Next.js 앱의 성능을 분석하고 개선 방안을 제안합니다
---

현재 프로젝트를 분석해서 Vercel/Next.js 성능 최적화 포인트를 찾아줘.

**분석 항목**

1. **Core Web Vitals**
   - LCP (Largest Contentful Paint): 이미지 최적화, 폰트 로딩
   - FID/INP (Interaction): 불필요한 JS 번들, 긴 태스크
   - CLS (Cumulative Layout Shift): 이미지 크기 명시, 폰트 swap

2. **번들 분석**
   ```bash
   ANALYZE=true pnpm build
   ```
   - 큰 패키지 파악 및 대안 제안
   - 불필요한 polyfill
   - 중복 패키지

3. **렌더링 전략**
   - 각 페이지별 최적 렌더링 방식 제안 (SSG/ISR/SSR/CSR)
   - 불필요한 SSR → SSG/ISR 전환 가능 여부

4. **이미지 최적화**
   - `next/image` 미사용 이미지
   - 사이즈 미지정 이미지
   - priority 설정 필요한 LCP 이미지

5. **폰트 최적화**
   - `next/font` 미사용 여부
   - 폰트 서브셋 설정

6. **캐싱 전략**
   - fetch 캐시 설정 검토
   - `revalidate` 값 최적화

7. **Vercel Analytics**
   - `@vercel/analytics` / `@vercel/speed-insights` 설치 여부

발견된 문제마다 구체적인 개선 코드와 예상 성능 향상 효과를 알려줘.
