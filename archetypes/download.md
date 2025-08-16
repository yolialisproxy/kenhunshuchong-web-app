---
# archetypes/download.md

title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: true
download:
  name: "{{ replace .Name "-" " " | title }}"
  version: "1.0.0"
  release_date: {{ now.Format "2006-01-02" }}
  description: "简洁描述您的下载内容"
  changelog: "CHANGELOG.md" # 链接到变更日志文件
  featured: true # 是否在下载页面置顶
  
  # 下载选项 (支持多个)
  files:
    - name: "Windows 安装包"
      os: "windows"
      arch: "x64"
      filesize: "15.2 MB"
      url: "https://example.com/downloads/windows-installer.exe"
      checksum: "sha256:abcdef1234567890..."
      icon: "windows"
      
    - name: "macOS 应用程序"
      os: "macos"
      arch: "universal"
      filesize: "18.7 MB"
      url: "https://example.com/downloads/macos-app.dmg"
      checksum: "sha256:1234567890abcdef..."
      icon: "apple"
      
    - name: "Linux 二进制文件"
      os: "linux"
      arch: "amd64"
      filesize: "12.4 MB"
      url: "https://example.com/downloads/linux-binary.tar.gz"
      checksum: "sha256:7890abcdef123456..."
      icon: "linux"
      
    - name: "源代码"
      os: "source"
      filesize: "5.3 MB"
      url: "https://github.com/yourusername/project/archive/refs/tags/v1.0.0.tar.gz"
      checksum: "sha256:def1234567890abc..."
      icon: "code"
  
  # 系统要求
  requirements:
    windows: "Windows 10 或更高版本"
    macos: "macOS 10.15 Catalina 或更高版本"
    linux: "支持 glibc 2.28+ 的 Linux 发行版"
    cpu: "x86-64 处理器"
    memory: "4 GB RAM"
    disk: "200 MB 可用空间"
    
  # 安装说明
  instructions: |
    ## Windows 安装
    1. 下载 Windows 安装程序
    2. 运行安装程序并按照提示操作
    3. 完成安装后启动应用程序
    
    ## macOS 安装
    1. 下载 .dmg 文件
    2. 打开下载的文件并将应用程序拖到 Applications 文件夹
    3. 在 Applications 文件夹中启动应用程序
    
    ## Linux 安装
    ```bash
    tar xzf linux-binary.tar.gz
    cd project
    ./install.sh
    ```
    
    ## 从源代码构建
    ```bash
    tar xzf project-1.0.0.tar.gz
    cd project-1.0.0
    mkdir build && cd build
    cmake .. && make
    sudo make install
    ```
    
  # 发行说明
  release_notes: |
    ### 新特性
    - 添加了全新用户界面
    - 支持多语言本地化
    - 性能优化提升30%
    
    ### 修复问题
    - 修复了内存泄漏问题
    - 解决了启动崩溃问题
    - 修复了文件保存错误
    
    ### 已知问题
    - 某些语言翻译不完整
    - 在低分辨率屏幕上布局问题
---

## 概述

这里是对下载内容的详细描述，解释它的功能、用途和主要特点。

### 主要特性
- **功能一**：简要描述
- **功能二**：简要描述
- **功能三**：简要描述
- **功能四**：简要描述

## 下载选项

{{< download-table >}}

## 系统要求

在下载前，请确保您的系统满足以下最低要求：

| 组件         | 要求                     |
|--------------|--------------------------|
| **操作系统** | {{ .Params.download.requirements.windows }}<br>{{ .Params.download.requirements.macos }}<br>{{ .Params.download.requirements.linux }} |
| **处理器**   | {{ .Params.download.requirements.cpu }} |
| **内存**     | {{ .Params.download.requirements.memory }} |
| **磁盘空间** | {{ .Params.download.requirements.disk }} |

## 安装指南

{{ .Params.download.instructions | markdownify }}

## 版本信息

### 当前版本
- **版本号**: {{ .Params.download.version }}
- **发布日期**: {{ .Params.download.release_date }}
- [查看完整变更日志]({{ .Params.download.changelog }})

### 发行说明
{{ .Params.download.release_notes | markdownify }}

## 验证下载

为确保下载文件的完整性，请验证文件的校验和：

```bash
# Windows 示例
certutil -hashfile your-file.exe SHA256

# macOS/Linux 示例
shasum -a 256 your-file