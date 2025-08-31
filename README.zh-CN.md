*This README is also available in [English](README.md).*

# Aetheria

一个用于存放各种 MCP (Meta Command Palette) 工具的 monorepo 仓库，旨在提高日常工作和生活效率。

## ✨ 特性

- **Monorepo:** 使用 [pnpm workspaces](https://pnpm.io/workspaces) 进行管理，以实现高效的代码共享和维护。
- **TypeScript:** 使用现代 TypeScript 构建，确保代码的健壮性和可维护性。
- **代码检查与格式化:** 使用 [Biome](https://biomejs.dev/) 进行快速、一致且可靠的代码格式化和校验。

## 🚀 快速开始

1.  **克隆仓库:**
    ```bash
    git clone https://github.com/your-username/aetheria.git
    cd aetheria
    ```

2.  **安装依赖:**
    ```bash
    pnpm install
    ```

3.  **格式化和校验代码:**
    ```bash
    pnpm biome check --apply-unsafe ./
    ```

## 🛠️ 可用的 MCP 工具

### 📋 Femock - 前端模拟面试
一个全面的 AI 驱动的前端开发者模拟面试工具。

**功能特性:**
- 多轮面试模拟（技术面、业务面、架构面、HR面）
- 基于简历和职位描述的 AI 问题生成
- 集成算法和技术概念知识库
- 动态追问和完整面试记录

**快速开始:**
```bash
cd mcps/femock
pnpm install
pnpm build
```

**MCP 配置:**
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

[📖 完整文档](./mcps/femock/README.md)

## 📂 仓库结构

```
.
├── mcps/           # MCP (Model Context Protocol) 服务器
│   └── femock/     # 前端模拟面试工具
├── packages/       # 存放所有独立的工具和包
├── package.json    # 根 package.json
├── pnpm-workspace.yaml # pnpm 工作区配置
├── tsconfig.json   # 根 TypeScript 配置
└── biome.json      # Biome 配置
```

## 🚀 使用 MCP 工具

### 前置要求
- Node.js 18+ 
- 兼容 MCP 的 AI 编辑器（如 Kiro、Claude Desktop 等）

### 通用设置
1. **构建 MCP 服务器:**
   ```bash
   cd mcps/<工具名称>
   pnpm install
   pnpm build
   ```

2. **在 AI 编辑器中配置:**
   将 MCP 服务器配置添加到编辑器设置中。

3. **开始使用:**
   工具将作为函数在 AI 对话中可用。

---

