# Coinbase for Agents MCP in ChatGPT

This guide follows Coinbase's current official Coinbase MCP documentation.

## Official remote MCP endpoint

- Server URL: `https://agents.coinbase.com/mcp`
- Authentication: OAuth
- Official entry skill: https://coinbase.com/skill.md
- Coinbase MCP setup guide: https://docs.cdp.coinbase.com/coinbase-for-agents/skill.md
- Documentation index: https://docs.cdp.coinbase.com/llms.txt

Do not use the obsolete `/mcp/chatgpt` endpoint.

## Connect ChatGPT

Set up the connection in ChatGPT on the web. Once connected, it should also be available in the desktop and mobile apps.

1. Open ChatGPT web.
2. Open **Plugins** in the side navigation.
3. Click **Add** → **Add Custom MCP Server**.
4. Name it **Coinbase**.
5. Set Server URL to `https://agents.coinbase.com/mcp`.
6. Leave Authentication set to **OAuth**.
7. Check the acknowledgement and create the plugin.
8. Sign in to Coinbase and select only the portfolio(s) this agent should access.
9. Verify access with a read-only request, such as listing portfolios.

If **Add Custom MCP Server** is unavailable, check ChatGPT Settings for Developer Mode and confirm that the account plan and workspace policy allow custom MCP connections. Workspace administrators can restrict this capability.

## Portfolio isolation

Create a separate Coinbase Advanced Spot portfolio for the agent and fund it only with the amount intended for agent use. Select that portfolio during OAuth approval. Portfolio creation is available on the Coinbase website, not the mobile app.

Official portfolio page: https://www.coinbase.com/advanced-portfolio/spot

## Supported capabilities

Depending on account eligibility, OAuth scopes, client approval, and tools exposed by the connection, Coinbase for Agents can provide:

- Spot crypto trading
- Eligible US derivatives and equities
- Portfolio and balance reads
- Portfolio management and transfers between portfolios
- Order preview, placement, listing, editing, and cancellation
- x402 paid data access through the core remote MCP

The dedicated ChatGPT trading integration does not expose x402 tools, according to Coinbase's documentation. Never assume a tool is available until confirmed by the connected server's `tools/list`.

## Safe operating procedure

- Start with read-only portfolio and balance discovery.
- Review the portfolio selected at OAuth approval; do not grant access to every portfolio by default.
- Treat trading, transfers, conversions, and paid x402 fetches as separate financial actions requiring explicit user authorization.
- Set a strict x402 budget before any paid fetch. Coinbase documents a maximum of 5 USDC per payment; an instruction in chat is not a server-enforced session budget.
- Use idempotency keys for x402 payments and do not blindly retry uncertain payment outcomes.
- Do not grant blanket smart-contract token allowances. Coinbase MCP trading permissions are not the same as EVM/Solana wallet contract approvals.
- For onchain contract interactions, verify chain, contract address, source, spender, and exact allowance independently.
- Never store seed phrases, private keys, OAuth tokens, or CDP key files in this repository or chat.

## Local CLI alternative

Coinbase documents a local CLI for supported coding-agent workflows. It requires Node.js 22+ and a CDP API key. Do not create or commit API key files in this repository. Use the official setup guide and a secure local secret store if the CLI is explicitly needed.

Official guide: https://docs.cdp.coinbase.com/coinbase-for-agents/skill.md

## What this repository change does not do

A GitHub documentation commit does not install the Coinbase MCP connection in ChatGPT, complete OAuth, select portfolios, grant account scopes, import blockchain token contracts, or execute trades or transactions. Those actions require the user's ChatGPT web settings and explicit Coinbase authorization.
