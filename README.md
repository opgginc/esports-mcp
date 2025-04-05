# OP.GG Esports MCP Server

[![smithery badge](https://smithery.ai/badge/@opgginc/esports-mcp)](https://smithery.ai/server/@opgginc/esports-mcp)

It provides functionality to search for upcoming LoL match schedules using the OP.GG Esports GraphQL API.

## Features

- `get-lol-matches`: A tool to fetch upcoming LoL match schedules for the current month

## Building and Testing

```bash
# Build
pnpm build

# Test
pnpm test
```

## MCP Tool Usage Examples

### Listing Tools

```json
{ "type": "list_tools" }
```

### Fetching Upcoming Match Schedule for the Current Month

```json
{ "type": "tool_call", "tool_call": { "name": "get-lol-matches" } }
```

## Technology Stack

- TypeScript
- Node.js
- GraphQL (OP.GG Esports API)
- Model Context Protocol (MCP)
