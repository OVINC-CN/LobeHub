# Changelog

### Version 2.1.23-alpha.3

<sup>Released on **2026-02-11**</sup>

#### 🐛 Bug 修复

- **auth**: 修复断网后 Better-Auth session 检查失败导致页面跳转到根路径的问题，网络错误时保持现有登录状态。
- **auth**: 关闭 `useSession()` 的 `refetchOnWindowFocus`，session 验证跟随实际 API 请求而非主动轮询。

### Version 2.1.23-alpha.2

<sup>Released on **2026-02-09**</sup>

#### 🐛 Bug 修复

- **s3**: 修复配置了 `S3_PUBLIC_DOMAIN` 后部分文件链接仍通过 `S3_ENDPOINT` 生成签名 URL 的问题，现在优先使用公共域名。
- **file**: 修复前端 fetch `/f/:id` 文件代理路由时未携带 cookie 的问题，添加 `credentials: 'include'`。

### Version 2.1.23-alpha.1

<sup>Released on **2026-02-09**</sup>

#### ♻ 重构

- **menu**: 移除菜单栏和底部导航中不使用的链接和功能（下载客户端、GitHub、文档、反馈、Discord、邮件、更新日志、Product Hunt 等）。

#### 🐛 Bug 修复

- **copy**: 修复代码块选中复制时换行丢失的问题。
- **build**: 修复 Docker 镜像构建失败的问题，添加 `@napi-rs/canvas` 及其运行时依赖。

#### 🗑 移除

- **providers**: 移除不使用的 LLM 厂商，仅保留 Anthropic、Google、OpenAI。
- **workflows**: 移除不使用的 GitHub Actions 工作流。
