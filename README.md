# OP.GG Esports MCP Server
[![smithery badge](https://smithery.ai/badge/@opgginc/opgg-mcp-esports)](https://smithery.ai/server/@opgginc/opgg-mcp-esports)

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

## Installation

### Installing via Smithery

To install opgg-mcp-esports for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@opgginc/opgg-mcp-esports):

```bash
npx -y @smithery/cli install @opgginc/opgg-mcp-esports --client claude
```
