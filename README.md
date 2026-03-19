# AI Marketplace

Claude Code에서 사용할 수 있는 MCP 플러그인 모음입니다.

## 플러그인 목록

| 플러그인 | 설명 | 필요한 환경변수 |
|---------|------|----------------|
| [jira](./plugins/jira) | Jira 이슈 검색/생성/상태 변경 | `JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN` |
| [figma](./plugins/figma) | Figma 파일/컴포넌트/댓글 조회 | `FIGMA_ACCESS_TOKEN` |
| [github](./plugins/github) | GitHub PR/이슈/코드 검색 | `GITHUB_TOKEN` |

## Claude Code 연동

### 1. 빌드

```bash
pnpm install
pnpm build
```

### 2. MCP 등록

```bash
# Jira
claude mcp add jira node /path/to/ai-marketplace/plugins/jira/dist/index.js \
  -e JIRA_BASE_URL=https://yourcompany.atlassian.net \
  -e JIRA_EMAIL=you@email.com \
  -e JIRA_API_TOKEN=your_token

# Figma
claude mcp add figma node /path/to/ai-marketplace/plugins/figma/dist/index.js \
  -e FIGMA_ACCESS_TOKEN=your_token

# GitHub
claude mcp add github node /path/to/ai-marketplace/plugins/github/dist/index.js \
  -e GITHUB_TOKEN=your_token
```

### 3. Skills 등록

```bash
# 플러그인별 skills를 Claude Code에 복사
cp plugins/jira/skills/* ~/.claude/skills/
cp plugins/figma/skills/* ~/.claude/skills/
cp plugins/github/skills/* ~/.claude/skills/
```

## 새 플러그인 추가

```bash
mkdir -p plugins/새플러그인/src plugins/새플러그인/skills
# package.json, tsconfig.json, src/index.ts 작성
```

`pnpm-workspace.yaml`은 `plugins/*`를 자동으로 인식합니다.
