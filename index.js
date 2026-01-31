#!/usr/bin/env node

/**
 * HWP MCP Client - stdio to HTTP bridge
 * Bridges MCP protocol (stdio) to remote HTTP HWP server
 */

const readline = require('readline');
const fetch = require('node-fetch');

// Get server URL from command line argument
const SERVER_URL = process.argv[2];

if (!SERVER_URL) {
  console.error('Usage: hwp-mcp-client <server-url>');
  console.error('Example: hwp-mcp-client http://106.241.28.49:8081');
  process.exit(1);
}

// Validate URL
try {
  new URL(SERVER_URL);
} catch (e) {
  console.error(`Invalid server URL: ${SERVER_URL}`);
  process.exit(1);
}

// Setup readline for stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Log to stderr (stdout is reserved for MCP protocol)
function log(message) {
  console.error(`[HWP-MCP-CLIENT] ${message}`);
}

log(`Starting MCP bridge to ${SERVER_URL}`);

// Handle each line from stdin (MCP JSON-RPC messages)
rl.on('line', async (line) => {
  try {
    // Parse JSON-RPC request from Claude Desktop
    const request = JSON.parse(line);
    log(`Received request: ${request.method || 'unknown'}`);

    // Forward to HTTP server
    const response = await fetch(`${SERVER_URL}/mcp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      timeout: 30000, // 30 second timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    
    // Send response back to Claude Desktop via stdout
    console.log(JSON.stringify(result));
    log(`Sent response for: ${request.method || 'unknown'}`);

  } catch (error) {
    log(`Error: ${error.message}`);
    
    // Send error response in JSON-RPC format
    const errorResponse = {
      jsonrpc: '2.0',
      id: null,
      error: {
        code: -32603,
        message: error.message,
      },
    };
    console.log(JSON.stringify(errorResponse));
  }
});

rl.on('close', () => {
  log('Connection closed');
  process.exit(0);
});

// Handle process termination
process.on('SIGINT', () => {
  log('Received SIGINT, shutting down');
  process.exit(0);
});

process.on('SIGTERM', () => {
  log('Received SIGTERM, shutting down');
  process.exit(0);
});
