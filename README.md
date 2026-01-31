# HWP MCP Client

MCP stdio-to-HTTP bridge for remote HWP document generation.

## What is this?

This package allows Claude Desktop to connect to a remote HWP (한글) document generation server via the Model Context Protocol (MCP).

## Installation

### For Employees (Simple Setup)

1. Open your Claude Desktop configuration file:
   - **Mac**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add this configuration:

```json
{
  "mcpServers": {
    "hwp-remote": {
      "command": "npx",
      "args": ["-y", "github:swy-datacook/hwp-mcp-client", "http://106.241.28.49:8081"]
    }
  }
}
```

3. Restart Claude Desktop

4. You should now see HWP tools available in Claude!

## How it works

```
[Claude Desktop] 
    ↓ stdio (MCP protocol)
[hwp-mcp-client] (this package)
    ↓ HTTP
[Remote HWP Server: 106.241.28.49:8081]
```

## Manual Installation

If you prefer to install the package globally:

```bash
npm install -g hwp-mcp-client
```

Then use in your Claude config:

```json
{
  "mcpServers": {
    "hwp-remote": {
      "command": "hwp-mcp-client",
      "args": ["http://106.241.28.49:8081"]
    }
  }
}
```

## Development

```bash
# Clone and install
git clone https://github.com/swy-datacook/hwp-mcp-client.git
cd hwp-mcp-client
npm install

# Test locally
node index.js http://106.241.28.49:8081
```

## Troubleshooting

### Claude Desktop doesn't show HWP tools

1. Check Claude Desktop logs:
   - **Mac**: `~/Library/Logs/Claude/mcp*.log`
   - **Windows**: `%APPDATA%\Claude\logs\mcp*.log`

2. Verify server is accessible:
   ```bash
   curl http://106.241.28.49:8081/health
   ```
   Should return: `{"status":"ok"}`

3. Test the bridge manually:
   ```bash
   npx -y github:swy-datacook/hwp-mcp-client http://106.241.28.49:8081
   ```

### Connection timeout

- Check your network connection
- Verify the server IP is correct: `106.241.28.49:8081`
- Contact IT if firewall is blocking the connection

## License

MIT
