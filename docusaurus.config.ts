import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes } from 'prism-react-renderer'
import social from './data/social'
import type { GiscusConfig } from './src/components/Comment'

// 备案信息，便于合规
const beian = '渝ICP备2024041951号 '
const beian1 = '备案中'

// Docusaurus 配置主对象
const config: Config = {
  // 网站标题
  title: 'DarkLotus',
  tagline: '黑暗之莲', 
  url: 'https://darklotus.cn',
  // 基础 URL
  baseUrl: '/',
  // 网站图标
  favicon: 'img/favicon.ico',
  // 组织名称（通常是 GitHub 组织）
  organizationName: 'DarkLotus',
  // 项目名称
  projectName: 'DarkLotus',
  // 自定义字段设置
  customFields: {
    // 博主简历
    bio: '耍起嘛耍起',
    // 网站描述
    description: 'DarkLotus是Lian的个人主页',
  },
  // 网站主题配置
  themeConfig: {
    // 站点公告条（可选）
    // announcementBar: {
    //   id: 'announcementBar-3',
    //   content: ``,
    // },
    // Open Graph 图像
    image: 'img/og.png',
    // 元数据
    metadata: [
      {
        name: 'author',
        content: 'lian', // 作者
      },
      {
        name: 'keywords',
        content: 'blog, javascript, typescript, node, react, vue, web', // 关键词
      },
      {
        name: 'keywords',
        content: '编程爱好者, Web开发者',
      },
    ],
    // 文档设置
    docs: {
      sidebar: {
        hideable: true, // 侧边栏是否可隐藏
      },
    },
    // 导航栏配置
    navbar: {
      logo: {
        alt: 'Lian', // LOGO 描述
        src: 'img/logo.png', // LOGO 图像路径
        srcDark: 'img/logo.png', // 暗色模式下的 LOGO 图像路径
      },
      hideOnScroll: true, // 向下滚动时隐藏导航栏
      items: [
        { label: '文档', position: 'right', to: 'docs' },
        { label: '博客', position: 'right', to: 'blog' },
        { label: '项目', position: 'right', to: 'project' },
        { label: '友链', position: 'right', to: 'friends' },
        { label: '关于', position: 'right', to: 'about' },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        {
          label: '更多',
          position: 'right',
          items: [
            { label: '归档', to: 'blog/archive' }, // 子菜单中的归档链接
          ],
        },
        // {
        //   type: 'localeDropdown', // 语言选择下拉
        //   position: 'right',
        // },
      ],
    },
    // 页脚配置
    footer: {
      style: 'dark', // 页脚样式
      links: [
        {
          title: '学习', // 页脚标题
          items: [
            { label: '博客', to: 'blog' },
            { label: '归档', to: 'blog/archive' },
            { label: '项目', to: 'project' },
          ],
        },
        {
          title: '社交',
          items: [
            { label: '关于我', to: '/about' },
            { label: 'GitHub', href: social.github.href },
            { label: 'Twitter', href: social.x.href },
            // { label: '掘金', href: social.juejin.href },
            { label: 'Discord', href: social.discord.href },
          ],
        },
        {
          title: '网站',
          items: [
            { label: '站点监控', to: 'https://status.darklotus.cn' },
          ],
        },
        {
          title: '更多',
          items: [
            { label: '友链', position: 'right', to: 'friends' },
            {
              html: `
                <a href="https://docusaurus.io" target="_blank" rel="noreferrer noopener">
                  <img src="/img/buildwith.png" alt="build with docusaurus" width="120" height="50"/>
                </a>
                `,
            },
          ],
        },
      ],
      copyright: `
        <p style="margin-bottom: 0;"><a href="http://beian.miit.gov.cn/">${beian}</a></p>
        <p style="display: inline-flex; align-items: center;"><img style="height:20px;margin-right: 0.5rem;" src="/img/police.png" alt="police" height="20"/><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${
          beian1.match(/\d+/)?.[0]
        }" >${beian1}</a></p>
        <p>Copyright © 2024 - ${new Date().getFullYear()} DarkLotus. | Built with Docusaurus.</p>
        `,
    },
    // Algolia 搜索配置（如果启用外部搜索）
    algolia: {
      appId: 'ZLJQMSZ3VZ',
      apiKey: '2a0924f0362b7b8b09c62c2f2dff755b',
      indexName: 'darklotus',
    },
    // 代码高亮主题配置
    prism: {
      theme: themes.oneLight, // 默认主题
      darkTheme: themes.oneDark, // 暗色主题
      additionalLanguages: ['bash', 'json', 'java', 'python', 'php', 'graphql', 'rust', 'toml', 'protobuf', 'diff'], // 额外语言支持
      defaultLanguage: 'javascript', // 默认语言
      magicComments: [
        {
          className: 'theme-code-block-highlighted-line', // 高亮的行样式
          line: 'highlight-next-line',
          block: { start: 'highlight-start', end: 'highlight-end' },
        },
        {
          className: 'code-block-error-line', // 错误的行样式
          line: 'This will error',
        },
      ],
    },
    // Giscus 评论配置
    giscus: {
      repo: 'lianlianlianlianlianlian/darklotus',
      repoId: 'R_kgDONDeh2Q',
      category: 'General',
      categoryId: 'DIC_kwDONDeh2c4CjjbV',
      theme: 'light',
      darkTheme: 'dark_dimmed',
    } satisfies Partial<GiscusConfig>,
    // 目录配置
    tableOfContents: {
      minHeadingLevel: 2, // 最小标题级别
      maxHeadingLevel: 4, // 最大标题级别
    },
    // 实时代码块配置
    liveCodeBlock: { playgroundPosition: 'top' },
    // 图像缩放配置
    zoom: {
      selector: '.markdown :not(em) > img', // 选择要缩放的图像
      background: {
        light: 'rgb(255, 255, 255)', // 明亮模式的背景
        dark: 'rgb(50, 50, 50)', // 暗模式的背景
      },
    },
  } satisfies Preset.ThemeConfig,
  // 预设配置
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs', // 文档路径
          sidebarPath: 'sidebars.ts', // 侧边栏配置
        },
        blog: false, // 是否启用博客功能
        theme: {
          customCss: ['./src/css/custom.css', './src/css/tweet-theme.css'], // 自定义 CSS 文件
        },
        sitemap: {
          priority: 0.5, // sitemap 优先级
        },
        gtag: {
          trackingID: 'G-15MDBV0ZX8', // Google Analytics 跟踪 ID
          anonymizeIP: true, // 匿名 IP
        },
        debug: process.env.NODE_ENV === 'development', // 调试模式
      } satisfies Preset.Options,
    ],
  ],
  // 插件配置
  plugins: [
    'docusaurus-plugin-image-zoom', // 图像缩放插件
    '@docusaurus/plugin-ideal-image', // 理想图像处理插件
    ['docusaurus-plugin-baidu-tongji', { token: 'c459ddf38cb87892f0d4b191dd564033' }], // 百度统计（如果需要）
    [
      '@docusaurus/plugin-pwa', // PWA 插件
      {
        debug: process.env.NODE_ENV === 'development', // 调试模式
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'], // 离线模式的激活策略
        pwaHead: [
          { tagName: 'link', rel: 'icon', href: '/img/logo.png' }, // 网站图标
          { tagName: 'link', rel: 'manifest', href: '/manifest.json' }, // PWA manifest
          { tagName: 'meta', name: 'theme-color', content: '#f8080' }, // 主题颜色
        ],
      },
    ],
    [
      'vercel-analytics', // Vercel 分析插件
      {
        debug: process.env.NODE_ENV === 'development',
        mode: 'auto',
      },
    ],
    [
      './src/plugin/plugin-content-blog', // 自定义博客插件
      {
        path: 'blog', // 博客路径
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/lianlianlianlianlianlian/blog/edit/main/${blogDirPath}/${blogPath}`, // 编辑链接
        editLocalizedFiles: false, // 是否允许本地化文件编辑
        blogDescription: '我的博客', // 博客描述
        blogSidebarCount: 10, // 侧边栏显示的博文数量
        blogSidebarTitle: '博文', // 侧边栏标题
        postsPerPage: 12, // 每页博文数
        showReadingTime: true, // 是否显示阅读时间
        readingTime: ({ content, frontMatter, defaultReadingTime }) =>
          defaultReadingTime({ content, options: { wordsPerMinute: 300 } }), // 计算阅读时间
        feedOptions: {
          type: 'all', // feed 类型
          title: 'Lian', // feed 标题
          description: 'feedId:72001265617022976+userId:72000380639949824', // feed 描述
          copyright: `Copyright © ${new Date().getFullYear()} Lian Built with Docusaurus.<p><a href="http://beian.miit.gov.cn/" class="footer_lin">${beian}</a></p>`, // 版权信息
        },
      },
    ],
    async function tailwindcssPlugin() {
      return {
        name: 'docusaurus-tailwindcss', // Tailwind CSS 插件
        configurePostCss(postcssOptions) {
          // 添加 TailwindCSS 和 AutoPrefixer
          postcssOptions.plugins.push(require('tailwindcss'))
          postcssOptions.plugins.push(require('autoprefixer'))
          return postcssOptions
        },
      }
    },
    async function injectMotto() {
      return {
        name: 'docusaurus-motto', // 注入座右铭插件
        injectHtmlTags() {
          return {
            headTags: [
              {
                tagName: 'script', // 添加脚本
                innerHTML: `
    (${function () {
      console.log(
        `%c DarkLotus %c https://github.com/lianlianlianlianlianlian/darklotus`,
        'color: #fff; margin: 1em 0; padding: 5px 0; background: #12affa;',
        'margin: 1em 0; padding: 5px 0; background: #efefef;',
      )

      const motto = `
This Webisite Powered By DarkLotus
--------
Love what you do and do what you love.
`

      if (document.firstChild?.nodeType !== Node.COMMENT_NODE) {
        document.prepend(document.createComment(motto))
      }
    }.toString()})();`,
              },
            ],
          }
        },
      }
    },
  ],
  // 头部标签配置
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'description', // 描述
        content: 'DarkLotus', // 描述内容
      },
    },
  ],
  // 样式表配置
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Normal.min.css', // 字体样式
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Medium.min.css', // 字体样式
    'https://cdn.jsdelivr.net/npm/misans@4.0.0/lib/Normal/MiSans-Semibold.min.css', // 字体样式
  ],
// 国际化配置
i18n: {
  defaultLocale: 'zh-CN', // 默认语言
  locales: ['zh-CN', 'en'], // 支持的语言
  localeConfigs: {
    'zh-CN': {
      label: '中文', // 修改为你希望显示的中文标签
    },
    en: {
      label: 'English', // 英文标签
    },
  },
},
  // 处理断链设置
  onBrokenLinks: 'warn', // 断链警告
}

// 导出配置
export default config
