# Coinbase MCP in ChatGPT

This repository documents the supported ChatGPT connection path for Coinbase.

## Official endpoint

- ChatGPT-specific Coinbase MCP endpoint: `https://agents.coinbase.com/mcp/chatgpt`
- Authentication: Coinbase-hosted OAuth flow.
- Official integration source: https://github.com/coinbase/agents
- Coinbase MCP documentation: https://docs.cdp.coinbase.com/ai-agents/coinbase-for-agents/coinbase-mcp

## Connect from ChatGPT

Custom remote MCP connections are configured in ChatGPT on the web, not in this GitHub repository and not from the Android app:

1. Open ChatGPT on the web.
2. Open **Settings → Apps** (or **Plugins**, depending on the available interface).
3. Choose **Add custom MCP server**.
4. Name it **Coinbase**.
5. Enter `https://agents.coinbase.com/mcp/chatgpt`.
6. Complete Coinbase's OAuth authorization and review the tools exposed.
7. Test with read-only requests first, such as listing portfolios or supported networks.

Availability is plan- and workspace-dependent. ChatGPT's current Help Center says custom MCP connections are available on Business and Enterprise/Edu web workspaces, while Pro supports read/fetch custom MCP connections. Workspace administrators may restrict creation.

## Security and scope

- Do not store seed phrases, private keys, OAuth refresh tokens, or CDP key files in this repository.
- Use OAuth for the hosted MCP endpoint; do not paste secrets into chat, source files, issues, or commits.
- Begin with read-only discovery. Review each exposed write action and its permission prompts before enabling it.
- Never grant blanket token approvals. For ERC-20 approvals, use verified spender addresses and the minimum required allowance, and revoke allowances that are no longer needed.
- Wallet transfers, trading, signing, and other irreversible financial actions must remain user-authorized and policy-compliant.
- A successful GitHub commit does not install or authorize a ChatGPT app.

## Integration status

This file is setup documentation only. It does not create a Coinbase OAuth grant, install a ChatGPT app, connect a wallet, import contract addresses, or execute blockchain transactions. Those steps require the user's ChatGPT workspace permissions and Coinbase OAuth consent.
