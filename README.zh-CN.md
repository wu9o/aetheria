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

## 📂 仓库结构

```
.
├── packages/       # 存放所有独立的工具和包
├── package.json    # 根 package.json
├── pnpm-workspace.yaml # pnpm 工作区配置
├── tsconfig.json   # 根 TypeScript 配置
└── biome.json      # Biome 配置
```

---

