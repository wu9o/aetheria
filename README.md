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

## 📂 Repository Structure

```
.
├── packages/       # Houses all the individual tools and packages
├── package.json    # Root package.json
├── pnpm-workspace.yaml # pnpm workspace configuration
├── tsconfig.json   # Root TypeScript configuration
└── biome.json      # Biome configuration
```

---

