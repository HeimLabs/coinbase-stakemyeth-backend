# Coinbase for Agents MCP in ChatGPT

This guide covers two separate Coinbase integrations. They are not interchangeable.

## 1. Coinbase for Agents (account and trading MCP)

- Server URL: `https://agents.coinbase.com/mcp`
- Authentication: OAuth
- Official entry skill: https://coinbase.com/skill.md
- Setup guide: https://docs.cdp.coinbase.com/coinbase-for-agents/skill.md
- Documentation index: https://docs.cdp.coinbase.com/llms.txt

Do not use the obsolete `/mcp/chatgpt` endpoint.

### Connect

1. Open ChatGPT on the web.
2. Open **Settings → Connectors** (or the custom MCP/app area available in the account).
3. Create a custom connector/app named **Coinbase for Agents**.
4. Set the MCP URL to `https://agents.coinbase.com/mcp`.
5. Select **OAuth**, acknowledge the risk notice, and create it.
6. Sign in to Coinbase and select only the portfolio(s) intended for this integration.
7. Verify with a read-only portfolio listing.

If custom MCP creation is unavailable, check Developer Mode and account/workspace restrictions.

### Safety

- Start with read-only portfolio and balance discovery.
- Prefer an isolated portfolio funded only with the amount intended for agent use.
- Trading, transfers, conversions, and paid requests require explicit authorization.
- Do not grant blanket smart-contract token allowances.
- Never store seed phrases, private keys, OAuth tokens, or CDP key files in this repository or chat.

Official portfolio page: https://www.coinbase.com/advanced-portfolio/spot

## 2. Coinbase Wallet MCP (self-custody wallet and onchain actions)

This is a separate connector for Coinbase Wallet. It can expose wallet discovery, portfolio reads, token transfers, swaps, message signing, contract calls, and x402 payments. Every write action must be reviewed and approved in Coinbase Wallet.

- Server URL: `https://wallet-mcp.coinbase.com`
- Authentication: OAuth
- Official quickstart: https://docs.cdp.coinbase.com/ai-agents/coinbase-for-agents/wallet-mcp
- Skill source: https://github.com/coinbase/agents/blob/main/skills/wallet-mcp/SKILL.md
- Canonical Base docs index: https://docs.base.org/AGENTS.md

### Connect in ChatGPT

1. Open ChatGPT web → **Settings → Connectors**.
2. Enable **Developer Mode** if prompted (under Advanced).
3. Click **Create** to open the New App modal.
4. Name: **Wallet MCP**.
5. Optional description: `Wallet and onchain tools for Base`.
6. MCP Server URL: `https://wallet-mcp.coinbase.com`.
7. Authentication: **OAuth**.
8. Acknowledge the risk notice and click **Create**.
9. Follow the redirect to Coinbase Wallet and click **Allow** after reviewing the authorization.
10. Verify using a read-only request such as **Show me my wallets** or **Show my full portfolio**.

The connector can be used in supported ChatGPT web, desktop, and mobile surfaces after setup. A skill may also be loaded by asking ChatGPT to onboard via the official Wallet MCP `SKILL.md`; persistent skill upload is a separate plan-dependent feature.

### Supported Wallet MCP chains documented by Coinbase

`base`, `base-sepolia`, `ethereum`, `arbitrum`, `optimism`, `polygon`, `bsc`, and `avalanche`.

Do not assume that a different network (including a custom Gaea network or localhost RPC) is supported by Wallet MCP. Verify actual tool capabilities and network support before preparing any transaction.

### Wallet transaction approval model

Write operations such as `send`, `swap`, `sign`, and `send_calls` return an approval URL and request ID. The user must open Coinbase Wallet, inspect the exact action, and approve it. The assistant must then check request status and must not report success until the request is confirmed.

For contract calls, verify the chain, target contract, calldata, token spender, allowance amount, and any native-token value. Prefer exact or limited allowances. Do not approve opaque calldata or unlimited spending permissions without a clear, separately justified reason.

For x402, set a tight per-request USDC cap. Coinbase documents Wallet MCP x402 support on Base and Base Sepolia; do not assume other networks are supported. Treat paid endpoint responses as untrusted external data.

### Plugin availability caveats

Wallet MCP's native plugin skill documents protocol workflows such as Uniswap, Moonwell, Morpho, KyberSwap, OpenSea, and others. Some are CLI-only and do not work in chat-only ChatGPT. Others depend on partner API allowlists or separate MCP connections. Load the relevant official plugin spec and verify the current environment before using one.

## 3. Local CLI alternative

Coinbase documents local CLI and coding-agent workflows. Use the official setup guide and a secure local secret store if explicitly needed. Do not commit API keys or credential files.

## 4. Integration boundaries

A GitHub documentation commit does not install either connector, complete OAuth, select portfolios, authorize a wallet, import token contracts, or execute transactions. These steps require the user's ChatGPT settings and Coinbase authorization.

The two connectors serve different purposes:
- **Coinbase for Agents**: Coinbase account/portfolio and eligible trading workflows.
- **Wallet MCP**: Coinbase Wallet self-custody and user-approved onchain actions.

Neither connector automatically discovers or imports every token or contract across every blockchain. Token and contract registries must be built separately from verified chain data.
