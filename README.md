# AI Marketplace

Claude Code에서 사용할 수 있는 Skills 모음입니다. MCP 서버 없이 바로 사용 가능합니다.

## 플러그인 목록

### Jira
| Skill | 설명 |
|-------|------|
| `jira-daily` | 오늘 내 작업 현황 요약 |
| `jira-sprint` | 현재 스프린트 진행 상황 분석 |
| `jira-create` | 이슈 생성 |

필요한 환경변수: `JIRA_BASE_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN`

### Figma
| Skill | 설명 |
|-------|------|
| `figma-review` | 미해결 댓글 리뷰 |
| `figma-components` | 컴포넌트 목록 분석 |

필요한 환경변수: `FIGMA_ACCESS_TOKEN`

### GitHub
| Skill | 설명 |
|-------|------|
| `github-pr-review` | PR 분석 및 리뷰 포인트 제안 |
| `github-issue-triage` | 이슈 분류 및 우선순위 |
| `github-release-note` | 릴리즈 노트 자동 작성 |

필요한 것: `gh` CLI 설치 및 로그인

## 설치

```bash
# 원하는 플러그인의 skills를 Claude Code에 복사
cp plugins/github/skills/* ~/.claude/skills/
cp plugins/jira/skills/* ~/.claude/skills/
cp plugins/figma/skills/* ~/.claude/skills/
```

## 사용법

Claude Code에서 `/` 로 skill 호출:

```
/github-pr-review owner/repo 42
/jira-daily
/figma-review abc123filekey
```

## 새 플러그인 추가

```
plugins/
└── 새플러그인/
    └── skills/
        └── *.md
```
