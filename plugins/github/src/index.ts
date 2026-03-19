#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";

async function ghFetch(path: string, options?: RequestInit) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${await res.text()}`);
  return res.json();
}

const server = new McpServer({
  name: "github",
  version: "0.1.0",
});

server.tool(
  "github_list_prs",
  "GitHub PR 목록을 가져옵니다",
  {
    owner: z.string().describe("레포 소유자"),
    repo: z.string().describe("레포 이름"),
    state: z.enum(["open", "closed", "all"]).default("open"),
  },
  async ({ owner, repo, state }) => {
    const prs = await ghFetch(`/repos/${owner}/${repo}/pulls?state=${state}&per_page=20`);
    const result = prs.map((pr: any) => ({
      number: pr.number,
      title: pr.title,
      state: pr.state,
      author: pr.user.login,
      branch: pr.head.ref,
      createdAt: pr.created_at,
      url: pr.html_url,
    }));
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "github_get_pr",
  "GitHub PR 상세 정보를 가져옵니다",
  {
    owner: z.string(),
    repo: z.string(),
    prNumber: z.number().describe("PR 번호"),
  },
  async ({ owner, repo, prNumber }) => {
    const [pr, files] = await Promise.all([
      ghFetch(`/repos/${owner}/${repo}/pulls/${prNumber}`),
      ghFetch(`/repos/${owner}/${repo}/pulls/${prNumber}/files`),
    ]);
    const result = {
      number: pr.number,
      title: pr.title,
      body: pr.body,
      state: pr.state,
      author: pr.user.login,
      branch: pr.head.ref,
      changedFiles: files.map((f: any) => ({
        filename: f.filename,
        status: f.status,
        additions: f.additions,
        deletions: f.deletions,
      })),
    };
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  }
);

server.tool(
  "github_create_issue",
  "GitHub 이슈를 생성합니다",
  {
    owner: z.string(),
    repo: z.string(),
    title: z.string().describe("이슈 제목"),
    body: z.string().optional().describe("이슈 내용"),
    labels: z.array(z.string()).optional().describe("라벨 목록"),
  },
  async ({ owner, repo, title, body, labels }) => {
    const issue = await ghFetch(`/repos/${owner}/${repo}/issues`, {
      method: "POST",
      body: JSON.stringify({ title, body, labels }),
    });
    return { content: [{ type: "text", text: `이슈 생성 완료: ${issue.html_url}` }] };
  }
);

server.tool(
  "github_search_code",
  "GitHub 코드를 검색합니다",
  {
    query: z.string().describe("검색 쿼리 (예: 'useState repo:owner/repo')"),
  },
  async ({ query }) => {
    const data = await ghFetch(`/search/code?q=${encodeURIComponent(query)}&per_page=10`);
    const results = data.items.map((item: any) => ({
      path: item.path,
      repo: item.repository.full_name,
      url: item.html_url,
    }));
    return { content: [{ type: "text", text: JSON.stringify(results, null, 2) }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
