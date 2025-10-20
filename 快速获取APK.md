# 快速获取SmartGo智能公交APK安装文件

## 📦 准备工作已完成

✅ 你的打包文件：`smartgo-bus-phonegap.zip` (已生成)

由于本地缺少Android构建环境，推荐使用以下方法快速获得APK安装文件：

---

## 🚀 方法1：使用Appetize.io在线预览（最快 - 5分钟）

**Appetize.io** 可以在线运行你的应用，虽然不能下载APK，但可以立即测试。

1. 访问：https://appetize.io/
2. 上传 `smartgo-bus-phonegap.zip`
3. 在线预览你的应用

---

## 🚀 方法2：使用在线Cordova构建器（推荐 - 10分钟）

### Option A: 使用 Monaca Cloud

1. **访问 Monaca**
   ```
   https://monaca.io/
   ```

2. **注册并登录**（免费账户即可）

3. **导入项目**
   - 点击 "New Project" → "Import Project"
   - 上传 `smartgo-bus-phonegap.zip`

4. **构建APK**
   - Build → Build App for Android
   - 选择 Debug Build
   - 等待3-5分钟
   - 下载APK文件

### Option B: 使用 Apache Cordova CLI（在线版）

访问：https://cordova.apache.org/docs/en/latest/guide/cli/

---

## 🚀 方法3：使用GitHub + GitHub Actions自动构建（15分钟）

我可以帮你配置自动构建，每次推送代码都会自动生成APK。

需要：
1. GitHub账户
2. 将项目推送到GitHub
3. 配置GitHub Actions工作流

**告诉我是否需要这个方案，我会立即配置。**

---

## 🚀 方法4：本地完整构建（需30-60分钟安装环境）

如果你想在本地构建，需要安装完整的Android开发环境。

### 步骤1：安装Java和Android SDK

```bash
# 运行环境安装脚本
chmod +x setup-environment.sh
./setup-environment.sh
```

### 步骤2：安装Android Studio

1. 访问：https://developer.android.com/studio
2. 下载并安装Android Studio
3. 打开Android Studio，完成初始设置
4. 在SDK Manager中安装：
   - Android SDK Platform 33
   - Android SDK Build-Tools
   - Android SDK Command-line Tools

### 步骤3：配置环境变量

编辑 `~/.zshrc`：

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin
```

保存后执行：
```bash
source ~/.zshrc
```

### 步骤4：运行构建脚本

```bash
chmod +x build-apk.sh
./build-apk.sh
```

构建完成后，APK文件位于：`smartgo-bus-debug.apk`

---

## 🎯 我的推荐

根据"快速获取APK"的需求：

### 🥇 第一推荐：Monaca（最简单）
- ⏱ 时间：10分钟
- 💰 费用：免费
- 🔧 难度：⭐（最简单）
- 📱 结果：可下载APK文件

### 🥈 第二推荐：GitHub Actions（最专业）
- ⏱ 时间：15分钟配置，之后自动
- 💰 费用：免费
- 🔧 难度：⭐⭐
- 📱 结果：自动化构建APK

### 🥉 第三推荐：本地构建（最灵活）
- ⏱ 时间：30-60分钟（首次）
- 💰 费用：免费
- 🔧 难度：⭐⭐⭐
- 📱 结果：完全控制构建过程

---

## 📋 文件说明

现在你的目录中有：

```
/Users/zhuxg/Desktop/Bus/
├── smartgo-bus-phonegap.zip    ← 打包文件（可上传）
├── build-apk.sh                ← 本地构建脚本
├── setup-environment.sh        ← 环境安装脚本
├── PHONEGAP-UPLOAD-GUIDE.md    ← 详细上传指南
└── phonegap-build/             ← 源码目录
```

---

## 💡 立即开始

告诉我你选择哪个方法，我会提供详细的操作步骤：

1️⃣ **"我选择Monaca"** → 我会给你详细的界面操作截图说明

2️⃣ **"我选择GitHub Actions"** → 我会立即配置自动构建脚本

3️⃣ **"我选择本地构建"** → 我会陪你一步步完成环境安装

---

## 🆘 遇到问题？

随时告诉我，我会帮你解决！
