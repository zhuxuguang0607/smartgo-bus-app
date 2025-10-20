# SmartGo智能公交 - GitHub Actions自动构建指南

## ✅ 已完成的配置

我已经为你配置好了以下文件：

- ✅ `.github/workflows/build-apk.yml` - GitHub Actions工作流
- ✅ `.gitignore` - Git忽略文件配置
- ✅ 初始化了Git仓库

每次你推送代码到GitHub，GitHub Actions会自动构建APK！

---

## 📋 接下来的步骤

### 第1步：在GitHub上创建新仓库

1. **访问GitHub创建仓库**
   ```
   https://github.com/new
   ```

2. **填写仓库信息**
   - Repository name: `smartgo-bus-app` (或你喜欢的名字)
   - Description: `SmartGo智能公交 - AI驱动的智能出行助手`
   - 选择: **Public** (公开) 或 **Private** (私有)
   - ⚠️ **不要**勾选 "Add a README file"
   - ⚠️ **不要**勾选 "Add .gitignore"
   - ⚠️ **不要**勾选 "Choose a license"

3. **点击 "Create repository"**

---

### 第2步：推送代码到GitHub

在你的终端（Terminal）中运行以下命令：

```bash
cd /Users/zhuxg/Desktop/Bus

# 添加所有文件
git add phonegap-build/ .github/ .gitignore

# 创建第一次提交
git commit -m "初始化SmartGo智能公交项目 - 配置GitHub Actions自动构建"

# 设置主分支名称
git branch -M main

# 添加远程仓库（替换YOUR_REPO_NAME为你创建的仓库名）
git remote add origin https://github.com/zhuxuguang0607/YOUR_REPO_NAME.git

# 推送代码
git push -u origin main
```

**示例**（假设你的仓库名是 smartgo-bus-app）：
```bash
git remote add origin https://github.com/zhuxuguang0607/smartgo-bus-app.git
git push -u origin main
```

---

### 第3步：查看自动构建过程

1. **访问你的GitHub仓库**
   ```
   https://github.com/zhuxuguang0607/YOUR_REPO_NAME
   ```

2. **点击 "Actions" 标签页**
   - 你会看到构建工作流正在运行
   - 状态：🟡 黄色圆点 = 正在构建
   - 状态：✅ 绿色对号 = 构建成功
   - 状态：❌ 红色叉号 = 构建失败

3. **等待构建完成**（约5-8分钟）
   - 点击工作流查看详细进度
   - 可以实时查看构建日志

---

### 第4步：下载APK安装文件

构建成功后：

1. **在Actions页面**
   - 点击最新的构建记录
   - 滚动到页面底部
   - 找到 "Artifacts" 部分

2. **下载APK**
   - 点击 `smartgo-bus-debug` 下载
   - 解压ZIP文件
   - 得到 `app-debug.apk`

3. **安装到手机**
   - 将APK传输到Android手机
   - 点击安装（需开启"未知来源"权限）
   - 测试应用功能

---

## 🔄 后续更新流程

当你修改代码后，只需：

```bash
cd /Users/zhuxg/Desktop/Bus

# 查看修改内容
git status

# 添加修改的文件
git add .

# 提交修改
git commit -m "描述你的修改内容"

# 推送到GitHub
git push
```

**GitHub Actions会自动构建新版本APK！**

---

## 🎯 工作流说明

GitHub Actions配置的自动化流程：

1. ✅ 检测代码推送
2. ✅ 设置Node.js 18环境
3. ✅ 设置Java JDK 17
4. ✅ 安装Apache Cordova
5. ✅ 创建Cordova项目
6. ✅ 复制你的代码
7. ✅ 构建Android APK
8. ✅ 上传APK为下载文件（保留30天）

---

## 🏷️ 创建正式版本（可选）

如果你想创建一个正式版本：

```bash
# 创建版本标签
git tag -a v1.0.0 -m "SmartGo智能公交 v1.0.0 - 首次发布"

# 推送标签
git push origin v1.0.0
```

GitHub Actions会：
- 自动构建APK
- 创建GitHub Release
- 附加APK下载链接

---

## 📱 构建的APK信息

- **包名**: com.smartgo.bus
- **应用名**: SmartGo智能公交
- **版本**: 1.0.0
- **类型**: Debug版本（适合测试）
- **目标系统**: Android 7.0+ (API 24+)

---

## 🔧 常见问题

### Q: 推送时要求输入密码？

**A**: GitHub已停止密码认证，需要使用Personal Access Token：

1. 访问：https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 生成token并复制
5. 推送时用token代替密码

### Q: 构建失败怎么办？

**A**: 点击失败的工作流查看错误日志，或告诉我错误信息，我会帮你解决。

### Q: 如何修改应用名称、图标？

**A**: 编辑 `phonegap-build/config.xml`：

```xml
<name>你的应用名称</name>
<icon src="www/icon.png" />
```

重新提交代码即可。

---

## 🚀 快速命令参考

```bash
# 创建仓库后的完整流程
cd /Users/zhuxg/Desktop/Bus
git add phonegap-build/ .github/ .gitignore
git commit -m "初始化项目"
git branch -M main
git remote add origin https://github.com/zhuxuguang0607/YOUR_REPO_NAME.git
git push -u origin main

# 后续更新
git add .
git commit -m "更新说明"
git push
```

---

## 📞 需要帮助？

遇到任何问题，随时告诉我：
- 推送代码遇到问题
- 构建失败的错误信息
- 需要修改配置

我会立即帮你解决！

---

## ✨ 优势

使用GitHub Actions自动构建的好处：

- ✅ **完全免费** - GitHub Actions免费额度充足
- ✅ **自动化** - 推送代码自动构建
- ✅ **无需本地环境** - 云端构建，不占用电脑资源
- ✅ **版本管理** - 每次构建都有记录
- ✅ **团队协作** - 多人开发时统一构建环境
- ✅ **持续集成** - 支持自动化测试和部署

---

现在，按照上面的步骤在GitHub创建仓库并推送代码吧！
构建完成后，你就能下载APK安装文件了。🎉
