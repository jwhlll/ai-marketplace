---
description: 컴포넌트의 Storybook story를 생성합니다. 사용법: /storybook-gen <파일 경로>
---

$ARGUMENTS 경로의 컴포넌트를 읽고 Storybook story를 생성해줘.

다음 best practices를 따라줘:

**구조 (CSF3 형식)**
- `*.stories.tsx` 파일로 작성
- `Meta` / `StoryObj` 타입 사용
- `title` 은 `Category/ComponentName` 형식

**스토리 구성**
- `Default` - 기본 상태
- 각 주요 props 변형마다 별도 스토리
- 에러/로딩/빈 상태 스토리
- 모바일/데스크탑 뷰포트 스토리

**인터랙션**
- `play` 함수로 인터랙션 시나리오 작성
- `@storybook/test` 의 `userEvent`, `expect` 활용

**문서화**
- `argTypes` 로 props 설명 추가
- `parameters.docs.description` 으로 컴포넌트 설명

**Next.js 호환**
- `next/image`, `next/link` 모킹 설정 포함
- 필요시 `RouterContext` 데코레이터 추가

stories 파일 전체를 생성해줘.
