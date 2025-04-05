import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import fetch from 'node-fetch';

const GRAPHQL_ENDPOINT = 'https://esports.op.gg/matches/graphql';

const UPCOMING_MATCHES_QUERY = `
  query MCPListUpcomingMatches {
    upcomingMatches {
      name
      status
      awayScore
      homeScore
      scheduledAt
      numberOfGames
      tournament {
        serie {
          league {
            shortName
          }
        }
      }
    }
  }
`;

async function fetchUpcomingMatches() {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'MCP',
      },
      body: JSON.stringify({
        query: UPCOMING_MATCHES_QUERY,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as any;

    if (data.errors) {
      throw new Error(`GraphQL error: ${JSON.stringify(data.errors)}`);
    }

    return data.data.upcomingMatches;
  } catch (error) {
    console.error('Error calling OP.GG Esports API:', error);
    throw error;
  }
}

interface MatchInfo {
  name: string;
  status: string;
  homeScore: number;
  awayScore: number;
  scheduledAt: string | number | Date;
  league: string;
  numberOfGames?: number;
}

const server = new McpServer({
  name: 'opgg-mcp-esports',
  version: '1.0.0',
});

server.tool('get-lol-matches', 'Get upcoming LoL match schedules from OP.GG Esports', async () => {
  try {
    // Fetch match schedules
    const matches = await fetchUpcomingMatches();

    // Format results
    const formattedMatches = matches.map((match: any): MatchInfo => {
      const league = match.tournament?.serie?.league || {};
      return {
        name: match.name,
        status: match.status?.toUpperCase(),
        awayScore: match.awayScore,
        homeScore: match.homeScore,
        scheduledAt: match.scheduledAt,
        numberOfGames: match.numberOfGames,
        league: league.shortName || 'Unknown',
      };
    });

    return {
      content: [
        {
          type: 'text',
          text: `Upcoming match schedules:\n\n${formattedMatches
            .map(
              (match: MatchInfo) =>
                `Match: ${match.name}\nLeague: ${match.league}\nStatus: ${match.status}\nScore: ${match.homeScore} - ${match.awayScore}\nScheduled at: ${new Date(match.scheduledAt).toLocaleString()}\n---`
            )
            .join('\n')}`,
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error fetching match schedules: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('OP.GG Esports MCP server running on stdio');
}

main().catch(error => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
