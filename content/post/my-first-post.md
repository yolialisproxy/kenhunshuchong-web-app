+++
date = '2025-08-08T16:36:26+08:00'
draft = false
title = '今天第一次使用hugo构建自己的博客'

+++

如果不是为了实验谷歌的firebase，我或许不会这么快使用hugo，这东西虽然不难，但还是费了我好长时间，好在终于弄成了。

说是弄成了，可是这网站现在除了这个帖子，几乎什么内容都没有，实在太干净了！

不过我很喜欢hugo这个隐藏的功能，就是md格式的文档可以直接拿来用——当作网页用。

比较搞笑的是，很快我发现，连个回贴的功能都没有，只好继续编辑我的md文件，这样继续增加新内容。

试验了一下，更新很方便，速度反应并不慢，特别是托管到firebase的自带域名服务，不得不给一个良心赞，果然是唯快不破。

>   Hugo 在构建你的站点之前不会清除 `public` 目录。现有文件会被覆盖，但不会被删除。此行为旨在防止你在构建后无意中删除你可能添加到 `public` 目录中的文件。
>
>   根据您的需要，您可能希望在每次构建之前手动清除 `public` 目录的内容。
>
>   ## Draft, future, and expired content 草稿、未来和过期内容
>
>   Hugo 允许你在内容的 [front matter](https://gohugo.io/content-management/front-matter/) 中设置 `draft` 、 `date` 、 `publishDate` 和 `expiryDate` 。默认情况下，Hugo 在以下情况下不会发布内容：
>
>   -   `draft` 值为 `true`
>   -   该 `date` 是未来的日期
>   -   `publishDate` 是未来的日期
>   -   `expiryDate` 已过去
>
>   Hugo 会发布草稿、未来和过期[节点](https://gohugo.io/quick-reference/glossary/#node)页面的后代页面。为了防止这些后代页面被发布，请使用 [`cascade`](https://gohugo.io/content-management/front-matter/#cascade) 内容的级联字段将[构建选项](https://gohugo.io/content-management/build-options/)级联到后代页面。
>
>   您可以使用命令行标志运行 `hugo` 或 `hugo server` 时覆盖默认行为：
>
>   ```sh
>   hugo --buildDrafts    # or -D
>   hugo --buildExpired   # or -E
>   hugo --buildFuture    # or -F
>   ```
>
>   虽然您也可以在站点配置中设置这些值，但除非所有内容作者都知道并理解这些设置，否则可能会导致不良结果。
>
>   如上所述，Hugo 在构建你的网站之前不会清除 `public` 目录。根据*当前*对上述四个条件的评估，构建完成后，你的 `public` 目录可能会包含上次构建过程中产生的无关文件。
>
>   一种常见的做法是在每次构建之前手动清除 `public` 目录的内容，以删除草稿、过期和未来的内容。
>
>   ## Develop and test your site 开发并测试您的网站
>
>   要在开发布局或创建内容时查看您的网站， `cd` 进入您的项目目录并运行：
>
>   ```sh
>   hugo server
>   ```
>
>   [`hugo server`](https://gohugo.io/commands/hugo_server/) 命令会构建你的网站，并使用一个精简的 HTTP 服务器来提供你的页面。运行 `hugo server` 时，它会显示你本地网站的 URL：
>
>   ```text
>   Web Server is available at http://localhost:1313/
>   ```
>
>   服务器运行时，会监视项目目录中的资源、配置、内容、数据、布局、翻译和静态文件的更改。当检测到更改时，服务器会重建您的网站并使用 [LiveReload](https://github.com/livereload/livereload-js) 刷新浏览器。
>
>   大多数 Hugo 构建速度都非常快，除非您直接查看浏览器，否则您可能不会注意到变化。
>
>   服务器运行时，Hugo 会将 JavaScript 注入到生成的 HTML 页面中。LiveReload 脚本会通过 Web 套接字建立从浏览器到服务器的连接。您无需安装任何软件或浏览器插件，也无需任何配置。
>
>   编辑内容时，如果希望浏览器自动重定向到上次修改的页面，请运行：
>
>   ```sh
>   hugo server --navigateToChanged
>   ```
>
>   ## Deploy your site 部署您的网站
>
>   
>
>   如上所述，Hugo 在构建网站之前不会清除 `public` 目录。请在每次构建之前手动清除 `public` 目录的内容，以删除草稿、过期和未来发布的内容。
>
>   当您准备好部署站点时，请运行：
>
>   ```sh
>   hugo
>   ```
>
>   这将构建你的网站，并将文件发布到 `public` 目录。目录结构如下所示：
>
>   ```text
>   public/
>   ├── categories/
>   │   ├── index.html
>   │   └── index.xml  <-- RSS feed for this section
>   ├── posts/
>   │   ├── my-first-post/
>   │   │   └── index.html
>   │   ├── index.html
>   │   └── index.xml  <-- RSS feed for this section
>   ├── tags/
>   │   ├── index.html
>   │   └── index.xml  <-- RSS feed for this section
>   ├── index.html
>   ├── index.xml      <-- RSS feed for the site
>   └── sitemap.xml
>   ```
>
>   在简单的托管环境中，您通常通过 `ftp` 、 `rsync` 或 `scp` 文件传输到虚拟主机的根目录， `public` 目录的内容就是您所需要的。
>
>   我们的大多数用户使用 [CI/CD](https://gohugo.io/quick-reference/glossary/#cicd) 工作流程部署他们的网站，其中将 [1](https://gohugo.io/getting-started/usage/#fn:1) 推送到他们的 GitHub 或 GitLab 存储库会触发构建和部署。流行的提供商包括 [AWS Amplify](https://aws.amazon.com/amplify/) 、 [CloudCannon](https://cloudcannon.com/) 、 [Cloudflare Pages](https://pages.cloudflare.com/) 、 [GitHub Pages](https://pages.github.com/) 、 [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/) 和 [Netlify](https://www.netlify.com/) 。
>
>   在[主机和部署](https://gohugo.io/host-and-deploy/)部分了解更多信息。
>
>   ------
>
>   1.  Git 仓库包含整个项目目录，通常不包括 `public` 目录，因为站点是在推送*之后*构建的 [。↩︎](https://gohugo.io/getting-started/usage/#fnref:1)
>
>   # 目录结构
>
>   Hugo 目录结构概述。
>
>   每个 Hugo 项目都是一个目录，其中包含有助于您网站的内容、结构、行为和呈现的子目录。
>
>   ## 站点骨架
>
>   当你创建新站点时，Hugo 会生成一个项目框架。例如，以下命令：
>
>   ```sh
>   hugo new site my-site
>   ```
>
>   创建此目录结构：
>
>   ```txt
>   my-site/
>   ├── archetypes/
>   │   └── default.md
>   ├── assets/
>   ├── content/
>   ├── data/
>   ├── i18n/
>   ├── layouts/
>   ├── static/
>   ├── themes/
>   └── hugo.toml         <-- site configuration
>   ```
>
>   根据需求，您可能希望将站点配置组织到子目录中：
>
>   ```txt
>   my-site/
>   ├── archetypes/
>   │   └── default.md
>   ├── assets/
>   ├── config/           <-- site configuration
>   │   └── _default/
>   │       └── hugo.toml
>   ├── content/
>   ├── data/
>   ├── i18n/
>   ├── layouts/
>   ├── static/
>   └── themes/
>   ```
>
>   当你建立你的网站时，Hugo 会创建一个 `public` 目录，通常还会创建一个 `resources` 目录：
>
>   ```txt
>   my-site/
>   ├── archetypes/
>   │   └── default.md
>   ├── assets/
>   ├── config/       
>   │   └── _default/
>   │       └── hugo.toml
>   ├── content/
>   ├── data/
>   ├── i18n/
>   ├── layouts/
>   ├── public/       <-- created when you build your site
>   ├── resources/    <-- created when you build your site
>   ├── static/
>   └── themes/
>   ```
>
>   ## 目录
>
>   每个子目录都会对您网站的内容、结构、行为或呈现做出贡献。
>
>   -   archetypes 原型
>
>       `archetypes` 目录包含新内容的模板。查看[详情 ](https://gohugo.io/content-management/archetypes/)。
>
>   -   assets 资产
>
>       `assets` 目录包含通常通过资源管道传递的全局资源。这些资源包括图像、CSS、Sass、JavaScript 和 TypeScript。查看[详情 ](https://gohugo.io/hugo-pipes/introduction/)。
>
>   -   config 配置
>
>       `config` 目录包含你的站点配置，可能被拆分成多个子目录和文件。对于配置极少的项目，或者不需要在不同环境中表现不同的项目，在项目根目录中放置一个名为 `hugo.toml` 的配置文件就足够了。查看[详情 ](https://gohugo.io/configuration/introduction/#configuration-directory)。
>
>   -   content 内容
>
>       `content` 目录包含构成您网站内容的标记文件（通常为 Markdown）和页面资源。查看[详情 ](https://gohugo.io/content-management/organization/)。
>
>   -   data 数据
>
>        `data` 目录包含用于扩充内容、配置、本地化和导航的数据文件（JSON、TOML、YAML 或 XML）。查看[详情 ](https://gohugo.io/content-management/data-sources/)。
>
>   -   i18n 国际化
>
>       `i18n` 目录包含多语言网站的翻译表。查看[详情 ](https://gohugo.io/content-management/multilingual/)。
>
>   -   layouts 布局
>
>        `layouts` 目录包含用于将内容、数据和资源转换为完整网站的模板。查看[详情 ](https://gohugo.io/templates/)。
>
>   -   public
>
>        `public` 目录包含已发布的网站，它是在运行 `hugo` 或 `hugo server` 命令时生成的。Hugo 会根据需要重新创建此目录及其内容。查看[详情 ](https://gohugo.io/getting-started/usage/#build-your-site)。
>
>   -   resources 资源
>
>        `resources` 目录包含 Hugo 资源管道的缓存输出，这些输出是在运行 `hugo` 或 `hugo server` 命令时生成的。默认情况下，此缓存目录包含 CSS 和图片。Hugo 会根据需要重新创建此目录及其内容。
>
>   -   static 静止的
>
>       `static` 目录包含您在构建网站时将被复制到 `public` 目录的文件。例如： `favicon.ico` 、 `robots.txt` 以及用于验证网站所有权的文件。在引入[页面包](https://gohugo.io/quick-reference/glossary/#page-bundle)和[资源管道](https://gohugo.io/hugo-pipes/introduction/)之前， `static` 目录也用于存放图片、CSS 和 JavaScript。
>
>   -   themes 主题
>
>       `themes`目录包含一个或多个[主题 ](https://gohugo.io/quick-reference/glossary/#theme)，每个主题都有自己的子目录。
>
>   ## 联合文件系统
>
>   Hugo 创建了一个联合文件系统，允许你将两个或多个目录挂载到同一位置。例如，假设你的主目录在一个目录中包含 Hugo 项目，在另一个目录中包含共享内容：
>
>   ```text
>   home/
>   └── user/
>       ├── my-site/            
>       │   ├── content/
>       │   │   ├── books/
>       │   │   │   ├── _index.md
>       │   │   │   ├── book-1.md
>       │   │   │   └── book-2.md
>       │   │   └── _index.md
>       │   ├── themes/
>       │   │   └── my-theme/
>       │   └── hugo.toml
>       └── shared-content/     
>           └── films/
>               ├── _index.md
>               ├── film-1.md
>               └── film-2.md
>   ```
>
>   您可以在使用挂载点构建站点时包含共享内容。在您的站点配置中：
>
>   json
>
>   ```json
>   {
>      "module": {
>         "mounts": [
>            {
>               "source": "content",
>               "target": "content"
>            },
>            {
>               "source": "/home/user/shared-content",
>               "target": "content"
>            }
>         ]
>      }
>   }
>   ```
>
>   当您将一个目录覆盖在另一个目录之上时，必须挂载这两个目录。
>
>   Hugo 不支持符号链接。如果您需要符号链接提供的功能，请使用 Hugo 的联合文件系统。
>
>   挂载后，联合文件系统具有以下结构：
>
>   ```text
>   home/
>   └── user/
>       └── my-site/
>           ├── content/
>           │   ├── books/
>           │   │   ├── _index.md
>           │   │   ├── book-1.md
>           │   │   └── book-2.md
>           │   ├── films/
>           │   │   ├── _index.md
>           │   │   ├── film-1.md
>           │   │   └── film-2.md
>           │   └── _index.md
>           ├── themes/
>           │   └── my-theme/
>           └── hugo.toml
>   ```
>
>   
>
>   当两个或多个文件具有相同路径时，优先顺序遵循挂载顺序。例如，如果共享内容目录包含 `books/book-1.md` ，它将被忽略，因为项目的 `content` 目录首先被挂载。
>
>   您可以将目录挂载到 `archetypes` 、 `assets` 、 `content` 、 `data` 、 `i18n` 、 `layouts` 和 `static` 。查看[详情 ](https://gohugo.io/configuration/module/#mounts)。
>
>   您还可以使用 Hugo 模块从 Git 仓库挂载目录。查看[详情 ](https://gohugo.io/hugo-modules/)。
>
>   ## 主题骨架
>
>   当你创建新主题时，Hugo 会生成一个功能性主题框架。例如，以下命令：
>
>   ```text
>   hugo new theme my-theme
>   ```
>
>   创建此目录结构（未显示子目录）：
>
>   ```text
>   my-theme/
>   ├── archetypes/
>   ├── assets/
>   ├── content/
>   ├── data/
>   ├── i18n/
>   ├── layouts/
>   ├── static/
>   ├── LICENSE
>   ├── README.md
>   ├── hugo.toml
>   └── theme.toml
>   ```
>
>   使用上面描述的联合文件系统，Hugo 将每个目录挂载到项目中的相应位置。当两个文件具有相同的路径时，项目目录中的文件优先。
>
>   例如，您可以通过将副本放置在项目目录内的同一位置来覆盖主题的模板。
>
>   如果您同时使用来自两个或多个主题或模块的组件，并且发生路径冲突，则第一个安装优先。

