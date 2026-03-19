#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const FIGMA_TOKEN = process.env.FIGMA_ACCESS_TOKEN ?? "";

async function figmaFetch(path: string) {
  const res = await fetch(`https://api.figma.com/v1${path}`, {
    headers: { "X-Figma-Token": FIGMA_TOKEN },
  });
  if (!res.ok) throw new Error(`Figma API error: ${res.status} ${await res.text()}`);
  return res.json();
}

const server = new McpServer({
  name: "figma",
  version: "0.1.0",
});

server.tool(
  "figma_get_file",
  "Figma 파일 정보를 가져옵니다",
  {
    fileKey: z.string().describe("Figma 파일 키 (URL에서 확인 가능)"),
  },
  async ({ fileKey }) => {
    const data = await figmaFetch(`/files/${fileKey}`);
    const info = {
      name: data.name,
      lastModified: data.lastModified,
      version: data.version,
      pages: data.document.children.map((p: any) => ({ id: p.id, name: p.name })),
    };
    return { content: [{ type: "text", text: JSON.stringify(info, null, 2) }] };
  }
);

server.tool(
  "figma_get_components",
  "Figma 파일의 컴포넌트 목록을 가져옵니다",
  {
    fileKey: z.string().describe("Figma 파일 키"),
  },
  async ({ fileKey }) => {
    const data = await figmaFetch(`/files/${fileKey}/components`);
    const components = data.meta.components.map((c: any) => ({
      key: c.key,
      name: c.name,
      description: c.description,
      containingFrame: c.containing_frame?.name,
    }));
    return { content: [{ type: "text", text: JSON.stringify(components, null, 2) }] };
  }
);

server.tool(
  "figma_get_comments",
  "Figma 파일의 댓글을 가져옵니다",
  {
    fileKey: z.string().describe("Figma 파일 키"),
  },
  async ({ fileKey }) => {
    const data = await figmaFetch(`/files/${fileKey}/comments`);
    const comments = data.comments.map((c: any) => ({
      id: c.id,
      message: c.message,
      author: c.user.handle,
      createdAt: c.created_at,
      resolved: c.resolved_at !== null,
    }));
    return { content: [{ type: "text", text: JSON.stringify(comments, null, 2) }] };
  }
);

server.tool(
  "figma_export_node",
  "Figma 노드를 이미지로 export합니다",
  {
    fileKey: z.string().describe("Figma 파일 키"),
    nodeId: z.string().describe("노드 ID"),
    format: z.enum(["png", "svg", "pdf", "jpg"]).default("png"),
    scale: z.number().optional().default(1).describe("배율 (1~4)"),
  },
  async ({ fileKey, nodeId, format, scale }) => {
    const data = await figmaFetch(
      `/images/${fileKey}?ids=${encodeURIComponent(nodeId)}&format=${format}&scale=${scale}`
    );
    const url = data.images[nodeId];
    return { content: [{ type: "text", text: `Export URL: ${url}` }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
