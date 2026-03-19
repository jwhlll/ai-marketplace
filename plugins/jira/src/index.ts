#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const JIRA_BASE_URL = process.env.JIRA_BASE_URL ?? "";
const JIRA_EMAIL = process.env.JIRA_EMAIL ?? "";
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN ?? "";

function authHeader() {
  const creds = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64");
  return `Basic ${creds}`;
}

async function jiraFetch(path: string, options?: RequestInit) {
  const res = await fetch(`${JIRA_BASE_URL}/rest/api/3${path}`, {
    ...options,
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options?.headers,
    },
  });
  if (!res.ok) throw new Error(`Jira API error: ${res.status} ${await res.text()}`);
  return res.json();
}

const server = new McpServer({
  name: "jira",
  version: "0.1.0",
});

server.tool(
  "jira_search_issues",
  "JQL로 Jira 이슈를 검색합니다",
  {
    jql: z.string().describe("JQL 쿼리 (예: project = MY AND status = 'In Progress')"),
    maxResults: z.number().optional().default(10).describe("최대 결과 수"),
  },
  async ({ jql, maxResults }) => {
    const data = await jiraFetch(
      `/search?jql=${encodeURIComponent(jql)}&maxResults=${maxResults}&fields=summary,status,assignee,priority`
    );
    const issues = data.issues.map((i: any) => ({
      key: i.key,
      summary: i.fields.summary,
      status: i.fields.status?.name,
      assignee: i.fields.assignee?.displayName ?? "미배정",
      priority: i.fields.priority?.name,
    }));
    return { content: [{ type: "text", text: JSON.stringify(issues, null, 2) }] };
  }
);

server.tool(
  "jira_get_issue",
  "Jira 이슈 상세 정보를 가져옵니다",
  {
    issueKey: z.string().describe("이슈 키 (예: PROJ-123)"),
  },
  async ({ issueKey }) => {
    const data = await jiraFetch(`/issue/${issueKey}`);
    const issue = {
      key: data.key,
      summary: data.fields.summary,
      description: data.fields.description,
      status: data.fields.status?.name,
      assignee: data.fields.assignee?.displayName ?? "미배정",
      reporter: data.fields.reporter?.displayName,
      priority: data.fields.priority?.name,
      labels: data.fields.labels,
    };
    return { content: [{ type: "text", text: JSON.stringify(issue, null, 2) }] };
  }
);

server.tool(
  "jira_create_issue",
  "Jira 이슈를 생성합니다",
  {
    projectKey: z.string().describe("프로젝트 키 (예: PROJ)"),
    summary: z.string().describe("이슈 제목"),
    description: z.string().optional().describe("이슈 설명"),
    issueType: z.enum(["Task", "Bug", "Story", "Epic"]).default("Task"),
  },
  async ({ projectKey, summary, description, issueType }) => {
    const data = await jiraFetch("/issue", {
      method: "POST",
      body: JSON.stringify({
        fields: {
          project: { key: projectKey },
          summary,
          description: description
            ? { type: "doc", version: 1, content: [{ type: "paragraph", content: [{ type: "text", text: description }] }] }
            : undefined,
          issuetype: { name: issueType },
        },
      }),
    });
    return { content: [{ type: "text", text: `이슈 생성 완료: ${data.key}` }] };
  }
);

server.tool(
  "jira_update_issue_status",
  "Jira 이슈 상태를 변경합니다",
  {
    issueKey: z.string().describe("이슈 키"),
    transitionName: z.string().describe("전환할 상태 이름 (예: 'In Progress', 'Done')"),
  },
  async ({ issueKey, transitionName }) => {
    const transitions = await jiraFetch(`/issue/${issueKey}/transitions`);
    const transition = transitions.transitions.find(
      (t: any) => t.name.toLowerCase() === transitionName.toLowerCase()
    );
    if (!transition) {
      const names = transitions.transitions.map((t: any) => t.name).join(", ");
      return { content: [{ type: "text", text: `전환 불가. 가능한 상태: ${names}` }] };
    }
    await jiraFetch(`/issue/${issueKey}/transitions`, {
      method: "POST",
      body: JSON.stringify({ transition: { id: transition.id } }),
    });
    return { content: [{ type: "text", text: `${issueKey} 상태를 '${transitionName}'으로 변경 완료` }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
