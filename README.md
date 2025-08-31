*This README is also available in [简体中文](README.zh-CN.md).*

# Aetheria

A monorepo for various MCP (Meta Command Palette) tools designed to enhance productivity in daily work and life.

## ✨ Features

- **Monorepo:** Managed with [pnpm workspaces](https://pnpm.io/workspaces) for efficient code sharing and management.
- **TypeScript:** Built with modern TypeScript for robust and maintainable code.
- **Linting & Formatting:** Uses [Biome](https://biomejs.dev/) for fast, consistent, and reliable code formatting and linting.

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/aetheria.git
    cd aetheria
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Format and lint:**
    ```bash
    pnpm biome check --apply-unsafe ./
    ```

## 🛠️ Available MCP Tools

### 📋 Femock - Frontend Mock Interview
A comprehensive AI-driven mock interview tool for frontend developers.

**Features:**
- Multi-round interview simulation (Technical, Business, Architecture, HR)
- AI-powered question generation based on resume and job description
- Knowledge base integration with algorithms and technical concepts
- Dynamic follow-up questions and complete interview transcripts

**Quick Start:**
```bash
cd mcps/femock
pnpm install
pnpm build
```

**MCP Configuration:**
```json
{
  "mcpServers": {
    "femock": {
      "command": "node",
      "args": ["./mcps/femock/dist/index.js"],
      "env": {}
    }
  }
}
```

[📖 Full Documentation](./mcps/femock/README.md)

## 📂 Repository Structure

```
.
├── mcps/           # MCP (Model Context Protocol) servers
│   └── femock/     # Frontend mock interview tool
├── packages/       # Houses all the individual tools and packages
├── package.json    # Root package.json
├── pnpm-workspace.yaml # pnpm workspace configuration
├── tsconfig.json   # Root TypeScript configuration
└── biome.json      # Biome configuration
```

## 🚀 Using MCP Tools

### Prerequisites
- Node.js 18+ 
- An MCP-compatible AI editor (like Kiro, Claude Desktop, etc.)

### General Setup
1. **Build the MCP server:**
   ```bash
   cd mcps/<tool-name>
   pnpm install
   pnpm build
   ```

2. **Configure in your AI editor:**
   Add the MCP server configuration to your editor's settings.

3. **Start using:**
   The tools will be available as functions in your AI conversations.

---

