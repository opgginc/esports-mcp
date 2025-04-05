# OP.GG Esports MCP Server

[![smithery badge](https://smithery.ai/badge/@opgginc/esports-mcp)](https://smithery.ai/server/@opgginc/esports-mcp)

The OP.GG Esports MCP Server is a Model Context Protocol implementation that seamlessly connects OP.GG Esports data with AI agents and platforms. This server enables AI agents to retrieve upcoming League of Legends match schedules and information via function calling.

## Overview

This MCP server provides AI agents with access to OP.GG Esports data through a standardized interface. Built on TypeScript and Node.js, it connects directly to the OP.GG Esports GraphQL API and formats the data in a way that's easily consumable by AI models and agent frameworks.

## Features

The OP.GG Esports MCP Server currently supports the following tools:

- **get-lol-matches**: Fetch and format upcoming League of Legends match schedules from OP.GG Esports
  - Returns match name, league, status, score, scheduled time, and a direct link to the match
  - Formats the data in a clean, structured format for AI consumption

## Installation

### Installing via Smithery

To install OP.GG Esports MCP for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@opgginc/esports-mcp):

```bash
npx -y @smithery/cli install @opgginc/esports-mcp --client claude
```

### Using npm/pnpm

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build
```

### Running the server

#### Using pnpm

```bash
# Start the MCP server on stdio
pnpm start
```

#### Using Node.js directly

```bash
# Start using Node.js
node dist/index.js
```

#### Using npx

```bash
# Run directly with npx
npx -y @opgg/esports-mcp
```

### Adding to MCP configuration

To add this server to your MCP configuration (e.g., Windsurf's mcp_config.json), add the following entry:

```json
{
  "mcpServers": {
    "opgg-esports": {
      "command": "node",
      "args": ["/path/to/esports-mcp/dist/index.js"]
    }
  }
}
```

Alternatively, you can use the npm package if published:

```json
{
  "mcpServers": {
    "opgg-esports": {
      "command": "npx",
      "args": ["-y", "@opgg/esports-mcp"]
    }
  }
}
```

## Usage

The OP.GG Esports MCP Server can be used with any MCP-compatible client. Here are some examples:

### Listing available tools

```json
{ "type": "list_tools" }
```

Response:
```json
{
  "tools": [
    {
      "name": "get-lol-matches",
      "description": "Get upcoming LoL match schedules from OP.GG Esports"
    }
  ]
}
```

### Fetching upcoming match schedules

```json
{
  "type": "tool_call",
  "tool_call": {
    "name": "get-lol-matches"
  }
}
```

Response:
```json
{
  "content": [
    {
      "type": "text",
      "text": "Upcoming match schedules:\n\nMatch: Team A vs Team B\nLeague: LCK\nStatus: SCHEDULED\nScore: 0 - 0\nScheduled at: 4/6/2025, 7:00:00 PM\nDetails: https://esports.op.gg/matches/12345\n---\n..."
    }
  ]
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Related Links

- [Model Context Protocol](https://modelcontextprotocol.com)
- [OP.GG Esports](https://esports.op.gg)
